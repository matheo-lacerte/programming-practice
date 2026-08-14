#!/usr/bin/env python3
import ast
import json
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
PROGRESS_FILE = ROOT / "progress.json"
HINT_STATE_FILE = ROOT / ".hint_state.json"
BUILD_DIR = ROOT / ".practice_build"


HIDDEN_TESTS = {
    "Day1": {
        "Exercise1": {
            "kind": "java",
            "class": "Exercise1IsPositive",
            "body": [
                'System.out.println(Exercise1IsPositive.isPositive(1));',
                'System.out.println(Exercise1IsPositive.isPositive(0));',
                'System.out.println(Exercise1IsPositive.isPositive(-99));'
            ],
            "expected": ["true", "false", "false"]
        },
        "Exercise2": {
            "kind": "java",
            "class": "Exercise2CountEven",
            "body": [
                'System.out.println(Exercise2CountEven.countEven(new int[] {2, 4, 6}));',
                'System.out.println(Exercise2CountEven.countEven(new int[] {1, 3, 5}));',
                'System.out.println(Exercise2CountEven.countEven(new int[] {-2, 0, 7, 8}));'
            ],
            "expected": ["3", "0", "3"]
        },
        "Exercise3": {
            "kind": "java",
            "class": "Exercise3Debugging",
            "body": [
                'System.out.println(Exercise3Debugging.calculateTotal(new int[] {1, 2, 3}));',
                'System.out.println(Exercise3Debugging.calculateTotal(new int[] {-5, 10}));'
            ],
            "expected": ["6", "5"]
        },
        "FinalChallenge": {
            "kind": "java",
            "class": "FinalChallengeFindHighest",
            "body": [
                'System.out.println(FinalChallengeFindHighest.findHighest(new int[] {4, 4, 2}));',
                'System.out.println(FinalChallengeFindHighest.findHighest(new int[] {-20, -7, -35, -4}));',
                'System.out.println(FinalChallengeFindHighest.findHighest(new int[] {42}));'
            ],
            "expected": ["4", "-4", "42"]
        }
    }
}


def load_json(path, default):
    if not path.exists():
        return default
    return json.loads(path.read_text())


def save_json(path, data):
    path.write_text(json.dumps(data, indent=2) + "\n")


def load_session(day):
    path = ROOT / day / "session.json"
    if not path.exists():
        raise SystemExit(f"I cannot find {path}")
    return load_json(path, {})


def normalize_imported_session(data):
    raw_exercises = data.get("exercises", {})
    if isinstance(raw_exercises, list):
        exercise_items = [
            (exercise.get("id", f"Exercise{index + 1}"), exercise)
            for index, exercise in enumerate(raw_exercises)
        ]
    else:
        exercise_items = list(raw_exercises.items())

    if not data.get("day") or not data.get("focus") or not data.get("topic") or not exercise_items:
        raise SystemExit("Import needs day, focus, topic, and at least one exercise.")

    exercises = {}
    for index, (name, exercise) in enumerate(exercise_items, start=1):
        exercise_name = exercise.get("id") or name or f"Exercise{index}"
        exercises[exercise_name] = {
            "file": exercise.get("file", ""),
            "type": exercise.get("type", data.get("focus", "").lower()),
            "class": exercise.get("class", ""),
            "function": exercise.get("function", exercise.get("method", "")),
            "method": exercise.get("method", exercise.get("function", "")),
            "visible_expected": exercise.get("visible_expected", exercise.get("expected", [])),
            "hints": exercise.get("hints", [])
        }

    return {
        "day": data["day"],
        "focus": data["focus"],
        "topic": data["topic"],
        "difficulty": data.get("difficulty", 1),
        "mini_lesson": data.get("mini_lesson", data.get("miniLesson", {})),
        "exercises": exercises
    }


def import_session(package_path):
    source = Path(package_path)
    if not source.is_absolute():
        source = Path.cwd() / source
    package = load_json(source, None)
    if package is None:
        raise SystemExit(f"I cannot find {package_path}")

    sessions = package if isinstance(package, list) else [package]
    imported = []

    for raw_session in sessions:
        session = normalize_imported_session(raw_session)
        day_dir = ROOT / session["day"]
        day_dir.mkdir(exist_ok=True)
        save_json(day_dir / "session.json", session)

        raw_exercises = raw_session.get("exercises", [])
        if isinstance(raw_exercises, dict):
            raw_exercises = list(raw_exercises.values())

        for exercise in raw_exercises:
            file_name = exercise.get("file")
            starter = exercise.get("starterCode", exercise.get("starter_code"))
            if file_name and starter is not None:
                target = day_dir / file_name
                if not target.exists():
                    target.write_text(starter)

        progress = load_json(PROGRESS_FILE, {})
        progress.setdefault("sessions", {}).setdefault(session["day"], {})
        progress["sessions"][session["day"]].update({
            "focus": session["focus"],
            "topic": session["topic"],
            "difficulty": session["difficulty"],
            "status": raw_session.get("status", "scheduled")
        })
        save_json(PROGRESS_FILE, progress)
        imported.append(session["day"])

    print(f"Imported: {', '.join(imported)}")


def run_command(args, cwd):
    return subprocess.run(
        args,
        cwd=cwd,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )


def clean_output(text):
    lines = []
    for line in text.splitlines():
        if line.startswith("[") and "warning" in line and "hsperfdata" in line:
            continue
        if line.strip():
            lines.append(line.strip())
    return lines


def check_visible(day, exercise_name, exercise):
    day_dir = ROOT / day
    file_name = exercise["file"]

    if exercise["type"] == "python":
        result = run_command(["python3", file_name], day_dir)
        actual = clean_output(result.stdout)
    else:
        compile_result = run_command(["javac", file_name], day_dir)
        if compile_result.returncode != 0:
            return False, "Compile failed", compile_result.stderr.strip()
        result = run_command(["java", exercise["class"]], day_dir)
        actual = clean_output(result.stdout)

    if result.returncode != 0:
        return False, "Run failed", result.stderr.strip() or result.stdout.strip()

    expected = exercise.get("visible_expected", [])
    if actual != expected:
        return False, "Output mismatch", f"Expected {expected}, got {actual}"

    return True, "Visible checks passed", ""


def python_namespace_without_prints(path):
    tree = ast.parse(path.read_text(), filename=str(path))
    allowed = (
        ast.FunctionDef,
        ast.AsyncFunctionDef,
        ast.Import,
        ast.ImportFrom,
        ast.Assign,
        ast.AnnAssign,
        ast.ClassDef,
    )
    tree.body = [node for node in tree.body if isinstance(node, allowed)]
    ast.fix_missing_locations(tree)
    namespace = {}
    exec(compile(tree, str(path), "exec"), namespace)
    return namespace


def check_python_hidden(day, exercise_name, test):
    file_name = load_session(day)["exercises"][exercise_name]["file"]
    namespace = python_namespace_without_prints(ROOT / day / file_name)
    function = namespace.get(test["function"])

    if function is None:
        return False, f"Could not find function {test['function']}"

    for args, expected in test["cases"]:
        try:
            actual = function(*args)
        except Exception as error:
            return False, f"{test['function']}{args} raised {error.__class__.__name__}: {error}"
        if actual != expected:
            return False, f"{test['function']}{args} expected {expected}, got {actual}"

    return True, "Extra checks passed"


def check_java_hidden(day, exercise_name, test):
    session = load_session(day)
    source_file = ROOT / day / session["exercises"][exercise_name]["file"]
    build = BUILD_DIR / day / exercise_name

    if build.exists():
        shutil.rmtree(build)
    build.mkdir(parents=True)

    shutil.copy2(source_file, build / source_file.name)
    harness = build / "HiddenCheck.java"
    harness.write_text(
        "public class HiddenCheck {\n"
        "    public static void main(String[] args) {\n"
        + "\n".join(f"        {line}" for line in test["body"])
        + "\n    }\n"
        "}\n"
    )

    compile_result = run_command(["javac", source_file.name, "HiddenCheck.java"], build)
    if compile_result.returncode != 0:
        return False, compile_result.stderr.strip()

    result = run_command(["java", "HiddenCheck"], build)
    if result.returncode != 0:
        return False, result.stderr.strip() or result.stdout.strip()

    actual = clean_output(result.stdout)
    if actual != test["expected"]:
        return False, f"Expected {test['expected']}, got {actual}"

    return True, "Extra checks passed"


def check_hidden(day, exercise_name):
    test = HIDDEN_TESTS.get(day, {}).get(exercise_name)
    if not test:
        return True, "No extra checks configured"
    if test["kind"] == "python":
        return check_python_hidden(day, exercise_name, test)
    return check_java_hidden(day, exercise_name, test)


def run_day(day):
    session = load_session(day)
    print(f"{day}: {session['focus']} - {session['topic']}")
    print("-" * 48)

    all_passed = True
    for name, exercise in session["exercises"].items():
        visible_ok, visible_msg, detail = check_visible(day, name, exercise)
        hidden_ok, hidden_msg = (False, "Skipped extra checks")
        if visible_ok:
            hidden_ok, hidden_msg = check_hidden(day, name)

        status = "PASS" if visible_ok and hidden_ok else "FIX"
        print(f"{status} {name}: {exercise['file']}")
        print(f"     {visible_msg}")
        if detail:
            print(f"     {detail}")
        print(f"     {hidden_msg}")

        if not (visible_ok and hidden_ok):
            all_passed = False

    if all_passed:
        mark_completed(day)
        print("\nSession complete. Progress updated.")
    else:
        print("\nNot complete yet. Ask for a hint or fix the exercises marked FIX.")


def mark_completed(day):
    progress = load_json(PROGRESS_FILE, {})
    session = load_session(day)
    progress.setdefault("sessions", {}).setdefault(day, {})
    progress["sessions"][day].update({
        "focus": session["focus"],
        "topic": session["topic"],
        "difficulty": session["difficulty"],
        "status": "completed"
    })
    progress["current_day"] = max(progress.get("current_day", 1), int(day.replace("Day", "")))
    progress["current_difficulty"] = max(progress.get("current_difficulty", 1), session["difficulty"])
    save_json(PROGRESS_FILE, progress)


def show_status():
    progress = load_json(PROGRESS_FILE, {})
    print("Programming Practice Status")
    print("-" * 48)
    print(f"Current day: Day{progress.get('current_day')}")
    print(f"Current difficulty: {progress.get('current_difficulty')}")
    print()
    for day, data in progress.get("sessions", {}).items():
        print(f"{day}: {data.get('focus')} - {data.get('topic')} [{data.get('status')}]")


def show_hint(day, exercise_name):
    session = load_session(day)
    exercise = session["exercises"].get(exercise_name)
    if not exercise:
        names = ", ".join(session["exercises"].keys())
        raise SystemExit(f"Unknown exercise. Try one of: {names}")

    state = load_json(HINT_STATE_FILE, {})
    key = f"{day}:{exercise_name}"
    index = state.get(key, 0)
    hints = exercise.get("hints", [])

    if not hints:
        print("No hints configured for this exercise yet.")
        return

    capped_index = min(index, len(hints) - 1)
    print(f"{day} {exercise_name} hint {capped_index + 1}/{len(hints)}:")
    print(hints[capped_index])

    if index < len(hints) - 1:
        state[key] = index + 1
        save_json(HINT_STATE_FILE, state)


def list_days():
    for path in sorted(ROOT.glob("*/session.json")):
        session = load_json(path, {})
        print(f"{session['day']}: {session['focus']} - {session['topic']} difficulty {session['difficulty']}")


def interactive():
    print("Programming Practice Tutor")
    print("-" * 48)
    print("1. Status")
    print("2. List days")
    print("3. Run Day1")
    print("4. Show hint")
    choice = input("Choose: ").strip()

    if choice == "1":
        show_status()
    elif choice == "2":
        list_days()
    elif choice == "3":
        run_day("Day1")
    elif choice == "4":
        day = input("Day, like Day2: ").strip()
        exercise = input("Exercise, like Exercise1 or FinalChallenge: ").strip()
        show_hint(day, exercise)
    else:
        print("No problem. Run python3 tutor.py help to see commands.")


def usage():
    print("Usage:")
    print("  python3 tutor.py")
    print("  python3 tutor.py status")
    print("  python3 tutor.py list")
    print("  python3 tutor.py run Day1")
    print("  python3 tutor.py hint Day2 Exercise1")
    print("  python3 tutor.py import session-pack.json")


def main(argv):
    if len(argv) == 1:
        interactive()
        return

    command = argv[1]
    if command == "status":
        show_status()
    elif command == "list":
        list_days()
    elif command == "run" and len(argv) == 3:
        run_day(argv[2])
    elif command == "hint" and len(argv) == 4:
        show_hint(argv[2], argv[3])
    elif command == "import" and len(argv) == 3:
        import_session(argv[2])
    else:
        usage()


if __name__ == "__main__":
    main(sys.argv)
