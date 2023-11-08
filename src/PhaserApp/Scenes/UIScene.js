import Phaser from "phaser";
import oxygenBarTexture from "../../assets/UI/o2bar-192x192.png";
import oxygenContainerTexture from "../../assets/UI/o2border-192x192.png";

let coinCount;
let fish;
let bucket;
let gameOptions = {
  initialTime: 60,
};

export class UIScene extends Phaser.Scene {
  constructor() {
    super("uiscene");
  }

  init({ coins, fishCount, bucketSize }) {
    coinCount = coins;
    fish = fishCount;
    bucket = bucketSize;
  }

  preload() {
    this.load.image("oxygenbar", oxygenBarTexture);
    this.load.image("oxygencontainer", oxygenContainerTexture);
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

    this.timeLeft = gameOptions.initialTime;

    let o2Container = this.add.sprite(400, 32, "oxygencontainer");
    let o2Bar = this.add.sprite(o2Container.x, o2Container.y, "oxygenbar");

    this.o2Mask = this.add.sprite(o2Bar.x, o2Bar.y, "oxygenbar");

    this.o2Mask.visible = false;

    o2Bar.mask = new Phaser.Display.Masks.BitmapMask(this, this.o2Mask);

    this.o2Timer = this.time.addEvent({
      delay: 1000,
      callback: function () {
        this.timeLeft--;

        let stepWidth = this.o2Mask.displayWidth / gameOptions.initialTime;

        this.o2Mask.x -= stepWidth;

        if (this.timeLeft === 1) {
          this.add.text(o2Bar.x - 48, o2Bar.y + 40, "GAME OVER");
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {}
}
