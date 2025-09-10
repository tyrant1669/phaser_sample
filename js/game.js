const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  parent: "game",
  backgroundColor: "#87ceeb",
  scene: { preload, create }
};

let questionText, answerText, feedbackText;
let score = 0;
let scoreText;

const questions = [
  { q: "1/2 of 8 = ?", options: ["2", "4", "6"], answer: "4" },
  { q: "Simplify 2/4", options: ["2/4", "1/2", "3/4"], answer: "1/2" }
];
let current = 0;

function preload() {
  this.load.image("button", "https://labs.phaser.io/assets/sprites/block.png");
}

function create() {
  // Question
  questionText = this.add.text(20, 40, questions[current].q, { fontSize: "20px", fill: "#000" });

  // Options as clickable blocks
  questions[current].options.forEach((opt, i) => {
    const btn = this.add.image(180, 150 + i * 100, "button").setInteractive();
    btn.setScale(1.5);

    const txt = this.add.text(170, 140 + i * 100, opt, { fontSize: "20px", fill: "#fff" });

    btn.on("pointerdown", () => {
      checkAnswer.call(this, opt);
    });
  });

  scoreText = this.add.text(20, 580, "Score: 0", { fontSize: "20px", fill: "#000" });
  feedbackText = this.add.text(20, 540, "", { fontSize: "18px", fill: "#000" });
}

function checkAnswer(selected) {
  if (selected === questions[current].answer) {
    feedbackText.setText("✅ Correct!");
    score += 10;
  } else {
    feedbackText.setText("❌ Try again!");
  }
  scoreText.setText("Score: " + score);

  // Log event (console + localStorage)
  const evt = {
    id: crypto.randomUUID(),
    t: Date.now(),
    type: "item_answered",
    payload: { q: questions[current].q, selected, correct: selected === questions[current].answer }
  };
  console.log("Event:", evt);
  localStorage.setItem("lastEvent", JSON.stringify(evt));
}
new Phaser.Game(config);
