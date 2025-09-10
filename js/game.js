const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  parent: "game",
  scene: {
    preload,
    create,
    update
  }
};

let score = 0;
let scoreText;

function preload() {
  this.load.image("tile", "https://labs.phaser.io/assets/sprites/block.png");
}

function create() {
  scoreText = this.add.text(10, 10, "Score: 0", { fontSize: "20px", fill: "#000" });

  const tile = this.add.image(100, 200, "tile").setInteractive();
  tile.setScale(0.5);

  tile.on("pointerdown", () => {
    score += 10;
    scoreText.setText("Score: " + score);

    // Example event log
    const evt = {
      id: crypto.randomUUID(),
      t: Date.now(),
      type: "item_answered",
      payload: { correct: true, lesson: "g6-math-fractions-01" }
    };
    console.log("Event logged:", evt);

    // Save locally
    localStorage.setItem("lastEvent", JSON.stringify(evt));
  });
}

function update() {}

new Phaser.Game(config);
