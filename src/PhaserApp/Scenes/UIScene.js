import Phaser from "phaser";
import { WebFontFile } from "./WebFontFile";
import * as index from "./index";

let coinCount;
let fish;
let bucket;
let helpText;
let backgroundMusic;

export class UIScene extends Phaser.Scene {
  constructor() {
    super("uiscene");
  }

  init({ coins, fishCount, bucketSize, bgMusic }) {
    coinCount = coins;
    fish = fishCount;
    bucket = bucketSize;
    backgroundMusic = bgMusic;
  }

  preload() {
    this.load.image("coin", index.coinSprite);
    this.load.image("fish", index.fishSprite);
    this.load.image("hKey", index.hKey);

    this.load.addFile(new WebFontFile(this.load, "Pixelify Sans"));
  }

  create() {
    this.add.image(50, 45, "coin").setScale(0.8);
    this.add.image(50, 105, "fish").setScale(0.6);
    this.add.text(90, 30, `${coinCount}`, {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#ffffff",
    });

    this.add.text(90, 92, `${fish} / ${bucket}`, {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#ffffff",
    });

    if (fish === bucket) {
      this.add.text(20, 138, "Net full", {
        fontFamily: "Pixelify Sans",
        fontSize: "20px",
        fill: "#FF0000",
      });
    }

    // helpText = this.add.text(717, 65, "?", {
    //   fontFamily: "Pixelify Sans",
    //   fontSize: "40px",
    //   fill: "#ffffff",
    // });
    const hButton = this.add.image(750, 75, "hKey").setScale(0.7);
    const helpText = this.add.text(725, 10, "Help", {
      fontFamily: "Pixelify Sans",
      fontSize: "25px",
      fill: "#ffffff",
    });

    // const helpText2 = this.add.text(680, 36, "for help", {
    //   fontFamily: "Pixelify Sans",
    //   fontSize: "25px",
    //   fill: "#ffffff",
    // });

    helpText.setInteractive({ useHandCursor: true });
    helpText.on("pointerdown", () => {
      this.scene.launch("helpscene", {});
    });

    // helpText2.setInteractive({ useHandCursor: true });
    // helpText2.on("pointerdown", () => {
    //   this.scene.launch("helpscene", {});
    // });

    let keyObj = this.input.keyboard.addKey("H");
    keyObj.on("down", () => {
      this.scene.launch("helpscene", {});
    });
  }
}
