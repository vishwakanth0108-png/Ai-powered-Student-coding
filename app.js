"use strict";

const STORAGE_KEYS = {
  settings: "loop.settings.v1",
  progress: "loop.progress.v1",
  code: "loop.code.v1",
};

const LANGUAGES = {
  python: { label: "Python 3", extension: ".py", judgeId: 71 },
  java: { label: "Java", extension: ".java", judgeId: 62 },
  c: { label: "C", extension: ".c", judgeId: 50 },
  cpp: { label: "C++", extension: ".cpp", judgeId: 54 },
};

const STARTERS = {
  python: (problem) => `# ${problem.title}\n# Read input, solve the problem, and print your answer.\n\n`,
  java: () => `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        // Read input, solve the problem, and print your answer.\n    }\n}\n`,
  c: () => `#include <stdio.h>\n\nint main(void) {\n    // Read input, solve the problem, and print your answer.\n    return 0;\n}\n`,
  cpp: () => `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Read input, solve the problem, and print your answer.\n    return 0;\n}\n`,
};

const PROBLEMS = [
  {
    id: "sum-two-numbers",
    title: "Sum of Two Numbers",
    topic: "Basics",
    difficulty: "Easy",
    minutes: 10,
    description: "Read two integers from standard input and print their sum.\n\nThe input contains two space-separated integers. Print a single integer: their total.",
    hint: "Read both numbers, add them, then print the result. In Python, input().split() can help you read a space-separated line.",
    samples: [{ input: "3 5", output: "8" }, { input: "-4 9", output: "5" }],
  },
  {
    id: "reverse-a-string",
    title: "Reverse a String",
    topic: "Strings",
    difficulty: "Easy",
    minutes: 12,
    description: "Given a line of text, print its characters in reverse order.\n\nThe input is a single line. Keep spaces in the line and print the reversed text.",
    hint: "Walk through the characters from the last one to the first, or use a language's built-in reverse operation.",
    samples: [{ input: "hello", output: "olleh" }, { input: "code time", output: "emit edoc" }],
  },
  {
    id: "count-vowels",
    title: "Count the Vowels",
    topic: "Strings",
    difficulty: "Easy",
    minutes: 15,
    description: "Count how many vowels appear in the given line of text.\n\nTreat uppercase and lowercase vowels the same. The vowels are a, e, i, o, and u.",
    hint: "Normalize letters to lowercase, then count every character that belongs to the set of vowels.",
    samples: [{ input: "Learning to code", output: "6" }, { input: "rhythm", output: "0" }],
  },
  {
    id: "largest-in-array",
    title: "Find the Largest Number",
    topic: "Arrays",
    difficulty: "Easy",
    minutes: 15,
    description: "Find the largest value in a list of integers.\n\nThe first input line contains the number of values, n. The second line contains n space-separated integers. Print the largest value.",
    hint: "Start with the first number as the largest seen so far. Compare each remaining number and update it when you find a bigger value.",
    samples: [{ input: "5\n3 8 2 10 4", output: "10" }, { input: "4\n-5 -2 -9 -1", output: "-1" }],
  },
  {
    id: "fizz-buzz",
    title: "Fizz Buzz",
    topic: "Loops",
    difficulty: "Easy",
    minutes: 15,
    description: "Print the numbers from 1 through n, one per line.\n\nFor multiples of 3 print Fizz instead, for multiples of 5 print Buzz, and for multiples of both print FizzBuzz.",
    hint: "Check divisibility by both 3 and 5 first. Then check each one separately before printing the number.",
    samples: [{ input: "5", output: "1\n2\nFizz\n4\nBuzz" }, { input: "15", output: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" }],
  },
  {
    id: "pair-target",
    title: "Pair Sum",
    topic: "Arrays",
    difficulty: "Medium",
    minutes: 25,
    description: "Determine whether any two different values in the list add up to the target.\n\nThe first line contains n and the target. The second line contains n space-separated integers. Print Yes if a pair exists, otherwise print No.",
    hint: "As you visit each number, check whether its complement (target minus that number) has appeared before.",
    samples: [{ input: "5 9\n2 7 11 15 1", output: "Yes" }, { input: "4 20\n1 3 5 7", output: "No" }],
  },
  {
    id: "factorial",
    title: "A Little Factorial",
    topic: "Loops",
    difficulty: "Easy",
    minutes: 15,
    description: "Calculate the factorial of a non-negative integer n.\n\nThe factorial is the product of all positive integers from 1 to n. By definition, 0! is 1.",
    hint: "Start the answer at 1 and multiply by every integer from 2 through n. Remember that 0! equals 1.",
    samples: [{ input: "5", output: "120" }, { input: "0", output: "1" }],
  },
  {
    id: "palindrome-check",
    title: "Palindrome Check",
    topic: "Strings",
    difficulty: "Easy",
    minutes: 15,
    description: "Check whether a word reads the same forwards and backwards.\n\nCompare without case sensitivity. Print Yes if it is a palindrome, otherwise print No.",
    hint: "Convert the word to lowercase, then compare it with the same word read in reverse.",
    samples: [{ input: "Racecar", output: "Yes" }, { input: "coding", output: "No" }],
  },
  {
    id: "binary-search",
    title: "Find It Fast",
    topic: "Algorithms",
    difficulty: "Medium",
    minutes: 25,
    description: "Find the position of a target in a sorted list, or report that it is missing.\n\nThe first line contains n and the target. The second line contains n sorted integers. Print the target's zero-based index, or -1 if it does not appear.",
    hint: "Use binary search: inspect the middle value and discard the half that cannot contain the target.",
    samples: [{ input: "6 9\n1 3 5 7 9 11", output: "4" }, { input: "4 6\n2 4 8 10", output: "-1" }],
  },
  {
    id: "word-count",
    title: "Count the Words",
    topic: "Strings",
    difficulty: "Easy",
    minutes: 10,
    description: "Count the words in one line of text.\n\nWords are separated by one or more spaces. An empty or whitespace-only line contains zero words.",
    hint: "Split the line on whitespace and count only the non-empty pieces.",
    samples: [{ input: "coding is fun", output: "3" }, { input: "  one   two ", output: "2" }],
  },
  {
    id: "array-average",
    title: "Average It Out",
    topic: "Arrays",
    difficulty: "Easy",
    minutes: 15,
    description: "Calculate the average of a list of integers.\n\nThe first line contains n. The second line contains n space-separated integers. Print the average as a number.",
    hint: "Add all values, then divide their sum by the number of values. Print enough precision for a decimal answer.",
    samples: [{ input: "4\n2 4 6 8", output: "5" }, { input: "3\n1 2 3", output: "2" }],
  },
  {
    id: "unique-values",
    title: "Keep It Unique",
    topic: "Algorithms",
    difficulty: "Medium",
    minutes: 20,
    description: "Print the number of distinct values in a list.\n\nThe first line contains n. The second line contains n space-separated integers.",
    hint: "Keep a set of values you have seen. A set stores each distinct value only once.",
    samples: [{ input: "6\n1 2 2 3 3 3", output: "3" }, { input: "4\n5 5 5 5", output: "1" }],
  },
  {
    id: "longest-unique-substring",
    title: "Longest Unique Substring",
    topic: "Strings",
    difficulty: "Hard",
    minutes: 35,
    description: "Find the length of the longest contiguous substring that contains no repeated characters.\n\nThe input is a single line of text. Print the length of the longest substring with all distinct characters.",
    hint: "Use a sliding window. When a repeated character appears, move the window's left edge past its previous occurrence.",
    samples: [{ input: "abcabcbb", output: "3" }, { input: "bbbbb", output: "1" }],
  },
  {
    id: "count-islands",
    title: "Count the Islands",
    topic: "Algorithms",
    difficulty: "Hard",
    minutes: 40,
    description: "Count the groups of connected land cells in a grid.\n\nThe first line contains the number of rows and columns. Each following line contains one row of 0s and 1s, where 1 is land and 0 is water. Cells connect horizontally and vertically, but not diagonally.",
    hint: "Scan every cell. When you find unvisited land, count a new island and use a depth-first or breadth-first search to mark all connected land.",
    samples: [{ input: "4 5\n11000\n11000\n00100\n00011", output: "3" }, { input: "2 3\n111\n010", output: "1" }],
  },
  {
    id: "minimum-coins",
    title: "Minimum Coins",
    topic: "Algorithms",
    difficulty: "Hard",
    minutes: 40,
    description: "Find the fewest coins needed to make a target amount using unlimited coins of each denomination.\n\nThe first line contains the number of denominations and the target amount. The second line contains the coin values. Print the minimum number of coins, or -1 if the amount cannot be made.",
    hint: "Build a dynamic programming table from 0 up to the target. For each amount, try every coin and keep the smallest number of coins that reaches it.",
    samples: [{ input: "3 11\n1 5 7", output: "3" }, { input: "2 3\n2 4", output: "-1" }],
  },
];

function loadStored(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showToast("Your browser couldn’t save this locally. Check your storage settings.");
    return false;
  }
}

const settings = loadStored(STORAGE_KEYS.settings, {});
const progress = loadStored(STORAGE_KEYS.progress, { solved: [], activity: [], streak: 0, lastPracticeDate: null });
let activeProblem = null;
let activeTopicFilter = "All";
let activeDifficultyFilter = "All";
let lastRun = null;
let toastTimer = null;

const elements = Object.fromEntries([
  "dashboard-view", "problems-view", "progress-view", "workspace-view", "breadcrumb-page",
  "continue-practice", "back-to-problems", "today-label", "solved-count", "streak-count", "streak-stat", "language-count",
  "featured-problems", "all-problems", "problem-total", "problem-count-badge", "filter-chips", "difficulty-filters", "progress-total", "search-input",
  "workspace-title", "workspace-difficulty", "workspace-topic", "workspace-problem-title",
  "workspace-description", "workspace-examples", "workspace-hint", "language-select",
  "file-extension", "code-editor", "line-numbers", "output-panel", "run-status",
  "run-summary", "run-summary-icon", "run-summary-title", "run-summary-detail", "run-tests", "output-content",
  "run-button", "analyze-button", "progress-solved", "progress-streak", "progress-track-fill",
  "progress-caption", "activity-list", "progress-summary", "progress-summary-button",
  "workspace-ai-button", "settings-modal", "settings-form", "ai-api-key", "judge0-api-url",
  "judge0-api-key", "close-settings", "toast",
].map((id) => [id, document.getElementById(id)]));

function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(date);
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setView(view) {
  const views = {
    dashboard: ["dashboard-view", "Overview"],
    problems: ["problems-view", "Practice problems"],
    progress: ["progress-view", "My progress"],
  };
  if (view === "workspace") {
    document.querySelectorAll(".page-content, .workspace-view").forEach((section) => section.classList.add("hidden"));
    elements["workspace-view"].classList.remove("hidden");
    elements["breadcrumb-page"].textContent = "Workspace";
  } else {
    const [visibleId, label] = views[view] || views.dashboard;
    document.querySelectorAll(".page-content, .workspace-view").forEach((section) => section.classList.add("hidden"));
    document.getElementById(visibleId).classList.remove("hidden");
    elements["breadcrumb-page"].textContent = label;
    if (view === "progress") renderProgress();
  }
  document.querySelectorAll(".nav-link[data-view]").forEach((link) => link.classList.toggle("active", link.dataset.view === view));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function problemCard(problem) {
  const solved = progress.solved.includes(problem.id);
  const difficultyClass = problem.difficulty.toLowerCase();
  return `<article class="problem-card" data-problem="${problem.id}" tabindex="0" role="button" aria-label="Practice ${escapeHtml(problem.title)}, ${problem.difficulty}">
    <div class="problem-card-top"><span class="difficulty-badge ${difficultyClass}">${problem.difficulty}</span>${solved ? '<span class="solved-check" aria-label="Solved">✓</span>' : ""}</div>
    <h3>${escapeHtml(problem.title)}</h3><p>${escapeHtml(problem.description.split("\n")[0])}</p>
    <div class="problem-card-footer"><span class="problem-topic">${escapeHtml(problem.topic)}</span><span class="problem-time">◷ ${problem.minutes} min</span></div>
  </article>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function renderFeatured() {
  const featured = PROBLEMS.filter((problem) => !progress.solved.includes(problem.id)).slice(0, 3);
  elements["featured-problems"].innerHTML = (featured.length ? featured : PROBLEMS.slice(0, 3)).map(problemCard).join("");
  updateStats();
}

function renderProblems() {
  const query = elements["search-input"].value.trim().toLowerCase();
  const visible = PROBLEMS.filter((problem) => {
    const matchesTopic = activeTopicFilter === "All" || problem.topic === activeTopicFilter;
    const matchesDifficulty = activeDifficultyFilter === "All" || problem.difficulty === activeDifficultyFilter;
    const matchesQuery = !query || `${problem.title} ${problem.topic} ${problem.difficulty} ${problem.description}`.toLowerCase().includes(query);
    return matchesTopic && matchesDifficulty && matchesQuery;
  });
  elements["problem-total"].textContent = `${visible.length} ${visible.length === 1 ? "problem" : "problems"}`;
  elements["problem-count-badge"].textContent = PROBLEMS.length;
  elements["all-problems"].innerHTML = visible.length ? visible.map(problemCard).join("") : '<div class="no-results">No problems match that search yet. Try another topic or search term.</div>';
}

function updateStats() {
  elements["solved-count"].textContent = progress.solved.length;
  elements["streak-count"].textContent = progress.streak || 0;
  elements["streak-stat"].textContent = progress.streak || 0;
  elements["language-count"].textContent = Object.keys(LANGUAGES).length;
}

function renderProgress() {
  const solvedCount = progress.solved.length;
  elements["progress-solved"].textContent = solvedCount;
  elements["progress-streak"].textContent = progress.streak || 0;
  elements["progress-total"].textContent = `${PROBLEMS.length} total`;
  elements["progress-track-fill"].style.width = `${Math.min(100, solvedCount / PROBLEMS.length * 100)}%`;
  elements["progress-caption"].textContent = `${Math.min(solvedCount, PROBLEMS.length)} of ${PROBLEMS.length} practice problems`;
  const today = new Date().getDay();
  document.querySelectorAll(".streak-week span").forEach((day, index) => day.classList.toggle("today", index === (today + 6) % 7));
  const activity = progress.activity.slice(0, 5);
  elements["activity-list"].innerHTML = activity.length ? activity.map((item) => `<div class="activity-item"><span class="activity-mark">✓</span><div><strong>${escapeHtml(item.title)}</strong><small>Solved · ${escapeHtml(item.date)}</small></div></div>`).join("") : '<div class="activity-empty">Your recent practice will show up here. Pick a problem and give it a go!</div>';
  elements["progress-summary"].classList.add("hidden");
  elements["progress-summary"].textContent = "";
}

function openProblem(id) {
  const problem = PROBLEMS.find((item) => item.id === id);
  if (!problem) return;
  activeProblem = problem;
  lastRun = null;
  elements["workspace-title"].textContent = problem.title;
  elements["workspace-difficulty"].textContent = problem.difficulty;
  elements["workspace-difficulty"].className = `difficulty-badge ${problem.difficulty.toLowerCase()}`;
  elements["workspace-topic"].textContent = problem.topic;
  elements["workspace-problem-title"].textContent = problem.title;
  elements["workspace-description"].textContent = problem.description;
  elements["workspace-hint"].textContent = problem.hint;
  elements["workspace-examples"].innerHTML = problem.samples.map((sample, index) => `<div class="example-box"><div class="example-title">Example ${index + 1}</div><pre>Input: ${escapeHtml(sample.input)}</pre><div class="example-output"><strong>Output:</strong> <code>${escapeHtml(sample.output)}</code></div></div>`).join("");
  elements["language-select"].value = "python";
  loadEditorCode();
  clearOutput();
  setView("workspace");
}

function codeStorage() {
  return loadStored(STORAGE_KEYS.code, {});
}

function codeStorageKey() {
  return `${activeProblem.id}.${elements["language-select"].value}`;
}

function loadEditorCode() {
  const language = elements["language-select"].value;
  const saved = codeStorage()[codeStorageKey()];
  elements["file-extension"].textContent = LANGUAGES[language].extension;
  elements["code-editor"].value = saved ?? STARTERS[language](activeProblem);
  updateLineNumbers();
}

function updateLineNumbers() {
  const lineCount = Math.max(1, elements["code-editor"].value.split("\n").length);
  elements["line-numbers"].innerHTML = Array.from({ length: lineCount }, (_, index) => `<span>${index + 1}</span>`).join("");
}

function saveEditorCode() {
  if (!activeProblem) return;
  const codes = codeStorage();
  codes[codeStorageKey()] = elements["code-editor"].value;
  saveStored(STORAGE_KEYS.code, codes);
}

function clearOutput() {
  elements["output-panel"].dataset.state = "idle";
  elements["run-status"].textContent = "Not run yet";
  elements["run-summary-icon"].textContent = "▶";
  elements["run-summary-title"].textContent = "Ready to run your code";
  elements["run-summary-detail"].textContent = "Your sample tests will run when you press Run code.";
  elements["run-tests"].innerHTML = "";
  elements["run-tests"].classList.add("hidden");
  elements["output-content"].textContent = "Run your code to see the results here.";
  elements["output-content"].className = "";
  elements["output-content"].classList.remove("hidden");
}

function setRunSummary(state, icon, title, detail) {
  elements["output-panel"].dataset.state = state;
  elements["run-summary-icon"].textContent = icon;
  elements["run-summary-title"].textContent = title;
  elements["run-summary-detail"].textContent = detail;
}

function getResultMessage(result) {
  const statusId = result.status?.id;
  if (statusId === 6) return { kind: "compile-error", label: "Compilation error" };
  if (statusId === 5) return { kind: "time-limit", label: "Time limit exceeded" };
  if (statusId >= 7 && statusId <= 12) return { kind: "runtime-error", label: "Runtime error" };
  if (statusId !== 3) return { kind: "execution-error", label: result.status?.description || "Could not execute" };
  if (normalizeOutput(result.stdout) !== normalizeOutput(result.expected)) return { kind: "wrong-answer", label: "Wrong answer" };
  return { kind: "passed", label: "Passed" };
}

function renderTestResults(results) {
  elements["run-tests"].innerHTML = results.map((result, index) => {
    const message = getResultMessage(result);
    const resultDetails = message.kind === "compile-error"
      ? result.compileOutput || "The compiler could not build your program."
      : message.kind === "runtime-error" || message.kind === "time-limit" || message.kind === "execution-error"
        ? result.stderr || result.compileOutput || result.status?.description || "The program could not finish."
        : "";
    const outputDetails = message.kind === "passed" || message.kind === "wrong-answer";
    const outputComparison = outputDetails
      ? `<div class="test-output-comparison"><div><span>EXPECTED OUTPUT</span><pre>${escapeHtml(result.expected || "(no output)")}</pre></div><div><span>YOUR OUTPUT</span><pre>${escapeHtml(result.stdout || "(no output)")}</pre></div></div>`
      : "";
    return `<article class="test-result" data-state="${message.kind}">
      <div class="test-result-heading"><strong>Sample test ${index + 1}</strong><span class="test-result-badge">${message.label}</span></div>
      ${resultDetails ? `<pre class="test-error-detail">${escapeHtml(resultDetails)}</pre>` : ""}
      ${outputComparison}
      ${result.time ? `<span class="test-metric">Run time: ${escapeHtml(result.time)}s</span>` : ""}
    </article>`;
  }).join("");
  elements["run-tests"].classList.remove("hidden");
  elements["output-content"].classList.add("hidden");
}

function showToast(message) {
  elements["toast"].textContent = message;
  elements["toast"].classList.remove("hidden");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements["toast"].classList.add("hidden"), 4200);
}

function setBusy(button, busy, label) {
  button.disabled = busy;
  if (button === elements["run-button"]) button.innerHTML = busy ? "Running…" : '<span>▶</span> Run code';
  else button.textContent = busy ? "✦ Thinking…" : label;
}

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function decodeBase64(text) {
  const binary = atob(text);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function normalizeOutput(value) {
  return value.replace(/\r\n/g, "\n").trim();
}

function runnerHeaders() {
  const headers = { "Content-Type": "application/json", Accept: "application/json" };
  if (settings.judge0ApiKey) headers["X-Auth-Token"] = settings.judge0ApiKey;
  return headers;
}

async function executeSample(sample) {
  const baseUrl = (settings.judge0ApiUrl || "https://ce.judge0.com").replace(/\/+$/, "");
  const language = LANGUAGES[elements["language-select"].value];
  const response = await fetch(`${baseUrl}/submissions?base64_encoded=true&wait=true`, {
    method: "POST",
    headers: runnerHeaders(),
    body: JSON.stringify({
      source_code: encodeBase64(elements["code-editor"].value),
      language_id: language.judgeId,
      stdin: encodeBase64(sample.input),
    }),
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 240);
    throw new Error(`The code runner returned ${response.status}${detail ? `: ${detail}` : ""}`);
  }
  const result = await response.json();
  if (result.status?.id <= 2) throw new Error("The code runner is still processing this submission. Please try again in a moment.");
  const stdout = result.stdout ? decodeBase64(result.stdout) : "";
  const stderr = result.stderr ? decodeBase64(result.stderr) : "";
  const compileOutput = result.compile_output ? decodeBase64(result.compile_output) : "";
  return { ...result, stdout, stderr, compileOutput };
}

function recordSolved(problem) {
  if (!progress.solved.includes(problem.id)) progress.solved.push(problem.id);
  const now = new Date();
  const today = localDateKey(now);
  if (progress.lastPracticeDate !== today) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    progress.streak = progress.lastPracticeDate === localDateKey(yesterday) ? (progress.streak || 0) + 1 : 1;
    progress.lastPracticeDate = today;
  }
  progress.activity = [{ id: problem.id, title: problem.title, date: formatDate(new Date()) }, ...progress.activity.filter((item) => item.id !== problem.id)].slice(0, 10);
  saveStored(STORAGE_KEYS.progress, progress);
  renderFeatured();
}

async function runCode() {
  if (!activeProblem || elements["run-button"].disabled) return;
  saveEditorCode();
  setBusy(elements["run-button"], true);
  elements["run-status"].textContent = "Running sample tests…";
  setRunSummary("running", "…", "Running your code", `Checking ${activeProblem.samples.length} sample tests. This can take a moment.`);
  elements["run-tests"].innerHTML = "";
  elements["run-tests"].classList.add("hidden");
  elements["output-content"].className = "";
  elements["output-content"].classList.remove("hidden");
  elements["output-content"].textContent = "Sending your code to the configured runner…";
  try {
    const results = [];
    for (const [index, sample] of activeProblem.samples.entries()) {
      elements["run-status"].textContent = `Running example ${index + 1} of ${activeProblem.samples.length}…`;
      const result = await executeSample(sample);
      results.push({
        status: result.status,
        stdout: result.stdout,
        stderr: result.stderr,
        compileOutput: result.compileOutput,
        expected: sample.output,
        time: result.time,
      });
    }
    lastRun = { results, passed: results.every((result) => getResultMessage(result).kind === "passed") };
    const passedCount = results.filter((result) => getResultMessage(result).kind === "passed").length;
    const testCount = activeProblem.samples.length;
    renderTestResults(results);
    elements["run-status"].textContent = `${passedCount} / ${testCount} passed`;
    if (lastRun.passed) {
      setRunSummary("success", "✓", "All sample tests passed!", `Your output matched all ${testCount} examples. Hidden tests may still check other cases.`);
      const wasSolved = progress.solved.includes(activeProblem.id);
      recordSolved(activeProblem);
      showToast(wasSolved ? "Nice work — all sample tests pass again!" : "All sample tests passed. Problem added to your progress!");
    } else {
      const failedCount = testCount - passedCount;
      setRunSummary("failure", "!", `${passedCount} of ${testCount} sample tests passed`, `${failedCount} ${failedCount === 1 ? "test needs" : "tests need"} attention. Check the result details below, make a change, then run again.`);
    }
  } catch (error) {
    lastRun = { error: error.message };
    elements["run-status"].textContent = "Couldn’t finish running";
    setRunSummary("error", "!", "We couldn’t run your code", "This is a runner connection or setup issue, not a result for your program.");
    elements["output-content"].textContent = `${error.message}\n\nCheck that the runner endpoint is reachable and supports browser requests. You can change it in Settings.`;
    elements["output-content"].className = "error-output";
    elements["output-content"].classList.remove("hidden");
  } finally {
    setBusy(elements["run-button"], false);
  }
}

async function callAi(prompt) {
  if (!settings.aiApiKey) {
    openSettings();
    throw new Error("Add your AI provider API key in Settings to use AI coaching.");
  }
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${settings.aiApiKey}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a kind, concise coding tutor for a student. Explain ideas simply, point out the next useful step, and do not provide a complete solution unless the student explicitly asks. Never claim code was executed unless the provided results show it." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 450,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error?.message || `AI provider returned ${response.status}.`;
    throw new Error(message);
  }
  const answer = data.choices?.[0]?.message?.content;
  if (!answer) throw new Error("The AI provider returned an empty response.");
  return answer.trim();
}

function buildCodePrompt(mode) {
  const latestResults = lastRun?.results?.map((item, index) => ({
    example: index + 1,
    status: item.status?.description,
    passed: getResultMessage(item).kind === "passed",
    output: item.stdout,
    error: item.compileOutput || item.stderr,
    expected: activeProblem.samples[index].output,
  })) || [];
  const request = mode === "hint"
    ? "Give one short, helpful hint for the next step. Don't write the complete solution."
    : "Explain the error or behavior and suggest a specific next debugging step. If the samples passed, briefly say what this solution does well and suggest one improvement.";
  return `${request}\n\nProblem: ${activeProblem.title}\nProblem description: ${activeProblem.description}\nLanguage: ${LANGUAGES[elements["language-select"].value].label}\nStudent's code:\n${elements["code-editor"].value}\n\nLatest sample results (empty means they have not been run):\n${JSON.stringify(latestResults, null, 2)}`;
}

async function requestCodeHelp(mode) {
  const button = mode === "hint" ? elements["workspace-ai-button"] : elements["analyze-button"];
  const original = mode === "hint" ? "Get a hint →" : "✦ Analyze with AI";
  setBusy(button, true, original);
  try {
    const answer = await callAi(buildCodePrompt(mode));
    elements["run-status"].textContent = mode === "hint" ? "AI hint" : "AI analysis";
    setRunSummary("info", "✦", mode === "hint" ? "AI coding hint" : "AI code analysis", "AI feedback is guidance, not a test result. Run your code to check the sample tests.");
    elements["run-tests"].classList.add("hidden");
    elements["output-content"].textContent = answer;
    elements["output-content"].className = "";
    elements["output-content"].classList.remove("hidden");
  } catch (error) {
    if (settings.aiApiKey) showToast(`AI help didn’t work: ${error.message}`);
  } finally {
    setBusy(button, false, original);
  }
}

async function summarizeProgress() {
  const button = elements["progress-summary-button"];
  const responseBox = elements["progress-summary"];
  button.disabled = true;
  button.textContent = "✦ Putting together your check-in…";
  responseBox.classList.remove("hidden");
  responseBox.textContent = "A moment while your learning summary is prepared…";
  try {
    const solved = progress.solved.map((id) => PROBLEMS.find((problem) => problem.id === id)).filter(Boolean);
    const summary = await callAi(`Reflect on this student's practice and give an encouraging, brief progress summary, one strength, and one practical next step. Don't invent information.\nSolved problems: ${solved.map((problem) => `${problem.title} (${problem.topic}, ${problem.difficulty})`).join(", ") || "None yet"}\nTotal problems available: ${PROBLEMS.length}\nCurrent practice streak: ${progress.streak || 0} days\nLanguages available: ${Object.values(LANGUAGES).map((language) => language.label).join(", ")}`);
    responseBox.textContent = summary;
  } catch (error) {
    responseBox.textContent = error.message;
    if (settings.aiApiKey) showToast(`Couldn’t prepare your summary: ${error.message}`);
  } finally {
    button.disabled = false;
    button.textContent = "✨ Summarize my progress";
  }
}

function openSettings() {
  elements["ai-api-key"].value = settings.aiApiKey || "";
  elements["judge0-api-url"].value = settings.judge0ApiUrl || "";
  elements["judge0-api-key"].value = settings.judge0ApiKey || "";
  elements["settings-modal"].classList.remove("hidden");
  elements["ai-api-key"].focus();
}

function closeSettings() {
  elements["settings-modal"].classList.add("hidden");
}

function saveSettings(event) {
  event.preventDefault();
  settings.aiApiKey = elements["ai-api-key"].value.trim();
  settings.judge0ApiUrl = elements["judge0-api-url"].value.trim().replace(/\/+$/, "");
  settings.judge0ApiKey = elements["judge0-api-key"].value.trim();
  if (saveStored(STORAGE_KEYS.settings, settings)) showToast("Settings saved in this browser.");
  closeSettings();
}

document.querySelectorAll(".nav-link[data-view], [data-view]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.addEventListener("click", (event) => {
  const card = event.target.closest(".problem-card");
  if (card) openProblem(card.dataset.problem);
});

document.addEventListener("keydown", (event) => {
  const card = event.target.closest?.(".problem-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openProblem(card.dataset.problem);
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    elements["search-input"].focus();
  }
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && !elements["workspace-view"].classList.contains("hidden")) {
    event.preventDefault();
    runCode();
  }
  if (event.key === "Escape") closeSettings();
});

elements["continue-practice"].addEventListener("click", () => setView("problems"));
document.querySelectorAll(".topic-link").forEach((link) => link.addEventListener("click", () => {
  activeTopicFilter = link.dataset.filter;
  document.querySelectorAll("#filter-chips .filter-chip").forEach((chip) => chip.classList.toggle("selected", chip.dataset.filter === activeTopicFilter));
  renderProblems();
  setView("problems");
}));
elements["filter-chips"].addEventListener("click", (event) => {
  const chip = event.target.closest(".filter-chip");
  if (!chip) return;
  activeTopicFilter = chip.dataset.filter;
  document.querySelectorAll("#filter-chips .filter-chip").forEach((item) => item.classList.toggle("selected", item === chip));
  renderProblems();
});
elements["difficulty-filters"].addEventListener("click", (event) => {
  const chip = event.target.closest(".filter-chip");
  if (!chip) return;
  activeDifficultyFilter = chip.dataset.difficulty;
  document.querySelectorAll("#difficulty-filters .filter-chip").forEach((item) => item.classList.toggle("selected", item === chip));
  renderProblems();
});
elements["search-input"].addEventListener("input", () => {
  renderProblems();
  if (!elements["problems-view"].classList.contains("hidden")) return;
  setView("problems");
});
elements["back-to-problems"].addEventListener("click", () => setView("problems"));
elements["language-select"].addEventListener("change", () => {
  loadEditorCode();
  clearOutput();
});
elements["code-editor"].addEventListener("input", () => { updateLineNumbers(); saveEditorCode(); });
elements["code-editor"].addEventListener("scroll", () => { elements["line-numbers"].scrollTop = elements["code-editor"].scrollTop; });
elements["code-editor"].addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const editor = elements["code-editor"];
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.setRangeText("    ", start, end, "end");
    updateLineNumbers();
    saveEditorCode();
  }
});
elements["run-button"].addEventListener("click", runCode);
elements["analyze-button"].addEventListener("click", () => requestCodeHelp("analyze"));
elements["workspace-ai-button"].addEventListener("click", () => requestCodeHelp("hint"));
elements["progress-summary-button"].addEventListener("click", summarizeProgress);
["open-settings", "top-settings", "workspace-settings"].forEach((id) => document.getElementById(id).addEventListener("click", openSettings));
elements["close-settings"].addEventListener("click", closeSettings);
document.getElementById("cancel-settings").addEventListener("click", closeSettings);
elements["settings-modal"].addEventListener("click", (event) => { if (event.target === elements["settings-modal"]) closeSettings(); });
elements["settings-form"].addEventListener("submit", saveSettings);

elements["today-label"].textContent = formatDate(new Date());
renderFeatured();
renderProblems();
