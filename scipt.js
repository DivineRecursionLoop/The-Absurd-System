let clevernessPoints = 0;
const progressBar = document.getElementById('progress-bar');
const clevernessDisplay = document.getElementById('cleverness');
const popup = document.getElementById('popup');
const scenarioTitle = document.getElementById('scenario-title');
const gameContainer = document.getElementById('game-container');

let selectedCard = null;
let currentScenario = 0;

// All data for the game, including image URLs and challenge positions
const scenarios = [
  {
    title: "The Beige Bureaucracy",
    image: "assets/scenario1.png",
    challenges: [
      { id: 'challenge1', solved: false, card: 'logic', message: "Quantum entanglement filing: surprisingly effective.", x: 200, y: 250 },
      { id: 'challenge2', solved: false, card: 'tech', message: "Automated conveyor belts make paperwork flow smoothly.", x: 300, y: 250 },
      { id: 'challenge3', solved: false, card: 'creative', message: "A spontaneous Beige Parade confuses bureaucrats while work gets done.", x: 400, y: 250 }
    ]
  },
  {
    title: "The Neon Overload",
    image: "assets/scenario2.png",
    challenges: [
      { id: 'challenge1', solved: false, card: 'logic', message: "A new algorithm simplifies the neon sign chaos.", x: 250, y: 200 },
      { id: 'challenge2', solved: false, card: 'tech', message: "A 'glitch' reroutes the city's power, causing a strategic blackout.", x: 350, y: 220 },
      { id: 'challenge3', solved: false, card: 'creative', message: "A street-wide dance party distracts from the chaos.", x: 450, y: 240 }
    ]
  },
  {
    title: "The Algorithmic Abyss",
    image: "assets/scenario3.png",
    challenges: [
      { id: 'challenge1', solved: false, card: 'tech', message: "Automated feeders keep hamsters spinning.", x: 200, y: 250 },
      { id: 'challenge2', solved: false, card: 'logic', message: "Shift scheduling maximizes hamster productivity.", x: 300, y: 250 },
      { id: 'challenge3', solved: false, card: 'creative', message: "Hamster talent show entertains citizens.", x: 400, y: 250 }
    ]
  },
  {
    title: "The Corporate Circus",
    image: "assets/scenario4.png",
    challenges: [
      { id: 'challenge1', solved: false, card: 'creative', message: "A well-placed whoopee cushion derails a board meeting.", x: 200, y: 250 },
      { id: 'challenge2', solved: false, card: 'logic', message: "A detailed spreadsheet proves the circus is inefficient.", x: 300, y: 250 },
      { id: 'challenge3', solved: false, card: 'tech', message: "Drones organize files with pinpoint accuracy.", x: 400, y: 250 }
    ]
  }
];

// Load scenario and generate dynamic SVG elements
function loadScenario(index) {
  currentScenario = index;
  const scenario = scenarios[index];
  scenarioTitle.textContent = scenario.title;
  
  // Clear previous content
  gameContainer.innerHTML = '';
  
  // Set the background image
  gameContainer.style.backgroundImage = `url(${scenario.image})`;
  
  // Create an SVG container for the challenges
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', '0 0 900 506'); // Updated viewbox to match image dimensions
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  gameContainer.appendChild(svg);
  
  // Dynamically create and append SVG challenge circles
  scenario.challenges.forEach((chData, i) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('class', 'challenge');
    circle.setAttribute('id', chData.id);
    circle.setAttribute('cx', chData.x);
    circle.setAttribute('cy', chData.y);
    circle.setAttribute('r', '25');
    circle.setAttribute('fill', 'red');
    svg.appendChild(circle);
    
    // Add event listener to the newly created circle
    circle.addEventListener('click', () => handleChallengeClick(chData));
  });

  // Reset progress and points
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

// Challenge interaction logic
function handleChallengeClick(chData) {
  const chElement = document.getElementById(chData.id);

  if (selectedCard === null) {
    showPopup("Select an Innovation Card first!");
    return;
  }
  if (chData.solved) {
    showPopup("This challenge is already solved!");
    return;
  }
  if (selectedCard === chData.card) {
    chElement.setAttribute('fill', 'green');
    chData.solved = true;
    clevernessPoints += 33;
    updateProgress();
    showPopup(chData.message);
    checkCompletion();
  } else {
    showPopup("Hmm, that didn't work. Try a different card!");
  }
}

function showPopup(message) {
  popup.textContent = message;
  popup.classList.remove('hidden');
  setTimeout(() => { popup.classList.add('hidden'); }, 2500);
}

function updateProgress() {
  const scenario = scenarios[currentScenario];
  const solvedCount = scenario.challenges.filter(c => c.solved).length;
  const percent = (solvedCount / scenario.challenges.length) * 100;
  progressBar.style.width = percent + '%';
  clevernessDisplay.textContent = `Cleverness Points: ${clevernessPoints}`;
}

function checkCompletion() {
  const scenario = scenarios[currentScenario];
  if (scenario.challenges.every(c => c.solved)) {
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
