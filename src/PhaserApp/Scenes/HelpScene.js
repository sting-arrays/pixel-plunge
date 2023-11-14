import Phaser from "phaser";
import helpSceneBackground from "/helpscene.png";
import arrowKeys from "../../assets/Other/arrowkeys.png";
import arrow from "../../assets/Other/arrow.png";
import arrowUp from "../../assets/Other/arrowup.png";
import arrowSide from "../../assets/Other/arrowside.png";
import arrowFishCount from "../../assets/Other/arrowfishcount.png";
import arrowCharacter from "../../assets/Other/arrowcharacter.png";
import * as index from "./index";
import { WebFontFile } from "./WebFontFile";
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
    this.load.image("hKey", index.hKey);

    this.load.addFile(new WebFontFile(this.load, "Pixelify Sans"));
  }
  create() {
    this.add.image(400, 300, "background");

    this.add.image(690, 300, "arrowfishcount").setScale(0.3);
    this.add.image(640, 200, "Dory").setScale(0.4);
    this.add.image(720, 200, "Cod").setScale(0.4);
    this.add.text(560, 370, "Catch fish to earn coins", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });

    this.add.image(400, 270, "arrowkeys").setScale(0.5);
    this.add.text(270, 320, "Use the arrow keys to move", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });
    this.add.text(330, 340, "the character", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });

    this.add.text(10, 200, "Amount of coins and fish \ncurrently held", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });
    this.add.image(200, 120, "arrow").setScale(0.3);
    this.add.image(400, 80, "arrowup").setScale(0.3);

    this.add.text(300, 120, "Oxygen Bar - return to the ", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });
    this.add.text(300, 140, "surface before this runs out!", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });

    this.add.text(10, 510, "See what fish you have caught", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });
    this.add.text(10, 530, "and what is yet to be found!", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });
    const fishidexArrow = this.add.image(150, 580, "arrowup").setScale(0.2);
    fishidexArrow.flipY = true;
    //fishidexArrow.flipX = true;

    this.add.text(160, 445, "Check Leaderboards", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });
    const leaderArrow = this.add.image(320, 540, "arrowup").setScale(0.5);
    leaderArrow.flipY = true;

    this.add.text(400, 525, "Upgrade your gear", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });

    const upgradeArrow = this.add.image(480, 580, "arrowup").setScale(0.2);
    upgradeArrow.flipY = true;
    upgradeArrow.flipX = true;

    this.add.text(600, 505, "Go Home", {
      fontFamily: "Pixelify Sans",
      fontSize: "19px",
      fill: "#fff",
    });

    const homeArrow = this.add.image(630, 565, "arrowup").setScale(0.3);
    homeArrow.flipY = true;
    homeArrow.flipX = true;

    // const text = this.add.text(670, 560, "close help", {
    //   fontFamily: "Pixelify Sans",
    //   fontSize: "25px",
    //   fill: "#fff",
    // });

    let closeText = this.add.text(720, 110, "Close", {
      fontFamily: "Pixelify Sans",
      fontSize: "25px",
      fill: "#ffffff",
    });
    this.add.image(750, 75, "hKey").setScale(0.7);

    closeText.setInteractive({ useHandCursor: true });
    closeText.on("pointerdown", () => {
      this.scene.stop("helpscene");
    });

    let keyObj = this.input.keyboard.addKey("H");
    keyObj.on("down", () => {
      this.scene.stop("helpscene", {});
    });
  }
  update() {}
}
