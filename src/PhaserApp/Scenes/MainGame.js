import Phaser from "phaser";
import background from "../../assets/Background/background3.png";
import boat from "../../assets/Scenary/boat-360x117.png";
import Cod from "../../assets/Fish/Cod.png";
import darthFisher from "../../assets/Fish/Darth Fisher.png";
import Dory from "../../assets/Fish/Dory.png";
import Jaws from "../../assets/Fish/Jaws.png";
import McFish from "../../assets/Fish/McFish.png"
import coolfish from "../../assets/Fish/coolfish.png"
import magicFish from "../../assets/Fish/magic fish.png"
import northernFish from "../../assets/Fish/northern fish.png"
import reallyBigFish from "../../assets/Fish/really big fish.png"
import theFishNamedJordan from "../../assets/Fish/the fish named jordan.png"

import character from "../../assets/Character/character.png";
import swimming from "../../assets/Character/Swimming.png";
import swimmingHorizontal from "../../assets/Character/Swimming-Horizontal.png";
import xlrock2flat from "../../assets/Scenary/xlrock2flat.png";
import xlrock2left from "../../assets/Scenary/xlrock2left.png";
import xlrock2right from "../../assets/Scenary/xlrock2right.png";
import xlrock1flat from "../../assets/Scenary/xlrock1flat.png";
import xlrock1left from "../../assets/Scenary/xlrock1left.png";
import xlrock1right from "../../assets/Scenary/xlrock1right.png";
import medrock1flat from "../../assets/Scenary/medrock1flat.png";
import smallrock1flat from "../../assets/Scenary/smallrock1flat.png";
import { createUniqueFish } from "../utils";

let fishes;
let fixed;
let player;
let cursors;
let text;
let coins = 0;
let fishCount = 0;
let bucketSize = 5;
let height = 2000;
let oxygentimer = 60;
let caughtFish = [];

export class MainGame extends Phaser.Scene {
  constructor() {
    super("maingame");
  }

 init(data) {
  console.log("my guy", data)
  coins = +data.currentUserDetails.Money
  bucketSize = +data.currentUserDetails.Fish_Bag
 }

  preload() {
    this.load.image("background", background);
    this.load.image("boat", boat);
    this.load.image("Cod", Cod);
    this.load.image("Darth Fisher", darthFisher);
    this.load.image("Dory", Dory);
    this.load.image("Jaws", Jaws);
    this.load.image("xlrock2flat", xlrock2flat);
    this.load.image("xlrock2left", xlrock2left);
    this.load.image("xlrock2right", xlrock2right);
    this.load.image("xlrock1flat", xlrock1flat);
    this.load.image("xlrock1left", xlrock1left);
    this.load.image("xlrock1right", xlrock1right);
    this.load.image("medrock1flat", medrock1flat);
    this.load.image("medrock2flat", smallrock1flat);
    this.load.spritesheet("character", character, {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("swimming", swimming, {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("swimmingHorizontal", swimmingHorizontal, {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  create() {

    this.cameras.main.fadeIn(2000);

    function collectFish(player, fish) {
      if (fishCount === bucketSize) {
        return;
      }

      console.log(fish.texture.key)

      fishCount++;

      coins += Phaser.Math.Between(1, 10);

      fish.disableBody(true, true);

      this.scene.launch("uiscene", {
        coins: coins,
        fishCount: fishCount,
        bucketSize: bucketSize,
      });
    }

    this.add.image(400, 1000, "background");
    fixed = this.physics.add.staticGroup();

    //Create Rocks
    const rockArrayFlatXL = ["xlrock1flat", "xlrock2flat"];
    const rockArrayFlatMed = ["medrock1flat"];
    const rockArrayFlatSmall = [];
    const rockArrayRight = ["xlrock1right", "xlrock2right"];
    const rockArrayLeft = ["xlrock1left", "xlrock2left"];

    //flat large
    for (let i = 0; i < 3; i++) {
      let x = Phaser.Math.Between(0, 800);
      let y = Phaser.Math.Between(1000, 2000);
      let rockType = rockArrayFlatXL[Phaser.Math.Between(0, 1)];
      const rock = fixed.create(x, y, rockType);
      rock.setSize(260, 150);
    }
    //flat med
    for (let i = 0; i < 5; i++) {
      let x = Phaser.Math.Between(0, 800);
      let y = Phaser.Math.Between(500, 2000);
      let rockType = rockArrayFlatMed[Phaser.Math.Between(0, 0)];
      const rock = fixed.create(x, y, rockType);
      rock.setSize(150, 70);
    }

    //left
    for (let i = 0; i < 1; i++) {
      let x = 90;
      let y = Phaser.Math.Between(500, 1000);
      let rockType = rockArrayLeft[Phaser.Math.Between(0, 1)];
      const rock = fixed.create(x, y, rockType);
      rock.setSize(150, 270, true);
    }
    //right
    for (let i = 0; i < 1; i++) {
      let x = 710;
      let y = Phaser.Math.Between(500, 1000);
      let rockType = rockArrayRight[Phaser.Math.Between(0, 1)];
      const rock = fixed.create(x, y, rockType);
      rock.setSize(150, 260, true);
    }

    //Create Player
    fixed.create(119, 250, "boat").setScale(0.6).refreshBody();

    player = this.physics.add.sprite(30, 30, "character").setScale(0.5);

    // player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player, true);
    this.cameras.main.setBounds(0, 0, 800, height);
    this.cameras.main.zoom = 1.2;

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("character", {
        start: 1,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "character", frame: 10 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 6,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //Attempted logic at trying to animate the swimming up movement
    // this.anims.create({
    //   key: "swimming-up",
    //   frames: this.anims.generateFrameNumbers("swimming", {
    //     start: 1,
    //     end: 6,
    //   }),
    //   frameRate: 11,
    //   repeat: -1,
    // });

    //Currently leaving the upward movement as a fixed frame until animation works
    this.anims.create({
      key: "swimming-up",
      frames: [{ key: "swimming", frame: 1 }],
      frameRate: 11,
    });

    this.anims.create({
      key: "swimming-turn",
      frames: [{ key: "swimming", frame: 1 }],
      frameRate: 6,
    });

    //Currently leaving the downward movement as a fixed frame until animation works
    this.anims.create({
      key: "swimming-down",
      frames: [{ key: "swimming", frame: 7 }],
      frameRate: 11,
    });

    //Attempted logic at trying to animate the swimming down movement
    // this.anims.create({
    //   key: "swimming-down",
    //   frames: this.anims.generateFrameNumbers("swimming", {
    //     start: 8,
    //     end: 12,
    //   }),
    //   frameRate: 11,
    //   repeat: -1,
    // });

    this.anims.create({
      key: "swimming-right",
      frames: this.anims.generateFrameNumbers("swimmingHorizontal", {
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "swimming-left",
      frames: this.anims.generateFrameNumbers("swimmingHorizontal", {
        start: 7,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, fixed);

    //Randomly spawn fish
    //Do we want to split these up into groups for points reasons? Can make the higher point fish spawn lower, be faster etc

    const fishes = this.physics.add.group();

    createUniqueFish(10, 400, 600, fishes, "dory", 400, 600) 
    createUniqueFish(10, 400, 600, fishes, "Darth Fisher", 400, 600) 

  this.physics.add.overlap(player, fishes, collectFish, null, this);
  // this.scene.launch("testscene");
  this.scene.launch("uiscene", { coins: coins, fishCount: fishCount });
 }

  update() {
    if (player.y < 290 && player.x < 300) {
      this.cameras.main.zoomTo(1.5, 1500);
    }
    //When player is out of water
    if (player.y < 215) {
      player.body.setAllowGravity(true);
      if (cursors.left.isDown && player.x > 16) {
        player.setVelocityX(-200);
        player.anims.play("left", true).flipY = false;
      } else if (cursors.right.isDown && player.x < 784) {
        player.setVelocityX(200);
        player.anims.play("right", true).flipY = false;
      } else {
        player.setVelocityX(0);
        // player.setVelocityY(100);
        player.anims.play("turn").flipY = false;
      }
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-150);
      }
    }

    //When player is in water
    if (player.y > 230) {
      //As the player jumps into the water the camera has a transitional Zoom in
      this.cameras.main.zoomTo(2.5, 3000);
      player.body.setAllowGravity(false);
      if (cursors.left.isDown && player.x > 16) {
        player.setVelocityX(-200);
        player.anims.play("swimming-right", true).flipX = true;
      } else if (cursors.right.isDown && player.x < 784) {
        player.setVelocityX(200);
        player.anims.play("swimming-left", true).flipX = false;
      } else {
        player.setVelocityX(0);
        player.y <= height - 48
          ? player.setVelocityY(50)
          : player.setVelocity(0);
        player.anims.play("swimming-turn", true);
      }
      if (cursors.up.isDown) {
        player.setVelocityY(-200);
        player.anims.play("swimming-up", true).flipY = false;
        player.flipX = false;
      }
      if (cursors.down.isDown && player.y <= height - 48) {
        player.setVelocityY(200);
        player.anims.play("swimming-down", true).flipY = true;
        player.flipX = false;
      }
    }

    if (player.y > 215 && player.y < 230 && cursors.up.isDown) {
      player.setVelocityY(-250).flipY = false;
      player.flipX = false;
      //Couldn't get the zoom out to work but would be nice to implement, but also depends on how our game ends
    }

    if(player.y < 230) {
      this.scene.launch('oxygenscene',{oxygentimer})
    }
  }
}
