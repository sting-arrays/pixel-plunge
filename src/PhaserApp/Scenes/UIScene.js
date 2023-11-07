import Phaser from "phaser";

let coinCount;

export class UIScene extends Phaser.Scene {
  constructor() {
    super("uiscene");
  }

  init({ coins }) {
    coinCount = coins;
  }

  create() {
    this.add.text(320, 32, `Coins: ${coinCount}`, {
      fontSize: "32px",
      fill: "#000",
    });
  }

  update() {}
}
