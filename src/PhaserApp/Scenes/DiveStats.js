import GameStatsCard from "../../assets/Background/DiveStats.png";
import * as index from "./index";

let bg;
let text;
let time;
let userProfile;
let fishArray;
let fishCaught;
let counter = {};
let caughtString = "";

index.EventsCenter.on(
  "fish-caught",
  (caughtFish) => {
    fishCaught = caughtFish.map((fish) => fish);
  },
  this
);

function returnCaughtString() {
  let counter = {};
  let caughtString = "";

  fishCaught.forEach((ele) => {
    if (counter[ele]) {
      counter[ele] += 1;
    } else {
      counter[ele] = 1;
    }
  });
  for (const [key, value] of Object.entries(counter)) {
    caughtString += `${key} x${value} `;
  }
  return caughtString;
}

for (const [key, value] of Object.entries(counter)) {
  caughtString += `${key} x${value} `;
}

export class DiveStats extends Phaser.Scene {
  constructor() {
    super({ key: "DiveStats" });
  }

  init({ timeLeft, currentUserDetails, fishData }) {
    userProfile = currentUserDetails;
    fishArray = fishData;
  }

  preload() {
    this.load.image("GameStatsCard", GameStatsCard);
  }

  create() {
    this.add.image(400, 300, "GameStatsCard").setScale(1.25);

    text = this.add.text(335, 350, "Dive Again!", {
      fontSize: "20px",
      fill: "#000",
    });

    this.add.text(180, 270, `Fish Caught: ${returnCaughtString()}`, {
      fontSize: "20px",
      fill: "#000",
    });

    text.setInteractive({ useHandCursor: true });

    text.on("pointerdown", () => {
      // ^^ Above this line export all game data to the db
      this.scene.stop("DiveStats");
      this.scene.start("newgame", {
        currentUserDetails: userProfile,
        resetFish: 0,
        fishData: fishArray,
      });
      this.scene.stop("maingame");
    });
  }
}
