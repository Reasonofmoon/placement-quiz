const STORAGE_KEY = "edtech-placement-result";

const ROUNDS = [
  { name: "Math & Statistics", reviewPhase: 1 },
  { name: "Classical ML", reviewPhase: 2 },
  { name: "Deep Learning", reviewPhase: 3 },
  { name: "NLP & Transformers", reviewPhases: [5, 7] },
  { name: "Applied AI", reviewPhase: 14 },
];

const QUESTIONS = [
  {
    round: 0,
    text: "벡터 a = [1, 2, 3], b = [4, 5, 6]의 내적(dot product)은?",
    options: ["21", "32", "15", "27"],
    correct: 1,
    explain: "1×4 + 2×5 + 3×6 = 32",
  },
  {
    round: 0,
    text: "공정한 동전을 3번 던져 정확히 앞면이 2번 나올 확률은?",
    options: ["1/4", "3/8", "1/2", "1/8"],
    correct: 1,
    explain: "C(3,2) × (1/2)³ = 3/8",
  },
  {
    round: 1,
    text: "음성 90%, 양성 10% 분류에서 모델이 전부 음성으로 예측하면 accuracy는?",
    options: ["50%", "10%", "90%", "0%"],
    correct: 2,
    explain: "음성은 모두 맞고 양성은 모두 틀림 → 90%",
  },
  {
    round: 1,
    text: "Random Forest의 하이퍼파라미터는?",
    options: [
      "학습된 split threshold",
      "트리 개수 (number of trees)",
      "리프 노드 예측값",
      "각 노드의 Gini impurity",
    ],
    correct: 1,
    explain: "트리 개수는 학습 전에 설정하는 하이퍼파라미터",
  },
  {
    round: 2,
    text: "Backpropagation에서 chain rule이 계산하는 것은?",
    options: [
      "최적 learning rate",
      "loss에 대한 각 weight의 gradient",
      "필요한 layer 수",
      "batch size",
    ],
    correct: 1,
    explain: "연쇄법칙으로 loss를 각 weight에 대해 미분",
  },
  {
    round: 2,
    text: "ResNet residual connection이 주로 해결하는 문제는?",
    options: [
      "소규모 데이터셋 overfitting",
      "깊은 네트워크의 vanishing gradient",
      "느린 data loading",
      "높은 memory 사용량",
    ],
    correct: 1,
    explain: "skip connection이 gradient 흐름을 보존",
  },
  {
    round: 3,
    text: "Transformer에서 attention mechanism이 계산하는 것은?",
    options: [
      "Pixels와 labels",
      "Queries, Keys, Values",
      "Encoder와 Decoder만",
      "Embeddings와 positions만",
    ],
    correct: 1,
    explain: "Q·Kᵀ/√d 로 attention weight, V에 가중합",
  },
  {
    round: 3,
    text: "LoRA fine-tuning의 주요 이점은?",
    options: [
      "모든 파라미터를 처음부터 학습",
      "대부분 weight를 freeze하고 작은 low-rank 행렬만 학습",
      "학습 데이터가 필요 없음",
      "모델 크기를 2배로 늘림",
    ],
    correct: 1,
    explain: "적은 파라미터로 효율적 fine-tuning",
  },
  {
    round: 4,
    text: "RAG 시스템에서 LLM이 답 생성 전에 일어나는 일은?",
    options: [
      "쿼리로 모델 재학습",
      "관련 문서 검색 후 prompt에 주입",
      "사용자가 수동으로 context 선택",
      "모델이 자체 weight를 검색",
    ],
    correct: 1,
    explain: "Retrieve → Augment → Generate",
  },
  {
    round: 4,
    text: "멀티에이전트에서 coordinator/orchestrator의 역할은?",
    options: [
      "다른 모든 agent 대체",
      "태스크 배분, 메시지 라우팅, 협업 관리",
      "token 사용량 증가",
      "백업 모델 역할",
    ],
    correct: 1,
    explain: "에이전트 간 작업 조율과 라우팅",
  },
];

const PHASES = [
  { id: 0, name: "Setup & Tooling", hours: 14 },
  { id: 1, name: "Math Foundations", hours: 30 },
  { id: 2, name: "ML Fundamentals", hours: 25 },
  { id: 3, name: "Deep Learning Core", hours: 20 },
  { id: 4, name: "Computer Vision", hours: 28 },
  { id: 5, name: "NLP Foundations", hours: 29 },
  { id: 6, name: "Speech & Audio", hours: 18 },
  { id: 7, name: "Transformers Deep Dive", hours: 22 },
  { id: 8, name: "Generative AI", hours: 20 },
  { id: 9, name: "Reinforcement Learning", hours: 18 },
  { id: 10, name: "LLMs from Scratch", hours: 24 },
  { id: 11, name: "LLM Engineering", hours: 22 },
  { id: 12, name: "Multimodal", hours: 20 },
  { id: 13, name: "Tools & Protocols", hours: 16 },
  { id: 14, name: "Agent Engineering", hours: 18 },
  { id: 15, name: "Autonomous Systems", hours: 16 },
  { id: 16, name: "Multi-Agent & Swarms", hours: 14 },
  { id: 17, name: "Infrastructure & Production", hours: 18 },
  { id: 18, name: "Ethics & Alignment", hours: 12 },
  { id: 19, name: "Capstone Projects", hours: 20 },
];

const ENTRY_MAP = [
  { max: 3, phase: 1, label: "Phase 1: Math Foundations — 기초부터 시작" },
  { max: 5, phase: 3, label: "Phase 3: Deep Learning Core — 수학·ML 기초 있음" },
  { max: 7, phase: 7, label: "Phase 7: Transformers — DL 이해, Transformer 학습" },
  { max: 9, phase: 11, label: "Phase 11: LLM Engineering — LLM 앱으로 바로" },
  { max: 10, phase: 14, label: "Phase 14: Agent Engineering — 에이전트 구축" },
];

let currentRound = 0;
let answers = Array(QUESTIONS.length).fill(null);

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showScreen(id) {
  $$(".screen").forEach((s) => s.classList.remove("active"));
  $(`#screen-${id}`).classList.add("active");
}

function getRoundQuestions(round) {
  return QUESTIONS.filter((q) => q.round === round);
}

function renderRound() {
  const roundInfo = ROUNDS[currentRound];
  const qs = getRoundQuestions(currentRound);

  $("#round-label").textContent = `Round ${currentRound + 1} — ${roundInfo.name}`;
  $("#progress-fill").style.width = `${((currentRound + 1) / ROUNDS.length) * 100}%`;

  const container = $("#questions");
  container.innerHTML = "";

  qs.forEach((q) => {
    const globalIdx = QUESTIONS.indexOf(q);
    const block = document.createElement("div");
    block.className = "question-block";
    block.innerHTML = `<p>Q${globalIdx + 1}. ${q.text}</p>`;

    const opts = document.createElement("div");
    opts.className = "options";

    q.options.forEach((opt, i) => {
      const label = document.createElement("label");
      label.className = "option" + (answers[globalIdx] === i ? " selected" : "");
      const letters = ["A", "B", "C", "D"];
      label.innerHTML = `
        <input type="radio" name="q${globalIdx}" value="${i}"
          ${answers[globalIdx] === i ? "checked" : ""}>
        <span>${letters[i]}) ${opt}</span>
      `;
      label.querySelector("input").addEventListener("change", () => {
        answers[globalIdx] = i;
        opts.querySelectorAll(".option").forEach((o) => o.classList.remove("selected"));
        label.classList.add("selected");
      });
      opts.appendChild(label);
    });

    block.appendChild(opts);
    container.appendChild(block);
  });

  $("#btn-prev").disabled = currentRound === 0;
  $("#btn-next").textContent =
    currentRound === ROUNDS.length - 1 ? "결과 보기" : "다음 라운드";
}

function roundAnswered(round) {
  return getRoundQuestions(round).every((q) => answers[QUESTIONS.indexOf(q)] !== null);
}

function scoreRound(round) {
  return getRoundQuestions(round).filter((q) => {
    const idx = QUESTIONS.indexOf(q);
    return answers[idx] === q.correct;
  }).length;
}

function totalScore() {
  return QUESTIONS.filter((q, i) => answers[i] === q.correct).length;
}

function getEntryPhase(score) {
  return ENTRY_MAP.find((e) => score <= e.max);
}

function buildLearningPath(entryPhase, areaScores) {
  const reviewPhases = new Set();

  ROUNDS.forEach((r, i) => {
    if (areaScores[i] === 1) {
      if (r.reviewPhases) r.reviewPhases.forEach((p) => reviewPhases.add(p));
      else if (r.reviewPhase !== undefined) reviewPhases.add(r.reviewPhase);
    }
  });

  return PHASES.map((p) => {
    let status;
    if (p.id === 0) status = "Skip";
    else if (p.id < entryPhase) status = reviewPhases.has(p.id) ? "Review" : "Skip";
    else status = "Do";

    const hours = status === "Skip" ? "--" : String(p.hours);
    return { ...p, status, hours };
  });
}

function weakestArea(areaScores) {
  const min = Math.min(...areaScores);
  const idx = areaScores.indexOf(min);
  return ROUNDS[idx].name;
}

function computeResults() {
  const areaScores = ROUNDS.map((_, i) => scoreRound(i));
  const total = totalScore();
  const entry = getEntryPhase(total);
  const path = buildLearningPath(entry.phase, areaScores);

  const activePhases = path.filter((p) => p.status !== "Skip");
  const totalHours = activePhases.reduce((s, p) => s + p.hours, 0);

  return {
    areaScores,
    total,
    entry,
    path,
    totalHours,
    activeCount: activePhases.length,
    weak: weakestArea(areaScores),
    answers: [...answers],
    completedAt: new Date().toISOString(),
  };
}

function renderResults(result) {
  $("#entry-point").textContent =
    `시작 권장: ${result.entry.label} (총점 ${result.total}/10)`;

  const scoresEl = $("#area-scores");
  scoresEl.innerHTML = "";
  ROUNDS.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "area-score";
    div.innerHTML = `${r.name}<strong>${result.areaScores[i]}/2</strong>`;
    scoresEl.appendChild(div);
  });

  const tbody = $("#path-table tbody");
  tbody.innerHTML = "";
  result.path.forEach((p) => {
    const tr = document.createElement("tr");
    const cls = `status-${p.status.toLowerCase()}`;
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td class="${cls}">${p.status}</td>
      <td>${p.hours}</td>
    `;
    tbody.appendChild(tr);
  });

  $("#path-summary").textContent =
    `개인화 경로: ~${result.totalHours}시간, ${result.activeCount}개 Phase`;
  $("#recommendation").textContent =
    `Phase ${result.entry.phase}부터 시작하세요. 가장 약한 영역: ${result.weak}. Review 표시 Phase는 빠르게 복습하세요.`;

  const review = $("#answer-review");
  review.innerHTML = "";
  QUESTIONS.forEach((q, i) => {
    const letters = ["A", "B", "C", "D"];
    const userAns = answers[i];
    const correct = userAns === q.correct;
    const div = document.createElement("div");
    div.className = "answer-item";
    div.innerHTML = `Q${i + 1}: ${correct ? "✓" : "✗"} 정답 ${letters[q.correct]}) ${q.options[q.correct]} — ${q.explain}`;
    review.appendChild(div);
  });
}

function toMarkdown(result) {
  const lines = [
    "## Placement Result",
    "",
    `- **Date:** ${result.completedAt}`,
    `- **Total:** ${result.total}/10`,
    `- **Entry Point:** ${result.entry.label}`,
    `- **Path:** ~${result.totalHours}h across ${result.activeCount} phases`,
    "",
    "### Area Scores",
    ...ROUNDS.map((r, i) => `- ${r.name}: ${result.areaScores[i]}/2`),
    "",
    "### Learning Path",
    "| Phase | Name | Status | Hours |",
    "|-------|------|--------|-------|",
    ...result.path.map(
      (p) => `| ${p.id} | ${p.name} | ${p.status} | ${p.hours} |`
    ),
    "",
    `**Recommendation:** Phase ${result.entry.phase}부터. 약점: ${result.weak}.`,
  ];
  return lines.join("\n");
}

function saveResult(result) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  $("#btn-resume").classList.remove("hidden");
}

function loadResult() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function finishQuiz() {
  const result = computeResults();
  saveResult(result);
  renderResults(result);
  showScreen("results");
}

function initTheme() {
  const saved = localStorage.getItem("edtech-theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("edtech-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("edtech-theme", "dark");
  }
}

$("#btn-start").addEventListener("click", () => {
  currentRound = 0;
  answers = Array(QUESTIONS.length).fill(null);
  renderRound();
  showScreen("quiz");
});

$("#btn-resume").addEventListener("click", () => {
  const saved = loadResult();
  if (saved) {
    renderResults(saved);
    showScreen("results");
  }
});

$("#btn-prev").addEventListener("click", () => {
  if (currentRound > 0) {
    currentRound--;
    renderRound();
  }
});

$("#btn-next").addEventListener("click", () => {
  if (!roundAnswered(currentRound)) {
    alert("이 라운드의 모든 문항에 답해주세요.");
    return;
  }
  if (currentRound < ROUNDS.length - 1) {
    currentRound++;
    renderRound();
  } else {
    finishQuiz();
  }
});

$("#btn-restart").addEventListener("click", () => {
  currentRound = 0;
  answers = Array(QUESTIONS.length).fill(null);
  renderRound();
  showScreen("quiz");
});

$("#btn-copy").addEventListener("click", async () => {
  const saved = loadResult();
  if (!saved) return;
  const md = toMarkdown(saved);
  try {
    await navigator.clipboard.writeText(md);
    $("#btn-copy").textContent = "복사됨!";
    setTimeout(() => { $("#btn-copy").textContent = "결과 복사 (Markdown)"; }, 2000);
  } catch {
    prompt("결과를 복사하세요:", md);
  }
});

$("#btn-theme").addEventListener("click", toggleTheme);

initTheme();
if (loadResult()) $("#btn-resume").classList.remove("hidden");
