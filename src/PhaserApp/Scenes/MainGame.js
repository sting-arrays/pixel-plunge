import Phaser from "phaser";
import background from "../../assets/Background/background3.png";
import boat from "../../assets/Scenary/boat.png";
import dude from "../../assets/Character/dude.png";

let fixed;
let player;
let cursors;
let text;

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

    fixed.create(119, 250, "boat").setScale(3).refreshBody();

    player = this.physics.add
      .sprite(35, 25, "dude")
      .setScale(1.5)
      .refreshBody();

    player.setCollideWorldBounds(true);

    // this.cameras.main.startFollow(player, true);
    // this.cameras.main.zoom = 1.5;

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

    this.text = this.add
      .text(10, 10, "Cursors to move", {
        font: "16px Courier",
        fill: "#00FF00",
      })
      .setScrollFactor(0);

    this.physics.add.collider(player, fixed);
  }

  update() {
    //When player is in water
    if (player.y < 215) {
      player.body.setAllowGravity(true);
      if (cursors.left.isDown) {
        player.setVelocityX(-200);
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(200);
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
        // player.setVelocityY(100);
        player.anims.play("turn");
      }
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-150);
      }
      //   if (cursors.down.isDown) {
      //     player.setVelocityY(40);
      //   }
    }
    //When player is out of water
    if (player.y > 230) {
      player.body.setAllowGravity(false);
      if (cursors.left.isDown) {
        player.setVelocityX(-40);
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(40);
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
        player.setVelocityY(30);
        player.anims.play("turn");
      }
      if (cursors.up.isDown) {
        player.setVelocityY(-50);
      }

      if (cursors.down.isDown) {
        player.setVelocityY(60);
      }
    }

    if (player.y > 215 && player.y < 230 && cursors.up.isDown) {
      player.setVelocityY(-250);
    }

    this.text.setText([
      `screen x: ${this.input.x}`,
      `screen y: ${this.input.y}`,
      `world x: ${this.input.mousePointer.worldX}`,
      `world y: ${this.input.mousePointer.worldY}`,
    ]);
  }
}
