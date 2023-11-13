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

  helpText = this.add.text(760, 20, "?", {
   fontSize: "40px",
   fill: "#ffffff",
  });
  const helpText2 = this.add.text(760, 60, "help", {
   fontSize: "10px",
   fill: "#ffffff",
  });

  helpText.setInteractive({ useHandCursor: true });
  helpText.on("pointerdown", () => {
   this.scene.launch("helpscene", { count: coinCount, fishCount: fish });
  });
  helpText2.setInteractive({ useHandCursor: true });
  helpText2.on("pointerdown", () => {
   this.scene.launch("helpscene", { count: coinCount, fishCount: fish });
  });
 }
}
