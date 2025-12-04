// Utilitaires
const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // stockage optionnel
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  const page = document.body.dataset.page;
  if (page === "parcours") initQuiz();
  if (page === "solutions") initSolutions();
  if (page === "simulation") initSimulation();
  if (page === "contribuer") initContribuer();
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  if (!toggle || !navList) return;
  toggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Quiz / Parcours
function initQuiz() {
  const startBtn = document.getElementById("start-quiz");
  const questionEl = document.getElementById("quiz-question");
  const choicesEl = document.getElementById("quiz-choices");
  const feedbackEl = document.getElementById("quiz-feedback");
  const progressFill = document.getElementById("progress-fill");
  const quizStep = document.getElementById("quiz-step");
  const quizTotal = document.getElementById("quiz-total");
  const scoreValue = document.getElementById("score-value");
  const badgeList = document.getElementById("badge-list");

  if (
    !startBtn ||
    !questionEl ||
    !choicesEl ||
    !feedbackEl ||
    !progressFill ||
    !quizStep ||
    !quizTotal
  )
    return;

  let index = 0;
  let score = storage.get("villageScore", 0);
  updateScoreUI(score);
  quizTotal.textContent = QUIZ_SCENARIOS.length;

  startBtn.addEventListener("click", () => {
    index = 0;
    score = storage.get("villageScore", 0);
    renderQuestion(index);
    feedbackEl.textContent = "";
  });

  function renderQuestion(i) {
    const scenario = QUIZ_SCENARIOS[i];
    if (!scenario) return;
    questionEl.textContent = scenario.question;
    const contextEl =
      document.getElementById("quiz-context") ||
      (() => {
        const el = document.createElement("p");
        el.id = "quiz-context";
        el.className = "quiz-context";
        questionEl.insertAdjacentElement("afterend", el);
        return el;
      })();
    contextEl.textContent = scenario.context || "";
    questionEl.dataset.anchor = scenario.id;
    choicesEl.innerHTML = "";
    scenario.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.type = "button";
      btn.textContent = choice.label;
      btn.addEventListener("click", () => handleChoice(choice));
      choicesEl.appendChild(btn);
    });
    quizStep.textContent = i + 1;
    progressFill.style.width = `${((i + 1) / QUIZ_SCENARIOS.length) * 100}%`;
  }

  function handleChoice(choice) {
    score += choice.impact;
    storage.set("villageScore", score);
    updateScoreUI(score);
    feedbackEl.textContent = choice.feedback;
    feedbackEl.className = "quiz-feedback";
    if (choice.impact > 0) feedbackEl.classList.add("positive");
    else if (choice.impact === 0) feedbackEl.classList.add("neutral");
    else feedbackEl.classList.add("negative");

    index += 1;
    if (index < QUIZ_SCENARIOS.length) {
      renderQuestion(index);
    } else {
      questionEl.textContent =
        "Parcours terminé ! File voir les solutions ou la simulation.";
      choicesEl.innerHTML = "";
      progressFill.style.width = "100%";
      quizStep.textContent = QUIZ_SCENARIOS.length;
    }
  }

  function updateScoreUI(currentScore) {
    scoreValue.textContent = currentScore;
    const unlocked = BADGES.filter((b) => b.rule(currentScore)).map(
      (b) => b.label
    );
    badgeList.textContent = unlocked.length
      ? unlocked.join(", ")
      : "Aucun badge pour l’instant";
    storage.set("villageBadges", unlocked);
  }
}

// Solutions
function initSolutions() {
  const grid = document.getElementById("solutions-grid");
  const select = document.getElementById("filter-select");
  const exportBtn = document.getElementById("export-json");
  const exportFeedback = document.getElementById("export-feedback");
  if (!grid || !select || !exportBtn) return;

  const render = () => {
    const value = select.value;
    grid.innerHTML = "";
    const filtered =
      value === "all"
        ? SOLUTIONS
        : SOLUTIONS.filter((item) => item.category === value);
    filtered.forEach((solution) => {
      const card = document.createElement("article");
      card.className = "solution-card";
      card.innerHTML = `
        <h3>${solution.title}</h3>
        <p>${solution.impact}</p>
        <p class="solution-expl">${solution.explanation}</p>
        <div class="solution-meta">
          <span>Catégorie : ${solution.category}</span>
          <span>Accessibilité : ${solution.accessibility}</span>
        </div>
        <p>Ressources : ${solution.resources.join(", ")}</p>
      `;
      grid.appendChild(card);
    });
  };

  select.addEventListener("change", render);
  render();

  exportBtn.addEventListener("click", async () => {
    const text = JSON.stringify(SOLUTIONS, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      exportFeedback.textContent = "JSON copié dans le presse-papiers.";
    } catch (e) {
      exportFeedback.textContent = "Impossible de copier, copie manuelle.";
    }
  });
}

// Simulation
function initSimulation() {
  const form = document.getElementById("sim-form");
  const result = document.getElementById("sim-result");
  const autonomyScore = document.getElementById("autonomy-score");
  const budget = document.getElementById("budget");
  const footprint = document.getElementById("footprint");
  const reco = document.getElementById("sim-reco");
  const shareBtn = document.getElementById("share-scenario");
  const shareFeedback = document.getElementById("share-feedback");
  if (!form || !result) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const parcLife = Number(data.get("parcLife"));
    const dataControl = data.get("dataControl");
    const licenseCost = Number(data.get("licenseCost"));
    const formation = data.get("formation");
    const autonomyOn = data.get("autonomyToggle") === "on";

    const { score, budget5y, footprintKg, message } = computeSimulation({
      parcLife,
      dataControl,
      licenseCost,
      formation,
      autonomyOn,
    });

    autonomyScore.textContent = `${score}/100`;
    budget.textContent = `${budget5y.toLocaleString("fr-FR")} €`;
    footprint.textContent = `${footprintKg} kg CO₂e estimés`;
    reco.textContent = message;
    result.querySelector("h2").textContent = "Résultats mis à jour";
  });

  shareBtn?.addEventListener("click", async () => {
    const summary = [
      `Score autonomie : ${autonomyScore.textContent}`,
      `Budget 5 ans : ${budget.textContent}`,
      `Empreinte : ${footprint.textContent}`,
    ].join(" | ");
    try {
      await navigator.clipboard.writeText(summary);
      shareFeedback.textContent = "Scénario copié, partage le !";
    } catch (e) {
      shareFeedback.textContent = "Copie impossible, sélectionne le texte.";
    }
  });
}

function computeSimulation({ parcLife, dataControl, licenseCost, formation, autonomyOn }) {
  let score = 40;
  score += (parcLife - 3) * 8; // +16 max
  if (dataControl === "moyenne") score += 8;
  if (dataControl === "forte") score += 16;
  if (formation === "oui") score += 10;
  if (autonomyOn) score += 10;
  score = Math.min(100, Math.max(0, score));

  let budget5y = licenseCost * 5;
  if (autonomyOn) budget5y = Math.round(budget5y * 0.6);

  let footprintKg = Math.max(200, 800 - parcLife * 80);
  if (autonomyOn) footprintKg = Math.round(footprintKg * 0.8);

  const message = autonomyOn
    ? "Avec NIRD : +durée de vie, -40% de licences, données mieux maîtrisées."
    : "Active le mode NIRD pour limiter coûts et empreinte, et reprendre la main sur les données.";

  return { score, budget5y, footprintKg, message };
}

// Contribuer
function initContribuer() {
  const form = document.getElementById("contact-form");
  const mailBtn = document.getElementById("mailto-button");
  const feedback = document.getElementById("contact-feedback");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      role: data.get("role"),
      message: data.get("message"),
    };
    storage.set("villageContactDraft", payload);
    feedback.textContent = "Message sauvegardé en local.";
  });

  mailBtn?.addEventListener("click", () => {
    const data = new FormData(form);
    const subject = encodeURIComponent("Contribution Village NIRDistant");
    const body = encodeURIComponent(
      `Nom/pseudo: ${data.get("name")}\nRôle: ${data.get("role")}\nMessage:\n${data.get("message")}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
}
