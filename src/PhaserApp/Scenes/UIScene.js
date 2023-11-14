import Phaser from "phaser";

let coinCount;
let fish;
let bucket;
let helpText;

export class UIScene extends Phaser.Scene {
  constructor() {
    super("uiscene");
  }

  init({ coins, fishCount, bucketSize }) {
    coinCount = coins;
    fish = fishCount;
    bucket = bucketSize;
  }

  create() {
    this.add.text(32, 32, `Coins: ${coinCount}`, {
      fontSize: "20px",
      color: "#ffffff",
    });

    this.add.text(590, 32, `Fish caught: ${fish}`, {
      fontSize: "20px",
      color: "#ffffff",
    });

    if (fish === bucket) {
      this.add.text(590, 64, "Bucket full!", {
        fontSize: "20px",
        fill: "#FF0000",
      });
    }

    helpText = this.add.text(750, 25, "?", {
      fontSize: "40px",
      fill: "#ffffff",
    });
    const helpText1 = this.add.text(735, 5, "Press 'H'", {
      fontSize: "10px",
      fill: "#ffffff",
    });
    const helpText2 = this.add.text(735, 15, "for help", {
      fontSize: "10px",
      fill: "#ffffff",
    });

    helpText.setInteractive({ useHandCursor: true });
    helpText.on("pointerdown", () => {
      this.scene.launch("helpscene", {});
    });
    helpText2.setInteractive({ useHandCursor: true });
    helpText2.on("pointerdown", () => {
      this.scene.launch("helpscene", {});
    });

    let keyObj = this.input.keyboard.addKey("H");
    keyObj.on("down", () => {
      this.scene.launch("helpscene", {});
    });
  }
}
