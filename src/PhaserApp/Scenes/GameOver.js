// import GameOverBackground from "../../assets/Background/Map256.png";
import GameOverBackground from "../../assets/Background/Map256-90op.png";
import skull from "../../assets/Other/skull.png";
import * as index from "./index";

let bg;
let text;
let time;
let userProfile;
let fishArray;

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  init({ timeLeft, currentUserDetails, fishData }) {
    userProfile = currentUserDetails;
    fishArray = fishData;
  }

  preload() {
    this.load.image("spacebar", index.spaceBar);
    this.load.image("GameOverBackground", GameOverBackground);
    this.load.image("skull", skull);
  }

  create() {
    this.input.keyboard.enabled = true;
    let restartButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.add.image(400, 300, "GameOverBackground").setScale(0.75);
    this.add.image(400, 400, "spacebar");

    text = this.add.text(332, 290, "RESTART", {
      fontFamily: "Pixelify Sans",
      fontSize: "18px",
      fill: "#000",
    });

    this.add.image(400, 240, "skull").setScale(0.15);

    text.setInteractive({ useHandCursor: true });

    text.on("pointerdown", () => {
      this.scene.stop("maingame");
      this.scene.start("maingame", {
        currentUserDetails: userProfile,
        resetFish: 0,
        fishData: fishArray,
      });
      //  setTimeout(() => {
      //   this.scene.start("maingame");
      //   this.scene.stop("GameOverScene");
      //  }, 2000);
    });

    restartButton.on("down", () => {
      this.scene.stop("maingame");
      this.scene.start("maingame", {
        currentUserDetails: userProfile,
        resetFish: 0,
        fishData: fishArray,
      });
    });
  }
}
