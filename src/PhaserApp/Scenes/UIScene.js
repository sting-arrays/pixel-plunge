import Phaser from "phaser";

let coinCount;
let fish;
let bucket;

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
      fill: "#000",
    });

    this.add.text(530, 32, `Fish caught: ${fish}`, {
      fontSize: "20px",
      fill: "#000",
    });

    if (fish === bucket) {
      this.add.text(530, 64, "Bucket full!", {
        fontSize: "20px",
        fill: "#FF0000",
      });
    }
  }

  update() {}
}