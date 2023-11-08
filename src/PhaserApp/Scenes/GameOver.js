import GameOverBackground from "../../assets/Background/GameOver.png";

let bg;
let text;

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  preload() {
    this.load.image("GameOverBackground", GameOverBackground);
  }

  create() {
    this.add.image(400, 300, "GameOverBackground").setScale(1.25);

    text = this.add.text(320, 290, "Restart Game!", {
      fontSize: "20px",
      fill: "#000",
    });

    text.setInteractive({ useHandCursor: true });

    text.on("pointerdown", () => {
      this.scene.stop("GameOverScene");
      this.scene.launch("maingame");
    });
  }
}
