import Banner from "../../assets/Background/Banner.png";

let bg;
let text;
let time;
let userProfile;
let fishArray;
let banner;

export class EndDive extends Phaser.Scene {
  constructor() {
    super({ key: "EndDive" });
  }

  init({ timeLeft, currentUserDetails, fishData }) {
    userProfile = currentUserDetails;
    fishArray = fishData;
  }

  preload() {
    this.load.image("EndGameBanner", Banner);
  }

  create() {
    banner = this.add.image(619, 107, "EndGameBanner").setScale(1.25);

    text = this.add.text(568, 94, "End Dive!", {
      fontSize: "20px",
      color: "#000000",
    });

    banner.setInteractive({ useHandCursor: true });

    banner.on("pointerdown", () => {
      // ^^ Above this line export all game data to the db
      this.scene.launch("DiveStats", {
        currentUserDetails: userProfile,
        fishData: fishArray,
      });
      this.scene.stop("EndDive");
    });
  }
}
