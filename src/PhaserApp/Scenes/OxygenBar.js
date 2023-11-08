import Phaser from "phaser";
import oxygenBarTexture from "../../assets/UI/o2bar-192x192.png";
import oxygenContainerTexture from "../../assets/UI/o2border-192x192.png";
import EventsCenter from "../EventsCenter";

export class OxygenBar extends Phaser.Scene {
  constructor() {
    super("oxygenscene");
  }

  init({ oxygentimer }) {
    this.initialTime = oxygentimer;
  }

  preload() {
    this.load.image("oxygenbar", oxygenBarTexture);
    this.load.image("oxygencontainer", oxygenContainerTexture);
  }

  create() {
    this.timeLeft = this.initialTime;

    let o2Container = this.add.sprite(400, 32, "oxygencontainer");
    let o2Bar = this.add.sprite(o2Container.x, o2Container.y, "oxygenbar");

    this.o2Mask = this.add.sprite(o2Bar.x, o2Bar.y, "oxygenbar");

    this.o2Mask.visible = false;

    o2Bar.mask = new Phaser.Display.Masks.BitmapMask(this, this.o2Mask);
    this.o2Timer = this.time.addEvent({
      delay: 1000,
      callback: function () {
        this.timeLeft--;
        EventsCenter.emit("time-left", this.timeLeft);

        let stepWidth = this.o2Mask.displayWidth / this.initialTime;
        this.o2Mask.x -= stepWidth;

        if (this.timeLeft === 1) {
          this.scene.launch("GameOverScene");
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}
