import background from "../../assets/Background/testBackground.png";

let bg;
let text;

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "titleScene" });
  }

  preload() {
    this.load.image("background", background);
  }

  create() {
    this.add.sprite(0, 0, "background");
    bg.setOrigin(0, 0);

    this.add.text(100, 100, "Welcome to my game!");
  }
}
