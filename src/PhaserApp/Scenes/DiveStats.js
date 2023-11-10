import GameStatsCard from "../../assets/Background/DiveStats.png";
import * as index from "./index";
import { updateDiveStats } from "../../firebase";

let bg;
let text;
let time;
let userProfile;
let fishArray;
let fishCaught = [];
let counter = {};
let caughtString = "";

let coinsCollected;
let currentMoney;
let totalMoney;

let fishJustCaught;
let currentFishCaught;
let totalFishCaught;

let eachFishCaught;
let currentFishFound;
let totalFishFound;

index.EventsCenter.on(
  "fish-caught",
  (caughtFish) => {
    fishCaught = caughtFish.map((fish) => fish);
  },
  this
);

index.EventsCenter.on(
  "coins-collected",
  (coins) => {
    coinsCollected = coins;
  },
  this
);

function returnCaughtString() {
  if (fishCaught.length === 0) {
    return "None";
  } else {
    let counter = {};
    let caughtString = "";
    eachFishCaught = [];
    fishJustCaught = 0;

    fishJustCaught = fishCaught.length;

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

    eachFishCaught = Object.keys(counter);

    return caughtString;
  }
}

function updateUser() {
  totalMoney = coinsCollected + currentMoney;

  totalFishCaught = fishJustCaught + currentFishCaught;

  totalFishFound = currentFishFound;
  if (eachFishCaught !== undefined) {
    eachFishCaught.forEach((fish) => {
      if (currentFishFound.includes(fish) === false) {
        totalFishFound.push(fish);
      }
    });
  }
}

export class DiveStats extends Phaser.Scene {
  constructor() {
    super({ key: "DiveStats" });
  }

  init({ timeLeft, currentUserDetails, fishData }) {
    fishArray = fishData;
    userProfile = currentUserDetails;
    currentMoney = userProfile.Money;
    currentFishCaught = userProfile.Fish_Count;
    currentFishFound = userProfile.caught_fish;
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

    this.add.text(180, 300, `Fish Caught: ${returnCaughtString()}`, {
      fontSize: "20px",
      fill: "#000",
    });

    this.add.text(180, 250, `Coins Collected: ${coinsCollected}`, {
      fontSize: "20px",
      fill: "#000",
    });

    text.setInteractive({ useHandCursor: true });
    updateUser();
    updateDiveStats(
      userProfile.email,
      totalFishCaught,
      totalMoney,
      totalFishFound
    );
    userProfile.Money = totalMoney;
    userProfile.Fish_Count = totalFishCaught;
    userProfile.caught_fish;
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
