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
  }
];

const samplePackage = {
  day: "Day2",
  focus: "Python",
  topic: "Functions + Lists",
  difficulty: 1,
  status: "scheduled",
  miniLesson: {
    title: "A function can build and return a list.",
    body: "Use a result list, append matching items, then return the final list.",
    examples: [
      {
        label: "Python",
        code: "def keep_even(numbers):\n    result = []\n    for number in numbers:\n        if number % 2 == 0:\n            result.append(number)\n    return result"
      }
    ]
  },
  exercises: [
    {
      id: "Exercise1",
      title: "Short title",
      file: "Exercise1.py",
      method: "function_name",
      goal: "What you need to make the code do.",
      expected: ["expected output line"],
      hints: ["Small conceptual hint", "More specific hint", "Almost there hint"],
      starterCode: "def function_name():\n    pass\n"
    }
  ]
};

const storageKey = "practice-app-state";
const state = JSON.parse(localStorage.getItem(storageKey) || "{}");
state.sessions = state.sessions || defaultSessions;
state.activeDay = state.activeDay || state.sessions[0].day;
state.completed = state.completed || {};
state.hints = state.hints || {};
state.notes = state.notes || {};
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
    expected: exercise.expected || exercise.visible_expected || [],
    hints: exercise.hints || [],
    starterCode: exercise.starterCode || exercise.starter_code || ""
  }));

  return session;
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
  const done = session.exercises.filter((exercise) => state.completed[scopedKey("complete", exercise.id)]).length;
  const percent = session.exercises.length ? (done / session.exercises.length) * 100 : 0;
  progressText.textContent = `${done} of ${session.exercises.length} checked`;
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

function renderExercises() {
  const session = activeSession();
  exerciseGrid.innerHTML = session.exercises.map((exercise) => {
    const checked = state.completed[scopedKey("complete", exercise.id)] ? "checked" : "";
    const expected = exercise.expected.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
    const starter = exercise.starterCode
      ? `<details class="starter-code"><summary>Starter code</summary><pre><code>${escapeHtml(exercise.starterCode)}</code></pre></details>`
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
        <div class="expected" aria-label="Expected output">${expected}</div>
        <label class="check-row">
          <input type="checkbox" data-complete="${escapeHtml(exercise.id)}" ${checked}>
          <span>I ran this and it passed</span>
        </label>
        ${starter}
        <p class="quiet">${escapeHtml(exercise.file)}</p>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-complete]").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      state.completed[scopedKey("complete", event.target.dataset.complete)] = event.target.checked;
      saveState();
      updateProgress();
    });
  });
}

function renderHints() {
  const session = activeSession();
  hintList.innerHTML = session.exercises.map((exercise) => {
    const key = scopedKey("hint", exercise.id);
    const index = state.hints[key] || 0;
    const revealed = exercise.hints.slice(0, index);
    const hintText = revealed.map((hint) => `<div class="hint-text">${escapeHtml(hint)}</div>`).join("");
    const disabled = index >= exercise.hints.length ? "disabled" : "";
    const label = index >= exercise.hints.length ? "All hints shown" : `Reveal hint ${index + 1}`;

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
      state.hints[key] = Math.min(current + 1, exercise.hints.length);
      saveState();
      renderHints();
    });
  });
}

function renderNotes() {
  notesInput.value = state.notes[scopedKey("notes")] || "";
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

  importButton.addEventListener("click", () => {
    try {
      importSessionPackage(importText.value);
    } catch (error) {
      importMessage.textContent = `Import failed: ${error.message}`;
    }
  });

  sampleButton.addEventListener("click", () => {
    importText.value = JSON.stringify(samplePackage, null, 2);
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
  });
}

function wireCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy);
      const original = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = original;
      }, 900);
    });
  });
}

async function copyText(text, button, copiedLabel = "Copied") {
  await navigator.clipboard.writeText(text);
  const original = button.textContent;
  button.textContent = copiedLabel;
  window.setTimeout(() => {
    button.textContent = original;
  }, 900);
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
