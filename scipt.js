let clevernessPoints = 0;
const progressBar = document.getElementById('progress-bar');
const clevernessDisplay = document.getElementById('cleverness');
const popup = document.getElementById('popup');
const scenarioTitle = document.getElementById('scenario-title');
const illustrationText = document.getElementById('illustration-text');

let selectedCard = null;
let currentScenario = 0;

// Scenario definitions
const scenarios = [
  {
    title: "The Beige Bureaucracy",
    illustration: "Paperwork Mountain",
    challenges: {
      challenge1: {solved: false, card: 'logic', message: "Quantum entanglement filing: surprisingly effective."},
      challenge2: {solved: false, card: 'tech', message: "Automated conveyor belts make paperwork flow smoothly."},
      challenge3: {solved: false, card: 'creative', message: "A spontaneous Beige Parade confuses bureaucrats while work gets done."}
    }
  },
  {
    title: "The Hamster Economy",
    illustration: "Hamsters Power Factories",
    challenges: {
      challenge1: {solved: false, card: 'tech', message: "Automated feeders keep hamsters spinning."},
      challenge2: {solved: false, card: 'logic', message: "Shift scheduling maximizes hamster productivity."},
      challenge3: {solved: false, card: 'creative', message: "Hamster talent show entertains citizens."}
    }
  },
  {
    title: "Ministry of Red Tape",
    illustration: "Lost Pigeons & Dancing Bureaucrats",
    challenges: {
      challenge1: {solved: false, card: 'logic', message: "Digitized forms simplify bureaucracy."},
      challenge2: {solved: false, card: 'tech', message: "Drones deliver forms swiftly."},
      challenge3: {solved: false, card: 'diplomacy', message: "Bureaucrats persuaded that efficiency is patriotic."}
    }
  },
  {
    title: "Colorless Creativity Ban",
    illustration: "Beige City Festival",
    challenges: {
      challenge1: {solved: false, card: 'creative', message: "Beige Festival of Illusions entertains citizens."},
      challenge2: {solved: false, card: 'logic', message: "Joyful messages encoded in beige patterns."},
      challenge3: {solved: false, card: 'tech', message: "Projection lighting makes beige exciting."}
    }
  }
];

// Load scenario
function loadScenario(index) {
  currentScenario = index;
  const scenario = scenarios[index];
  scenarioTitle.textContent = scenario.title;
  illustrationText.textContent = scenario.illustration;
  // Reset challenges colors
  Object.keys(scenario.challenges).forEach((id, i) => {
    const ch = document.getElementById(id);
    ch.setAttribute('fill', 'red');
    scenario.challenges[id].solved = false;
  });
  clevernessPoints = 0;
  updateProgress();
}

// Card selection
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    selectedCard = card.getAttribute('data-card');
    showPopup(`Selected card: ${card.textContent}`);
  });
});

// Challenge interaction
document.querySelectorAll('.challenge').forEach(ch => {
  ch.addEventListener('click', () => {
    const id = ch.id;
    const scenario = scenarios[currentScenario];
    if (selectedCard === null) {
      showPopup("Select an Innovation Card first!");
      return;
    }
    if (scenario.challenges[id].solved) {
      showPopup("This challenge is already solved!");
      return;
    }
    if (selectedCard === scenario.challenges[id].card) {
      ch.setAttribute('fill', 'green');
      scenario.challenges[id].solved = true;
      clevernessPoints += 33;
      updateProgress();
      showPopup(scenario.challenges[id].message);
      checkCompletion();
    } else {
      showPopup("Hmm, that didn't work. Try a different card!");
    }
  });
});

function showPopup(message) {
  popup.textContent = message;
  popup.classList.remove('hidden');
  setTimeout(() => { popup.classList.add('hidden'); }, 2500);
}

function updateProgress() {
  const scenario = scenarios[currentScenario];
  const solvedCount = Object.values(scenario.challenges).filter(c => c.solved).length;
  const percent = (solvedCount / Object.keys(scenario.challenges).length) * 100;
  progressBar.style.width = percent + '%';
  clevernessDisplay.textContent = `Cleverness Points: ${clevernessPoints}`;
}

function checkCompletion() {
  const scenario = scenarios[currentScenario];
  if (Object.values(scenario.challenges).every(c => c.solved)) {
    setTimeout(() => {
      showPopup("All challenges solved! You outsmarted absurdity with American wit. Efficiency restored!");
    }, 500);
  }
}

// Navigation buttons
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    loadScenario(parseInt(btn.getAttribute('data-scenario')));
  });
});

// Initialize first scenario
loadScenario(0);
