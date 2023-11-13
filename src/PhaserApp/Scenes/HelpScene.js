import Phaser from "phaser";
import helpSceneBackground from "../../assets/Background/helpscene.png";
import arrowKeys from "../../assets/Other/arrowkeys.png";
import arrow from "../../assets/Other/arrow.png";
import arrowUp from "../../assets/Other/arrowup.png";
import arrowSide from "../../assets/Other/arrowside.png";
import arrowFishCount from "../../assets/Other/arrowfishcount.png";
import arrowCharacter from "../../assets/Other/arrowcharacter.png";
import Dory from "../../assets/Fish/Dory.png";
import Cod from "../../assets/Fish/Cod.png";

export default class HelpScene extends Phaser.Scene {
 constructor() {
  super("helpscene");
 }
 init() {}
 preload() {
  this.load.image("background", helpSceneBackground);
  this.load.image("arrowkeys", arrowKeys);
  this.load.image("arrow", arrow);
  this.load.image("arrowside", arrowSide);
  this.load.image("arrowup", arrowUp);
  this.load.image("arrowcharacter", arrowCharacter);
  this.load.image("arrowfishcount", arrowFishCount);
  this.load.image("Dory", Dory);
  this.load.image("Cod", Cod);
 }
 create() {
  this.add.image(400, 300, "background");

  this.add.image(450, 390, "Dory").setScale(0.4);
  this.add.image(450, 440, "Cod").setScale(0.4);
  this.add.text(580, 400, "Catch fish to earn coins", {
   fontSize: "14px",
   fill: "#fff",
  });
  const fishArrow = this.add.image(520, 415, "arrowside").setScale(0.3);
  fishArrow.flipY = true;

  this.add.image(400, 270, "arrowkeys").setScale(0.5);
  this.add.text(290, 320, "Use the arrow keys to move", {
   fontSize: "14px",
   fill: "#fff",
  });
  this.add.text(345, 340, "the character", {
   fontSize: "14px",
   fill: "#fff",
  });
  const arrowChar = this.add.image(180, 350, "arrowcharacter").setScale(0.6);
  arrowChar.flipY = true;

  this.add.text(10, 200, "Amount of coins currently held", {
   fontSize: "14px",
   fill: "#fff",
  });
  this.add.image(200, 120, "arrow").setScale(0.3);

  this.add.text(300, 120, "Oxygen Bar - return to the ", {
   fontSize: "14px",
   fill: "#fff",
  });
  this.add.text(300, 140, "surface before this runs out!", {
   fontSize: "14px",
   fill: "#fff",
  });
  this.add.image(400, 80, "arrowup").setScale(0.3);

  this.add.text(600, 200, "Current fish in bag", {
   fontSize: "14px",
   fill: "#fff",
  });
  let fishCaughtArrow = this.add.image(690, 120, "arrowfishcount").setScale(0.3);
  //   fishCaughtArrow.flipX = true;

  this.add.text(10, 510, "See what fish you have caught", {
   fontSize: "14px",
   fill: "#fff",
  });
  this.add.text(10, 530, "and what is yet to be found!", {
   fontSize: "14px",
   fill: "#fff",
  });
  const fishidexArrow = this.add.image(35, 580, "arrowup").setScale(0.2);
  fishidexArrow.flipY = true;
  fishidexArrow.flipX = true;

  this.add.text(160, 450, "Check Leaderboards", {
   fontSize: "14px",
   fill: "#fff",
  });
  const leaderArrow = this.add.image(280, 530, "arrowup").setScale(0.5);
  leaderArrow.flipY = true;

  this.add.text(400, 530, "Upgrade your gear", {
   fontSize: "14px",
   fill: "#fff",
  });

  const upgradeArrow = this.add.image(450, 580, "arrowup").setScale(0.2);
  upgradeArrow.flipY = true;
  upgradeArrow.flipX = true;

  this.add.text(600, 510, "Go Home", {
   fontSize: "14px",
   fill: "#fff",
  });

  const homeArrow = this.add.image(610, 565, "arrowup").setScale(0.3);
  homeArrow.flipY = true;
  homeArrow.flipX = true;

  const text = this.add.text(660, 560, "close help", {
   fontSize: "20px",
   fill: "#fff",
  });
  this.add.text(660, 580, "Press 'H' to close", {
   fontSize: "10px",
   fill: "#ffffff",
  });
  text.setInteractive({ useHandCursor: true });
  text.on("pointerdown", () => {
   this.scene.stop("helpscene");
  });

  let keyObj = this.input.keyboard.addKey("H");
  keyObj.on("down", () => {
   this.scene.stop("helpscene", {});
  });
 }
 update() {}
}
