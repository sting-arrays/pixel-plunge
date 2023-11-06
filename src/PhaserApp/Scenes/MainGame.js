import Phaser from "phaser";
import background from "../../assets/Background/background.png";
import boat from "../../assets/Scenary/boat.png";

let fixed;

export class MainGame extends Phaser.Scene {
  constructor() {
    super("maingame");
  }

  init() {}
  preload() {
    this.load.image("background", background);
    this.load.image("boat", boat);
  }
  create() {
    this.add.image(400, 1000, "background");

    fixed = this.physics.add.staticGroup();

    fixed.create(40, 75, "boat");
  }

  update() {}
}
