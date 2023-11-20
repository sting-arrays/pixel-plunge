import GameStatsCard from "../../assets/Background/GreenBackground128.png";
import * as index from "./index";
import { updateDiveStats } from "../../firebase";
import Banner from "/Banner.png";

let text;
let userProfile;
let fishArray;
let fishCaught = [];

let coinsCollectedInSession;
let currentMoneyInDB;
let totalMoney;

let fishJustCaught;
let currentFishCaughtInDB;
let totalFishCaught;

let eachFishFoundInSession;
let currentFishFoundInDB;
let totalFishFound;
let mainCamera;
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
    coinsCollectedInSession = coins;
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
    eachFishFoundInSession = [];
    fishJustCaught = 0;
    let limit = 5;
    let limitCounter = 0;
    let counterArray = [];
    let counterArrayLength = 0;

    fishJustCaught = fishCaught.length;

    fishCaught.forEach((ele) => {
      if (counter[ele]) {
        counter[ele] += 1;
      } else {
        counter[ele] = 1;
      }
    });

    counterArray = Object.entries(counter);
    counterArrayLength = counterArray.length;
    counterArray = counterArray.slice(0, 5);

    counterArray.forEach((fish) => {
      caughtString += `
      - ${fish.join(" : ")}`;
    });

    if (counterArrayLength > 5) {
      caughtString += `
      And more...`;
    }

    caughtString.replaceAll(",", " :");

    eachFishFoundInSession = Object.keys(counter);

    return caughtString;
  }
}

function returnFishFound() {
  if (fishCaught.length === 0) {
    return "None";
  } else {
    newFishFound = [];
    newFishFoundString = "";
    let displayArray = [];
    let newFishFoundLength = 0;

    eachFishFoundInSession.forEach((fish) => {
      if (!currentFishFoundInDB.includes(fish)) {
        newFishFound.push(fish);
        currentFishFoundInDB.push(fish);
      }
    });

    newFishFoundLength = newFishFound.length;
    displayArray = newFishFound.slice(0, 5);

    displayArray.forEach((fish) => {
      newFishFoundString += `
      - ${fish}`;
    });

    if (newFishFoundLength > 5) {
      newFishFoundString += `
      And more...`;
    }

    return newFishFoundString;
  }
}

function createNewDiveStats() {
  totalMoney = coinsCollectedInSession + currentMoneyInDB;

  totalFishCaught = fishJustCaught + currentFishCaughtInDB;

  totalFishFound = currentFishFoundInDB;

  if (eachFishFoundInSession !== undefined) {
    eachFishFoundInSession.forEach((fish) => {
      if (currentFishFoundInDB.includes(fish) === false) {
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
    currentMoneyInDB = userProfile.Money;
    currentFishCaughtInDB = userProfile.Fish_Count;
    currentFishFoundInDB = userProfile.caught_fish;
  }

  preload() {
    this.load.image("GameStatsCard", GameStatsCard);
    this.load.image("spacebar", index.spaceBar);
  }

  create() {
    const successMelody = this.sound.add("success", { loop: false });
    successMelody.play();
    this.add.image(400, 300, "GameStatsCard").setScale(1);

    //Green Board Styling 32x32 Vertical
    let bottomBanner = this.add.image(400, 490, "EndGameBanner").setScale(1.25);
    let topBanner = this.add.image(400, 43, "EndGameBanner").setScale(1.5);
    this.add
      .image(bottomBanner.x, bottomBanner.y + 30, "spacebar")
      .setScale(0.55);

    text = this.add.text(349, 477, "DIVE AGAIN", {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#000000",
    });

    this.add.text(345, 26, "RESULTS", {
      fontFamily: "Pixelify Sans",
      fontSize: "28px",
      color: "#000000",
    });

    this.input.keyboard.enabled = true;
    let diveAgainButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.add.text(255, 155, `Fish Caught: ${returnCaughtString()}`, {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#ffffff",
      // fontFamily:
    });

    this.add.text(255, 322, `Fishidex Updates: ${returnFishFound()}`, {
      fontFamily: "Pixelify Sans",
      fontSize: "20px",
      color: "#ffffff",
    });

    this.add.text(
      255,
      105,
      `Earnings: ${
        coinsCollectedInSession === 0
          ? "None"
          : `${coinsCollectedInSession} ${
              coinsCollectedInSession === 1 ? "coin" : "coins"
            }`
      }`,
      {
        fontFamily: "Pixelify Sans",
        fontSize: "20px",
        color: "#ffffff",
      }
    );

    diveAgainButton.on("down", () => {
      this.cameras.main.fadeOut(2000);
      if (userProfile.userName === "Guest") {
        userProfile.Money = coinsCollectedInSession + currentMoneyInDB;
        userProfile.Fish_Count = 0;
        userProfile.caught_fish = currentFishFoundInDB;

        // userProfile.caught_fish;
        // ^^ Above this line export all game data to the db
        this.scene.stop("DiveStats");
        this.scene.stop("maingame");
        this.scene.start("maingame", {
          currentUserDetails: userProfile,
          fishData: fishArray,
          resetFish: 0,
        });
      } else {
        createNewDiveStats();
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
        this.scene.stop("maingame");
        this.scene.start("maingame", {
          currentUserDetails: userProfile,
          resetFish: 0,
          fishData: fishArray,
        });
      }
    });

    text.setInteractive();

    text.on("pointerdown", () => {
      if (userProfile.userName === "Guest") {
        userProfile.Money = coinsCollectedInSession + currentMoneyInDB;
        userProfile.Fish_Count = 0;
        userProfile.caught_fish = currentFishFoundInDB;

        // userProfile.caught_fish;
        // ^^ Above this line export all game data to the db
        this.scene.stop("DiveStats");
        this.scene.stop("maingame");
        this.scene.start("maingame", {
          currentUserDetails: userProfile,
          resetFish: 0,
          fishData: fishArray,
        });
      } else {
        createNewDiveStats();
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
        this.scene.stop("maingame");
        this.scene.start("maingame", {
          currentUserDetails: userProfile,
          resetFish: 0,
          fishData: fishArray,
        });
      }
    });
  }
}
