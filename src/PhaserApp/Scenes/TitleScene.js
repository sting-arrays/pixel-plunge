import TitleBackground from "../../assets/Background/testBackground.png";

let bg;
let text;

// clickButton() {
//   this.scene.switch('gameScene');
// }

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "titleScene" });
  }

  preload() {
    this.load.image("TitleBackground", TitleBackground);
  }

  create() {
    this.add.image(0, 0, "TitleBackground").setScale(4);
    // bg.setOrigin(0, 0);

    text = this.add.text(340, 270, "Start Game!", {
      fontSize: "20px",
      fill: "#000",
    });

    text.setInteractive({ useHandCursor: true });

    text.on("pointerdown", () => this.scene.switch("maingame"));
  }
}
