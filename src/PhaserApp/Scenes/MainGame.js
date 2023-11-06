import Phaser from "phaser";
import background from "../../assets/Background/background.png";
import boat from "../../assets/Scenary/boat.png";
import dude from "../../assets/Character/dude.png";

let fixed;
let player;
let cursors;

export class MainGame extends Phaser.Scene {
  constructor() {
    super("maingame");
  }

  init() {}
  preload() {
    this.load.image("background", background);
    this.load.image("boat", boat);
    this.load.spritesheet("dude", dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    this.add.image(400, 1000, "background");

    fixed = this.physics.add.staticGroup();

    fixed.create(40, 75, "boat");

    player = this.physics.add.sprite(35, 25, "dude");

    player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player, true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, fixed);
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
}
