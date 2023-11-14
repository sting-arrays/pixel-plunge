import GameStatsCard from "../../assets/Background/GreenBackground128.png";
import * as index from "./index";
import { updateDiveStats } from "../../firebase";
import Banner from "/Banner.png";

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

let eachFishFound;
let currentFishFound;
let totalFishFound;

let newFishFound = [];
let newFishFoundString;

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
    fishJustCaught = 0;
    fishJustCaught = fishCaught.length;

    return "None";
  } else {
    let counter = {};
    let caughtString = "";
    eachFishFound = [];
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
      caughtString += `
      - ${key} x ${value} `;
    }

    eachFishFound = Object.keys(counter);

    return caughtString;
  }
}

function returnFishFound() {
  if (fishCaught.length === 0) {
    return "None";
  } else {
    newFishFound = [];
    newFishFoundString = "";

    eachFishFound.forEach((fish) => {
      if (!currentFishFound.includes(fish)) {
        newFishFound.push(fish);
        currentFishFound.push(fish);
      }
    });

    newFishFound.forEach((fish) => {
      newFishFoundString += `
      - ${fish}`;
    });
    return newFishFoundString;
  }
}

function updateUser() {
  totalMoney = coinsCollected + currentMoney;

  totalFishCaught = fishJustCaught + currentFishCaught;

  totalFishFound = currentFishFound;

  if (eachFishFound !== undefined) {
    eachFishFound.forEach((fish) => {
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

  init({ timeLeft, currentUserDetails, fishData, resetFish }) {
    fishArray = fishData;
    userProfile = currentUserDetails;
    currentMoney = userProfile.Money;
    currentFishCaught = userProfile.Fish_Count;
    currentFishFound = userProfile.caught_fish;
  }

  preload() {
    this.load.image("GameStatsCard", GameStatsCard);
    this.load.image("spacebar", index.spaceBar);
  }

  create() {
    this.add.image(400, 300, "GameStatsCard").setScale(1);

    //Green Board Styling 32x32 Vertical
    let bottomBanner = this.add.image(400, 490, "EndGameBanner").setScale(1.25);
    let topBanner = this.add.image(400, 50, "EndGameBanner").setScale(1.5);
    this.add
      .image(bottomBanner.x, bottomBanner.y + 30, "spacebar")
      .setScale(0.55);

    text = this.add.text(349, 477, "DIVE AGAIN", {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#000000",
    });

    this.add.text(345, 33, "RESULTS", {
      fontFamily: "Pixelify Sans",
      fontSize: "28px",
      color: "#000000",
    });

    this.input.keyboard.enabled = true;
    let diveAgainButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    diveAgainButton.on("down", () => {
      if (userProfile.userName === "Guest") {
        userProfile.Money = coinsCollected + currentMoney;
        userProfile.Fish_Count = 0;
        userProfile.caught_fish = currentFishFound;

        // userProfile.caught_fish;
        // ^^ Above this line export all game data to the db
        this.scene.stop("DiveStats");
        this.scene.start("newgame", {
          currentUserDetails: userProfile,
          resetFish: 0,
          fishData: fishArray,
        });
        this.scene.stop("maingame");
      } else {
        updateUser();
        updateDiveStats(
          userProfile.email,
          totalFishCaught,
          totalMoney,
          totalFishFound
        );
        userProfile.Money = totalMoney;
        userProfile.Fish_Count = totalFishCaught;
        userProfile.caught_fish = totalFishFound;
        // userProfile.caught_fish;
        // ^^ Above this line export all game data to the db
        this.scene.stop("DiveStats");
        this.scene.start("newgame", {
          currentUserDetails: userProfile,
          resetFish: 0,
          fishData: fishArray,
        });
        this.scene.stop("maingame");
      }
    });

    this.add.text(255, 153, `Fish Caught: ${returnCaughtString()}`, {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#ffffff",
      // fontFamily:
    });

    this.add.text(255, 323, `Fishidex Updates: ${returnFishFound()}`, {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#ffffff",
    });

    this.add.text(255, 105, `Earnings: ${coinsCollected} coins`, {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#ffffff",
    });

    text.setInteractive();

    text.on("pointerdown", () => {
      if (userProfile.userName === "Guest") {
        userProfile.Money = coinsCollected + currentMoney;
        userProfile.Fish_Count = 0;
        userProfile.caught_fish = currentFishFound;

        // userProfile.caught_fish;
        // ^^ Above this line export all game data to the db
        this.scene.stop("DiveStats");
        this.scene.start("newgame", {
          currentUserDetails: userProfile,
          resetFish: 0,
          fishData: fishArray,
        });
        this.scene.stop("maingame");
      } else {
        updateUser();
        updateDiveStats(
          userProfile.email,
          totalFishCaught,
          totalMoney,
          totalFishFound
        );
        userProfile.Money = totalMoney;
        userProfile.Fish_Count = totalFishCaught;
        userProfile.caught_fish = totalFishFound;
        // userProfile.caught_fish;
        // ^^ Above this line export all game data to the db
        this.scene.stop("DiveStats");
        this.scene.start("newgame", {
          currentUserDetails: userProfile,
          resetFish: 0,
          fishData: fishArray,
        });
        this.scene.stop("maingame");
      }
    });
  }
}
