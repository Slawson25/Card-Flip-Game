document.addEventListener("DOMContentLoaded", () => {
  // 🔧 DOM Elements
  const gameBoard = document.getElementById("game-board");
  const resetBtn = document.getElementById("reset-btn");
  const congratsMsg = document.getElementById("congrats-message");
  const flipSound = new Audio("sounds/flipcard.mp3");

  // 🎮 Game State
  let flippedCards = [];
  let matchedCount = 0;
  let totalPairs = 0;

  // Card Data
  const cardData = [
  { name: "rabbit", content: '<img src="images/peter.png" alt="Rabbit">' },
  { name: "rabbit", content: '<img src="images/peter.png" alt="Rabbit">' },
  { name: "duck", content: '<img src="images/puddle.png" alt="Duck">' },
  { name: "duck", content: '<img src="images/puddle.png" alt="Duck">' },
  { name: "owl", content: '<img src="images/old brown.png" alt="Owl">' },
  { name: "owl", content: '<img src="images/old brown.png" alt="Owl">' },
  { name: "rabbits", content: '<img src="images/pete and ben.png" alt="Rabbits">' },
  { name: "rabbits", content: '<img src="images/pete and ben.png" alt="Rabbits">' },
];


  // 🔀 Shuffle Cards
  function shuffleCards() {
  const shuffled = [...cardData].sort(() => 0.5 - Math.random());
  totalPairs = shuffled.length / 2;

  const cardHTML = shuffled.map(card => `
    <div class="card" data-name="${card.name}">
      <div class="card-inner">
        <div class="card-back">
          <img src="images/card-backing.jpg" alt="Card Back" />
        </div>
        <div class="card-front">
          ${card.content}
        </div>
      </div>
    </div>
  `).join("");

  gameBoard.innerHTML = cardHTML;
}

  // 🖱️ Bind Card Click Listeners
  function bindCardListeners() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      card.addEventListener("click", () => {
        const inner = card.querySelector(".card-inner");

        if (
          flippedCards.includes(card) ||
          card.classList.contains("matched") ||
          flippedCards.length === 2
        ) return;

        inner.classList.add("flipped");
        flipSound.cloneNode().play();
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          const [first, second] = flippedCards;
          const name1 = first.dataset.name;
          const name2 = second.dataset.name;

          if (name1 === name2) {
            first.classList.add("matched");
            second.classList.add("matched");
            flippedCards = [];
            matchedCount++;

            if (matchedCount === totalPairs) {
              congratsMsg.style.display = "block";
            }
          } else {
            setTimeout(() => {
              first.querySelector(".card-inner").classList.remove("flipped");
              second.querySelector(".card-inner").classList.remove("flipped");
              flippedCards = [];
            }, 1000);
          }
        }
      });
    });
  }

  // 🔄 Reset Game
  resetBtn.addEventListener("click", () => {
    flippedCards = [];
    matchedCount = 0;
    congratsMsg.style.display = "none";

    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
      card.classList.remove("matched");
      const inner = card.querySelector(".card-inner");
      inner.classList.remove("flipped");
      inner.style.transform = "rotateY(180deg)";
    });

    shuffleCards();
    bindCardListeners();
  });

  // 🚀 Initial Setup
  shuffleCards();
  bindCardListeners();
});




