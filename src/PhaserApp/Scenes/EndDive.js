import Banner from "/Banner.png";
import { WebFontFile } from "./WebFontFile";
import * as index from "./index";

let bg;
let text;
let time;
let userProfile;
let fishArray;
let banner;
let backgroundMusic;
let mainCamera;

export class EndDive extends Phaser.Scene {
  constructor() {
    super({ key: "EndDive" });
  }

  init({ timeLeft, currentUserDetails, fishData, bgMusic }) {
    userProfile = currentUserDetails;
    fishArray = fishData;
    backgroundMusic = bgMusic;
  }

  preload() {
    this.load.image("EndGameBanner", Banner);
    this.load.image("eKey", index.eKey);
    this.load.addFile(new WebFontFile(this.load, "Pixelify Sans"));
  }

  create() {
    banner = this.add.image(400, 100, "EndGameBanner").setScale(1.25);

    this.input.keyboard.enabled = true;
    let endDiveButton = this.input.keyboard.addKey("E");

    text = this.add.text(357, 88, "END DIVE", {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#000000",
    });

    this.add.image(banner.x, banner.y + 30, "eKey").setScale(0.55);

    banner.setInteractive({ useHandCursor: true });

    endDiveButton.on("down", () => {
      backgroundMusic.stop();
      this.scene.launch("DiveStats", {
        currentUserDetails: userProfile,
        fishData: fishArray,
      });
      this.scene.stop("EndDive");
    });

    banner.on("pointerdown", () => {
      backgroundMusic.stop();
      // ^^ Above this line export all game data to the db
      this.scene.launch("DiveStats", {
        currentUserDetails: userProfile,
        fishData: fishArray,
      });
      this.scene.stop("EndDive");
    });
  }
}
