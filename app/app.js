const defaultSessions = [
  {
    day: "Day1",
    focus: "Java",
    topic: "Methods + Parameters",
    difficulty: 1,
    status: "completed",
    miniLesson: {
      title: "Java methods look like Python functions with types.",
      body: "Java requires parameter types and a return type. If a method returns nothing, use void.",
      examples: [
        { label: "Python", code: "def multiply(a, b):\n    return a * b" },
        { label: "Java", code: "public static int multiply(int a, int b) {\n    return a * b;\n}" }
      ]
    },
    exercises: [
      {
        id: "Exercise1",
        title: "Positive number check",
        file: "Exercise1IsPositive.java",
        method: "isPositive",
        goal: "Return true only when the number is greater than zero.",
        expected: ["true", "false", "false"],
        hints: [
          "A positive number is greater than zero.",
          "The method returns a boolean, so the condition itself can become the returned value.",
          "You only need to compare number with 0."
        ]
      },
      {
        id: "Exercise2",
        title: "Count even numbers",
        file: "Exercise2CountEven.java",
        method: "countEven",
        goal: "Loop through the array and return how many values are even.",
        expected: ["3"],
        hints: [
          "Use a counter that starts at 0.",
          "Loop through every number and check if it is divisible by 2.",
          "The modulo operator `%` tells you the remainder."
        ]
      },
      {
        id: "Exercise3",
        title: "Debug array total",
        file: "Exercise3Debugging.java",
        method: "calculateTotal",
        goal: "Fix the loop so the method returns the sum of all numbers.",
        expected: ["25"],
        hints: [
          "The bug is inside the loop.",
          "The code should keep adding each number to total.",
          "Think about the difference between replacing and accumulating."
        ]
      },
      {
        id: "FinalChallenge",
        title: "Find highest score",
        file: "FinalChallengeFindHighest.java",
        method: "findHighest",
        goal: "Return the highest value, including when every score is negative.",
        expected: ["97", "-4"],
        hints: [
          "Start by assuming one score is the highest.",
          "Compare every score to the current highest.",
          "Initializing with 0 will fail for all-negative arrays."
        ]
      }
    ]
  },
  {
    "day": "Day2",
    "focus": "Python",
    "topic": "Building data while looping",
    "difficulty": 2,
    "status": "scheduled",
    "miniLesson": {
      "title": "Build a new list while looping.",
      "body": "Start with an empty result list, loop through the input, check each value, transform it when needed, append it to result, then return the final list.",
      "examples": [
        {
          "label": "Python",
          "code": "numbers = [3, 8, 2, 11, 6]\nresult = []\n\nfor number in numbers:\n    if number > 5:\n        result.append(number * 2)\n\nprint(result)\n# [16, 22, 12]"
        }
      ]
    },
    "exercises": [
      {
        "id": "Exercise1",
        "title": "Get negative numbers",
        "file": "Exercise1GetNegative.py",
        "type": "python",
        "function": "get_negative",
        "method": "get_negative",
        "goal": "Create and return a new list containing only the negative numbers. Do not modify the original list.",
        "expected": ["[-2, -9, -3]"],
        "hints": [
          "Start with an empty result list.",
          "A negative number is less than 0.",
          "Append only the numbers where number < 0, then return result."
        ],
        "solution": "def get_negative(numbers):\n    result = []\n\n    for number in numbers:\n        if number < 0:\n            result.append(number)\n\n    return result",
        "starterCode": "def get_negative(numbers):\n    # YOUR CODE\n    pass\n\n\nnumbers = [4, -2, 7, -9, 0, -3]\nprint(get_negative(numbers))\n# expected: [-2, -9, -3]\n"
      },
      {
        "id": "Exercise2",
        "title": "Double even numbers",
        "file": "Exercise2DoubleEven.py",
        "type": "python",
        "function": "double_even",
        "method": "double_even",
        "goal": "Ignore odd numbers, double every even number, put the doubled values into a new list, and return that list.",
        "expected": ["[16, 24, 4]"],
        "hints": [
          "Use number % 2 == 0 to check if a number is even.",
          "Append number * 2, not the original number.",
          "Only append inside the if block, then return result after the loop."
        ],
        "solution": "def double_even(numbers):\n    result = []\n\n    for number in numbers:\n        if number % 2 == 0:\n            result.append(number * 2)\n\n    return result",
        "starterCode": "def double_even(numbers):\n    # YOUR CODE\n    pass\n\n\nnumbers = [5, 8, 3, 12, 7, 2]\nprint(double_even(numbers))\n# expected: [16, 24, 4]\n"
      },
      {
        "id": "Exercise3",
        "title": "Debug passing grades",
        "file": "Exercise3CountPassing.py",
        "type": "python",
        "function": "count_passing",
        "method": "count_passing",
        "goal": "Fix the function so it counts how many grades are passing. A passing grade is 60 or higher.",
        "expected": ["4"],
        "hints": [
          "The if condition is correct.",
          "The bug is that passing gets reset to 1 instead of increasing.",
          "Use passing += 1 when a grade is passing."
        ],
        "solution": "def count_passing(grades):\n    passing = 0\n\n    for grade in grades:\n        if grade >= 60:\n            passing += 1\n\n    return passing",
        "starterCode": "def count_passing(grades):\n    passing = 0\n\n    for grade in grades:\n        if grade >= 60:\n            passing = 1\n\n    return passing\n\n\ngrades = [75, 42, 88, 59, 60, 91]\nprint(count_passing(grades))\n# expected: 4\n"
      },
      {
        "id": "JavaRefresher",
        "title": "Predict Java loop output",
        "file": "JavaRefresherCalculate.java",
        "type": "java",
        "class": "JavaRefresherCalculate",
        "method": "calculate",
        "goal": "Predict the output before running the program. Work through the array mentally and choose A) 15, B) 25, C) 35, or D) 10.",
        "kind": "multiple-choice",
        "choices": [
          { "id": "A", "label": "A) 15" },
          { "id": "B", "label": "B) 25" },
          { "id": "C", "label": "C) 35" },
          { "id": "D", "label": "D) 10" }
        ],
        "answer": "B",
        "expected": ["25"],
        "hints": [
          "Only numbers greater than 5 are added.",
          "From {3, 8, 2, 10, 5, 7}, the qualifying values are 8, 10, and 7.",
          "8 + 10 + 7 equals 25."
        ],
        "solution": "The qualifying values are 8, 10, and 7. The sum is 25, so the correct answer is B.",
        "starterCode": "public class JavaRefresherCalculate {\n    public static int calculate(int[] numbers) {\n        int result = 0;\n\n        for (int number : numbers) {\n            if (number > 5) {\n                result += number;\n            }\n        }\n\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[] values = {3, 8, 2, 10, 5, 7};\n        System.out.println(calculate(values));\n    }\n}\n"
      },
      {
        "id": "FinalChallenge",
        "title": "Analyze numbers",
        "file": "FinalChallengeAnalyzeNumbers.py",
        "type": "python",
        "function": "analyze_numbers",
        "method": "analyze_numbers",
        "goal": "Return a list containing numbers that are even and greater than 10, divided by 2. Bonus: return integers without using int().",
        "expected": ["[6, 10, 15, 8]"],
        "hints": [
          "You need two checks: even and greater than 10.",
          "Use and to combine the conditions.",
          "Use number // 2 for integer division without int()."
        ],
        "solution": "def analyze_numbers(numbers):\n    result = []\n\n    for number in numbers:\n        if number % 2 == 0 and number > 10:\n            result.append(number // 2)\n\n    return result",
        "starterCode": "def analyze_numbers(numbers):\n    # YOUR CODE\n    pass\n\n\nnumbers = [5, 12, 20, 7, 8, 30, 11, 16]\nprint(analyze_numbers(numbers))\n# expected: [6, 10, 15, 8]\n"
      }
    ]
  }
];

const samplePackage = defaultSessions.find((session) => session.day === "Day2");

const storageKey = "practice-app-state";
let state = {};
try {
  state = JSON.parse(localStorage.getItem(storageKey) || "{}");
} catch {
  state = {};
}
state.sessions = Array.isArray(state.sessions) ? state.sessions : [];
defaultSessions.forEach((defaultSession) => {
  const index = state.sessions.findIndex((session) => session.day === defaultSession.day);
  const current = state.sessions[index];
  const needsUpgrade = current && defaultSession.exercises.some((exercise) => exercise.solution) && !current.exercises?.some((exercise) => exercise.solution);
  if (index < 0) {
    state.sessions.push(defaultSession);
  } else if (needsUpgrade) {
    state.sessions[index] = defaultSession;
  }
});
state.activeDay = state.activeDay || state.sessions[0].day;
state.completed = state.completed || {};
state.hints = state.hints || {};
state.notes = state.notes || {};
state.answers = state.answers || {};
state.mistakes = state.mistakes || {};
state.statuses = state.statuses || {};
state.choices = state.choices || {};
state.solutionsShown = state.solutionsShown || {};
state.difficulty = state.difficulty || {};
if (state.uiVersion !== 2) {
  state.solutionsShown = {};
  state.uiVersion = 2;
}
state.timer = state.timer || { remaining: 30 * 60, running: false, lastTick: null };

const sessionSelect = document.querySelector("#sessionSelect");
const exerciseGrid = document.querySelector("#exerciseGrid");
const hintList = document.querySelector("#hintList");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const notesInput = document.querySelector("#notesInput");
const focusLabel = document.querySelector("#focusLabel");
const topicTitle = document.querySelector("#topicTitle");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonBody = document.querySelector("#lessonBody");
const lessonExamples = document.querySelector("#lessonExamples");
const sideDay = document.querySelector("#sideDay");
const sideDifficulty = document.querySelector("#sideDifficulty");
const sideStatus = document.querySelector("#sideStatus");
const importText = document.querySelector("#importText");
const importButton = document.querySelector("#importButton");
const importMessage = document.querySelector("#importMessage");
const sampleButton = document.querySelector("#sampleButton");
const exportButton = document.querySelector("#exportButton");
const sampleJson = document.querySelector("#sampleJson");
const sessionFile = document.querySelector("#sessionFile");
const copyRunCommand = document.querySelector("#copyRunCommand");
const copyHintCommand = document.querySelector("#copyHintCommand");
const resetSessionButton = document.querySelector("#resetSessionButton");
const startTimerButton = document.querySelector("#startTimerButton");
const pauseTimerButton = document.querySelector("#pauseTimerButton");
const resetTimerButton = document.querySelector("#resetTimerButton");
const timerDisplay = document.querySelector("#timerDisplay");
const phaseLabel = document.querySelector("#phaseLabel");
const stuckButton = document.querySelector("#stuckButton");
const stuckPanel = document.querySelector("#stuckPanel");
const stuckAdvice = document.querySelector("#stuckAdvice");
const deleteSessionButton = document.querySelector("#deleteSessionButton");
const resetAllButton = document.querySelector("#resetAllButton");
const manageSummary = document.querySelector("#manageSummary");
const manageMessage = document.querySelector("#manageMessage");
const sessionList = document.querySelector("#sessionList");
const completionSummary = document.querySelector("#completionSummary");
const hintSummary = document.querySelector("#hintSummary");
const mistakeList = document.querySelector("#mistakeList");
const difficultyControls = document.querySelector("#difficultyControls");
const importPreview = document.querySelector("#importPreview");
let timerInterval = null;

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function activeSession() {
  return state.sessions.find((session) => session.day === state.activeDay) || state.sessions[0];
}

function scopedKey(kind, id = "") {
  return `${activeSession().day}:${kind}:${id}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeSession(input) {
  const rawExercises = Array.isArray(input.exercises)
    ? input.exercises
    : Object.entries(input.exercises || {}).map(([id, exercise]) => ({ id, ...exercise }));

  const session = {
    day: input.day,
    focus: input.focus,
    topic: input.topic,
    difficulty: input.difficulty,
    status: input.status || "scheduled",
    miniLesson: input.miniLesson || input.mini_lesson || {},
    exercises: rawExercises
  };

  if (!session.day || !session.focus || !session.topic || !session.exercises.length) {
    throw new Error("Session needs day, focus, topic, and at least one exercise.");
  }

  session.exercises = session.exercises.map((exercise, index) => ({
    id: exercise.id || `Exercise${index + 1}`,
    title: exercise.title || exercise.id || `Exercise ${index + 1}`,
    file: exercise.file || "No file listed",
    method: exercise.method || exercise.function || exercise.class || "practice",
    goal: exercise.goal || exercise.prompt || "Complete the exercise.",
    expected: Array.isArray(exercise.expected || exercise.visible_expected) ? exercise.expected || exercise.visible_expected : [],
    hints: Array.isArray(exercise.hints) ? exercise.hints : [],
    starterCode: exercise.starterCode || exercise.starter_code || "",
    solution: exercise.solution || "",
    kind: exercise.kind || exercise.type || "code",
    choices: Array.isArray(exercise.choices) ? exercise.choices : [],
    answer: exercise.answer || ""
  }));

  return session;
}

function previewSessionPackage(rawText) {
  if (!rawText.trim()) {
    importPreview.textContent = "No session preview yet.";
    return;
  }

  try {
    const parsed = JSON.parse(rawText);
    const incoming = Array.isArray(parsed) ? parsed : [parsed];
    const sessions = incoming.map(normalizeSession);
    importPreview.textContent = sessions
      .map((session) => `${session.day}: ${session.topic} (${session.exercises.length} exercises)`)
      .join(" | ");
  } catch (error) {
    importPreview.textContent = `Preview unavailable: ${error.message}`;
  }
}

function importSessionPackage(rawText) {
  const parsed = JSON.parse(rawText);
  const incoming = Array.isArray(parsed) ? parsed : [parsed];
  const sessions = incoming.map(normalizeSession);

  sessions.forEach((session) => {
    const index = state.sessions.findIndex((item) => item.day === session.day);
    if (index >= 0) {
      state.sessions[index] = session;
    } else {
      state.sessions.push(session);
    }
    state.activeDay = session.day;
  });

  saveState();
  renderAll();
  importMessage.textContent = `${sessions.length} session package imported.`;
}

function cleanupSessionState(day) {
  Object.keys(state.completed).forEach((key) => {
    if (key.startsWith(`${day}:`)) delete state.completed[key];
  });
  Object.keys(state.hints).forEach((key) => {
    if (key.startsWith(`${day}:`)) delete state.hints[key];
  });
  Object.keys(state.notes).forEach((key) => {
    if (key.startsWith(`${day}:`)) delete state.notes[key];
  });
  Object.keys(state.answers).forEach((key) => {
    if (key.startsWith(`${day}:`)) delete state.answers[key];
  });
  Object.keys(state.mistakes).forEach((key) => {
    if (key.startsWith(`${day}:`)) delete state.mistakes[key];
  });
  Object.keys(state.statuses).forEach((key) => {
    if (key.startsWith(`${day}:`)) delete state.statuses[key];
  });
  Object.keys(state.choices).forEach((key) => {
    if (key.startsWith(`${day}:`)) delete state.choices[key];
  });
  Object.keys(state.solutionsShown).forEach((key) => {
    if (key.startsWith(`${day}:`)) delete state.solutionsShown[key];
  });
  delete state.difficulty[day];
}

function renderSessionSelect() {
  sessionSelect.innerHTML = state.sessions
    .map((session) => `<option value="${escapeHtml(session.day)}">${escapeHtml(session.day)} - ${escapeHtml(session.focus)}</option>`)
    .join("");
  sessionSelect.value = activeSession().day;
}

function updateHeader() {
  const session = activeSession();
  focusLabel.textContent = `${session.focus} Focus`;
  topicTitle.textContent = session.topic;
  sideDay.textContent = session.day;
  sideDifficulty.textContent = `Difficulty ${session.difficulty}`;
  sideStatus.textContent = session.status || "Scheduled";

  const lesson = session.miniLesson || {};
  lessonTitle.textContent = lesson.title || `${session.focus} practice`;
  lessonBody.textContent = lesson.body || "";
  lessonExamples.innerHTML = (lesson.examples || [])
    .map((example) => `<pre><code>${escapeHtml(example.code || "")}</code></pre>`)
    .join("");
}

function updateProgress() {
  const session = activeSession();
  const done = session.exercises.filter((exercise) => {
    const status = state.statuses[scopedKey("status", exercise.id)];
    return status === "passed" || state.completed[scopedKey("complete", exercise.id)];
  }).length;
  const percent = session.exercises.length ? (done / session.exercises.length) * 100 : 0;
  progressText.textContent = `${done} of ${session.exercises.length} passed`;
  progressFill.style.width = `${percent}%`;
}

function renderTimer() {
  const remaining = Math.max(0, state.timer.remaining);
  const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
  const seconds = Math.floor(remaining % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;

  const elapsed = 30 * 60 - remaining;
  if (elapsed < 5 * 60) {
    phaseLabel.textContent = "Mini-lesson";
  } else if (elapsed < 20 * 60) {
    phaseLabel.textContent = "Exercises";
  } else if (elapsed < 27 * 60) {
    phaseLabel.textContent = "Debugging";
  } else {
    phaseLabel.textContent = "Review";
  }
}

function tickTimer() {
  if (!state.timer.running) return;
  const now = Date.now();
  const lastTick = state.timer.lastTick || now;
  const elapsed = Math.floor((now - lastTick) / 1000);
  if (elapsed <= 0) return;

  state.timer.remaining = Math.max(0, state.timer.remaining - elapsed);
  state.timer.lastTick = now;
  if (state.timer.remaining === 0) {
    state.timer.running = false;
    window.clearInterval(timerInterval);
  }
  saveState();
  renderTimer();
}

function startTimer() {
  state.timer.running = true;
  state.timer.lastTick = Date.now();
  saveState();
  window.clearInterval(timerInterval);
  timerInterval = window.setInterval(tickTimer, 1000);
}

function pauseTimer() {
  tickTimer();
  state.timer.running = false;
  state.timer.lastTick = null;
  saveState();
  window.clearInterval(timerInterval);
}

function resetTimer() {
  state.timer = { remaining: 30 * 60, running: false, lastTick: null };
  saveState();
  window.clearInterval(timerInterval);
  renderTimer();
}

function activeRunCommand() {
  return `cd /home/matheo/Documents/Projet/learning\npython3 tutor.py run ${activeSession().day}`;
}

function activeHintCommand() {
  const firstExercise = activeSession().exercises[0]?.id || "Exercise1";
  return `cd /home/matheo/Documents/Projet/learning\npython3 tutor.py hint ${activeSession().day} ${firstExercise}`;
}

function renderStatusOptions(currentStatus) {
  const options = [
    ["not-started", "Not started"],
    ["tried", "Tried"],
    ["stuck", "Stuck"],
    ["passed", "Passed"],
    ["review", "Review later"]
  ];
  return options
    .map(([value, label]) => `<option value="${value}" ${currentStatus === value ? "selected" : ""}>${label}</option>`)
    .join("");
}

function renderChoices(exercise) {
  const exerciseChoices = Array.isArray(exercise.choices) ? exercise.choices : [];
  if (!exerciseChoices.length) return "";

  const selected = state.choices[scopedKey("choice", exercise.id)] || "";
  const choices = exerciseChoices.map((choice) => `
    <label class="choice-option">
      <input type="radio" name="${escapeHtml(scopedKey("choice", exercise.id))}" value="${escapeHtml(choice.id)}" data-choice="${escapeHtml(exercise.id)}" ${selected === choice.id ? "checked" : ""}>
      <span>${escapeHtml(choice.label)}</span>
    </label>
  `).join("");

  return `<div class="choice-grid" aria-label="Answer choices">${choices}</div>`;
}

function renderExercises() {
  const session = activeSession();
  exerciseGrid.innerHTML = session.exercises.map((exercise) => {
    const legacyPassed = state.completed[scopedKey("complete", exercise.id)];
    const status = state.statuses[scopedKey("status", exercise.id)] || (legacyPassed ? "passed" : "not-started");
    const expectedItems = Array.isArray(exercise.expected) ? exercise.expected : [];
    const expected = expectedItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
    const answer = state.answers[scopedKey("answer", exercise.id)] || "";
    const mistake = state.mistakes[scopedKey("mistake", exercise.id)] || "";
    const solutionShown = state.solutionsShown[scopedKey("solution", exercise.id)];
    const solution = exercise.solution || "";
    const copyButton = exercise.starterCode
      ? `<button class="ghost-button compact-button" type="button" data-copy-starter="${escapeHtml(exercise.id)}">Copy code</button>`
      : "";
    const starter = exercise.starterCode
      ? `<details class="starter-code"><summary>Starter code</summary><pre><code>${escapeHtml(exercise.starterCode)}</code></pre></details>`
      : "";
    const choices = renderChoices(exercise);
    const solutionBlock = solution
      ? `
        <div class="solution-panel">
          <button class="ghost-button compact-button" type="button" data-solution="${escapeHtml(exercise.id)}">${solutionShown ? "Hide solution" : "Show solution"}</button>
          ${solutionShown ? `<pre><code>${escapeHtml(solution)}</code></pre>` : ""}
        </div>
      `
      : "";

    return `
      <article class="exercise-card">
        <header>
          <div>
            <span class="eyebrow">${escapeHtml(exercise.id)}</span>
            <h3>${escapeHtml(exercise.title)}</h3>
          </div>
          <span class="pill">${escapeHtml(exercise.method)}</span>
        </header>
        <p>${escapeHtml(exercise.goal)}</p>
        ${choices}
        <div class="expected" aria-label="Expected output">${expected}</div>
        <label class="status-select">
          <span>Status</span>
          <select data-status="${escapeHtml(exercise.id)}">${renderStatusOptions(status)}</select>
        </label>
        <div class="exercise-actions">
          ${copyButton}
          ${solutionBlock}
        </div>
        <details class="practice-notes" ${(answer || mistake) ? "open" : ""}>
          <summary>Practice notes</summary>
          <label class="answer-box">
            <span>Your answer</span>
            <textarea rows="5" data-answer="${escapeHtml(exercise.id)}" placeholder="Write or paste your solution here...">${escapeHtml(answer)}</textarea>
          </label>
          <label class="answer-box">
            <span>Mistake or review note</span>
            <textarea rows="2" data-mistake="${escapeHtml(exercise.id)}" placeholder="What tripped you up?">${escapeHtml(mistake)}</textarea>
          </label>
        </details>
        ${starter}
        <p class="quiet">${escapeHtml(exercise.file)}</p>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-status]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const id = event.target.dataset.status;
      state.statuses[scopedKey("status", id)] = event.target.value;
      state.completed[scopedKey("complete", id)] = event.target.value === "passed";
      saveState();
      updateProgress();
      renderReview();
    });
  });

  document.querySelectorAll("[data-answer]").forEach((textarea) => {
    textarea.addEventListener("input", (event) => {
      state.answers[scopedKey("answer", event.target.dataset.answer)] = event.target.value;
      saveState();
    });
  });

  document.querySelectorAll("[data-mistake]").forEach((textarea) => {
    textarea.addEventListener("input", (event) => {
      state.mistakes[scopedKey("mistake", event.target.dataset.mistake)] = event.target.value;
      saveState();
      renderReview();
    });
  });

  document.querySelectorAll("[data-choice]").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.choices[scopedKey("choice", event.target.dataset.choice)] = event.target.value;
      saveState();
    });
  });

  document.querySelectorAll("[data-copy-starter]").forEach((button) => {
    button.addEventListener("click", () => {
      const exercise = activeSession().exercises.find((item) => item.id === button.dataset.copyStarter);
      copyText(exercise?.starterCode || "", button, "Code copied");
    });
  });

  document.querySelectorAll("[data-solution]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = scopedKey("solution", button.dataset.solution);
      state.solutionsShown[key] = !state.solutionsShown[key];
      saveState();
      renderExercises();
    });
  });
}

function renderHints() {
  const session = activeSession();
  hintList.innerHTML = session.exercises.map((exercise) => {
    const key = scopedKey("hint", exercise.id);
    const index = state.hints[key] || 0;
    const hints = Array.isArray(exercise.hints) ? exercise.hints : [];
    const revealed = hints.slice(0, index);
    const hintText = revealed.map((hint) => `<div class="hint-text">${escapeHtml(hint)}</div>`).join("");
    const disabled = index >= hints.length ? "disabled" : "";
    const label = index >= hints.length ? "All hints shown" : `Reveal hint ${index + 1}`;

    return `
      <article class="hint-card">
        <div>
          <span class="eyebrow">${escapeHtml(exercise.id)}</span>
          <h3>${escapeHtml(exercise.title)}</h3>
        </div>
        <button class="hint-button" type="button" data-hint="${escapeHtml(exercise.id)}" ${disabled}>${label}</button>
        ${hintText}
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-hint]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.hint;
      const exercise = activeSession().exercises.find((item) => item.id === id);
      const key = scopedKey("hint", id);
      const current = state.hints[key] || 0;
      const hints = Array.isArray(exercise.hints) ? exercise.hints : [];
      state.hints[key] = Math.min(current + 1, hints.length);
      saveState();
      renderHints();
      renderReview();
    });
  });
}

function renderNotes() {
  notesInput.value = state.notes[scopedKey("notes")] || "";
}

function renderReview() {
  const session = activeSession();
  const passed = session.exercises.filter((exercise) => {
    const status = state.statuses[scopedKey("status", exercise.id)];
    return status === "passed" || state.completed[scopedKey("complete", exercise.id)];
  }).length;
  const hintCount = session.exercises.reduce((total, exercise) => total + (state.hints[scopedKey("hint", exercise.id)] || 0), 0);
  const reviewItems = session.exercises
    .map((exercise) => {
      const status = state.statuses[scopedKey("status", exercise.id)] || "not-started";
      const mistake = state.mistakes[scopedKey("mistake", exercise.id)] || "";
      const answer = state.answers[scopedKey("answer", exercise.id)] || "";
      if (!mistake && status !== "stuck" && status !== "review") return "";

      return `
        <article class="mistake-card">
          <div>
            <span class="eyebrow">${escapeHtml(exercise.id)}</span>
            <h3>${escapeHtml(exercise.title)}</h3>
          </div>
          <span class="pill">${escapeHtml(status.replace("-", " "))}</span>
          ${mistake ? `<p>${escapeHtml(mistake)}</p>` : ""}
          ${answer ? `<details><summary>Saved answer</summary><pre><code>${escapeHtml(answer)}</code></pre></details>` : ""}
        </article>
      `;
    })
    .filter(Boolean)
    .join("");

  completionSummary.innerHTML = `<code>${passed}</code> of <code>${session.exercises.length}</code> exercises passed.`;
  hintSummary.innerHTML = `<code>${hintCount}</code> hints revealed.`;
  mistakeList.innerHTML = reviewItems || `<p class="quiet">No stuck or review-later items for this session yet.</p>`;

  document.querySelectorAll("[data-difficulty-feedback]").forEach((button) => {
    button.classList.toggle("active", state.difficulty[session.day] === button.dataset.difficultyFeedback);
  });
}

function renderManage() {
  const session = activeSession();
  manageSummary.textContent = `${session.day}: ${session.focus} - ${session.topic}. ${session.exercises.length} exercises.`;
  sessionList.innerHTML = state.sessions.map((item) => {
    const activeClass = item.day === session.day ? " active-session" : "";
    return `
      <button class="session-row${activeClass}" type="button" data-session-row="${escapeHtml(item.day)}">
        <strong>${escapeHtml(item.day)}</strong>
        <span>${escapeHtml(item.focus)} - ${escapeHtml(item.topic)}</span>
      </button>
    `;
  }).join("");

  document.querySelectorAll("[data-session-row]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeDay = button.dataset.sessionRow;
      saveState();
      renderAll();
    });
  });
}

function renderAll() {
  renderSessionSelect();
  updateHeader();
  renderExercises();
  renderHints();
  renderNotes();
  renderReview();
  renderManage();
  renderTimer();
  updateProgress();
}

function wireTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".view").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`#${tab.dataset.view}`).classList.add("active");
    });
  });
}

function wireControls() {
  sessionSelect.addEventListener("change", () => {
    state.activeDay = sessionSelect.value;
    saveState();
    renderAll();
  });

  notesInput.addEventListener("input", () => {
    state.notes[scopedKey("notes")] = notesInput.value;
    saveState();
  });

  importText.addEventListener("input", () => {
    previewSessionPackage(importText.value);
  });

  importButton.addEventListener("click", () => {
    try {
      importSessionPackage(importText.value);
    } catch (error) {
      importMessage.textContent = `Import failed: ${error.message}`;
    }
  });

  sampleButton.addEventListener("click", () => {
    importText.value = JSON.stringify(samplePackage, null, 2);
    previewSessionPackage(importText.value);
  });

  exportButton.addEventListener("click", () => {
    const snapshot = JSON.stringify(state, null, 2);
    downloadText("practice-app-data.json", snapshot);
    importMessage.textContent = "App data exported.";
  });

  copyRunCommand.addEventListener("click", () => {
    copyText(activeRunCommand(), copyRunCommand, "Run command copied");
  });

  copyHintCommand.addEventListener("click", () => {
    copyText(activeHintCommand(), copyHintCommand, "Hint command copied");
  });

  resetSessionButton.addEventListener("click", () => {
    const session = activeSession();
    cleanupSessionState(session.day);
    saveState();
    renderAll();
  });

  startTimerButton.addEventListener("click", startTimer);
  pauseTimerButton.addEventListener("click", pauseTimer);
  resetTimerButton.addEventListener("click", resetTimer);

  stuckButton.addEventListener("click", () => {
    stuckPanel.hidden = !stuckPanel.hidden;
  });

  document.querySelectorAll("[data-stuck]").forEach((button) => {
    button.addEventListener("click", () => {
      const kind = button.dataset.stuck;
      const advice = {
        start: "Start by naming the input, the output, and one variable you need. Then write the smallest loop or condition before worrying about polish.",
        output: "Compare one test case by hand. Track each variable after every loop step, then find the first moment your hand result and code result split.",
        error: "Read the first error line that mentions your file. Check the line number, then look for missing semicolons, wrong names, or a return type mismatch."
      };
      stuckAdvice.textContent = advice[kind];
    });
  });

  deleteSessionButton.addEventListener("click", () => {
    const session = activeSession();
    if (state.sessions.length <= 1) {
      manageMessage.textContent = "Keep at least one session in the app.";
      return;
    }
    const confirmed = window.confirm(`Delete ${session.day} from the app? This does not delete project files.`);
    if (!confirmed) return;

    state.sessions = state.sessions.filter((item) => item.day !== session.day);
    cleanupSessionState(session.day);
    state.activeDay = state.sessions[0].day;
    saveState();
    manageMessage.textContent = `${session.day} deleted from the app.`;
    renderAll();
  });

  resetAllButton.addEventListener("click", () => {
    const confirmed = window.confirm("Reset all app data and return to the default Day1 session?");
    if (!confirmed) return;
    localStorage.removeItem(storageKey);
    window.location.reload();
  });

  sessionFile.addEventListener("change", async () => {
    const file = sessionFile.files[0];
    if (!file) return;
    importText.value = await file.text();
    previewSessionPackage(importText.value);
  });

  difficultyControls.querySelectorAll("[data-difficulty-feedback]").forEach((button) => {
    button.addEventListener("click", () => {
      state.difficulty[activeSession().day] = button.dataset.difficultyFeedback;
      saveState();
      renderReview();
    });
  });
}

function wireCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      copyText(button.dataset.copy, button);
    });
  });
}

async function copyText(text, button, copiedLabel = "Copied") {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = copiedLabel;
  } catch {
    button.textContent = "Copy failed";
  }
  window.setTimeout(() => {
    button.textContent = original;
  }, 1100);
}

function downloadText(fileName, text) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

sampleJson.textContent = JSON.stringify(samplePackage, null, 2);
wireTabs();
wireControls();
wireCopyButtons();
renderAll();
if (state.timer.running) {
  startTimer();
}
