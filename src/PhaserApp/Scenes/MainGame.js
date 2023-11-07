import Phaser from "phaser";
import background from "../../assets/Background/background3.png";
import boat from "../../assets/Scenary/boat.png";
import dude from "../../assets/Character/dude.png";
import fish1 from "../../assets/Fish/1.png";
import fish2 from "../../assets/Fish/2.png";
import fish3 from "../../assets/Fish/3.png";
import fish4 from "../../assets/Fish/4.png";
// import character from "../../assets/Character/Diver1.png";
// import characterFlipped from "../../assets/Character/Diver1-Flipped.png";
// import swimmingCharacter from "../../assets/Character/Diver2.png";
import character from "../../assets/Character/Character-Sheet.png";

let fixed;
let player;
let cursors;
let text;
let fishes;

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
    this.load.image("fish1", fish1);
    this.load.image("fish2", fish2);
    this.load.image("fish3", fish3);
    this.load.image("fish4", fish4);
    this.load.spritesheet("character", character, {
      frameWidth: 32,
      frameHeight: 30,
    });
    // this.load.spritesheet("characterFlipped", characterFlipped, {
    //   frameWidth: 32,
    //   frameHeight: 30,
    // });
    // this.load.spritesheet("swimmingCharacter", swimmingCharacter, {
    //   frameWidth: 32,
    //   frameHeight: 30,
    // });
  }
  create() {
    this.add.image(400, 1000, "background");
    fixed = this.physics.add.staticGroup();

    fixed.create(119, 250, "boat").setScale(3).refreshBody();

    player = this.physics.add
      .sprite(30, 30, "character")
      // .sprite(30, 30, "swimmingCharacter")
      .setScale(1.5)
      .refreshBody();

    // player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player, true);
    this.cameras.main.setBounds(0, 0, 800, 2000);
    // this.cameras.main.zoom = 1.5;

    if (player.y < 215) {
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("character", {
          start: 1,
          end: 6,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "turn",
        frames: [{ key: "character", frame: 7 }],
        frameRate: 20,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("character", {
          start: 7,
          end: 12,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    if (player.y > 230) {
      this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("character", {
          start: 57,
          end: 61,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "turn",
        frames: [{ key: "character", frame: 63 }],
        frameRate: 20,
      });

      this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("character", {
          start: 57,
          end: 61,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, fixed);

    //Randomly spawn fish
    //Do we want to split these up into groups for points reasons? Can make the higher point fish spawn lower, be faster etc
    fishes = this.physics.add.group();
    let fishArray = ["fish1", "fish2", "fish3", "fish4"];
    //number below is how many fish are spawned
    for (let i = 0; i < 5; i++) {
      //spawn x and y axis
      let y = Phaser.Math.Between(300, 700);
      let x = Phaser.Math.Between(0, 600);
      //creates fish sprite based on array
      let fish = fishes
        .create(x, y, fishArray[i % fishArray.length])
        .setScale(0.2);
      fish.setCollideWorldBounds(false);
      //adjust fish hitbox size
      fish.setSize(70, 50, true);
      //make fish move randomly, but stay below waterline and come back into screen
      setInterval(() => {
        //keep the fish away from the surface
        if (fish.y < 350) {
          fish.setVelocityY(100);
          //make the fish come back into screen after going off bottom
        } else if (fish.y > 800) {
          fish.setVelocityY(-200);
          //make the fish come back into screen after going off left
        } else if (fish.x < -50) {
          fish.setVelocityX(Phaser.Math.Between(50, 200));
          //make the fish come back into screen after going off right
        } else if (fish.x > 900) {
          fish.setVelocityX(Phaser.Math.Between(-50, -150));
        } else {
          fish.setVelocityX(Phaser.Math.Between(-200, 200));
          fish.setVelocityY(Phaser.Math.Between(-50, 50));
        }
        //flip the fish pictures depending on direction
        if (fish.body.velocity.x < 0) {
          fish.flipX = true;
        } else {
          fish.flipX = false;
        }
      }, Phaser.Math.Between(1000, 3000));
      //give fish a random starting velocity
      fish.setVelocity(Phaser.Math.Between(-300, 300), 0);
      fish.body.setAllowGravity(false);
    }
    this.scene.launch("testscene");
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

    // if (player.y < 215) {
    //   this.anims.create({
    //     key: "left",
    //     frames: this.anims.generateFrameNumbers("character", {
    //       start: 1,
    //       end: 6,
    //     }),
    //     frameRate: 10,
    //     repeat: -1,
    //   });

    //   this.anims.create({
    //     key: "turn",
    //     frames: [{ key: "character", frame: 7 }],
    //     frameRate: 20,
    //   });

    //   this.anims.create({
    //     key: "right",
    //     frames: this.anims.generateFrameNumbers("character", {
    //       start: 7,
    //       end: 12,
    //     }),
    //     frameRate: 10,
    //     repeat: -1,
    //   });
    // }

    // if (player.y > 230) {
    //   this.anims.create({
    //     key: "up",
    //     frames: this.anims.generateFrameNumbers("character", {
    //       start: 57,
    //       end: 61,
    //     }),
    //     frameRate: 10,
    //     repeat: -1,
    //   });

    //   this.anims.create({
    //     key: "turn",
    //     frames: [{ key: "character", frame: 63 }],
    //     frameRate: 20,
    //   });

    //   this.anims.create({
    //     key: "down",
    //     frames: this.anims.generateFrameNumbers("character", {
    //       start: 57,
    //       end: 61,
    //     }),
    //     frameRate: 10,
    //     repeat: -1,
    //   });
    // }
  }
}
