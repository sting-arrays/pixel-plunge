import Phaser, { NONE } from "phaser";
import { createCharAnims, createRocks, createShark, createUniqueFish, sharkAttack } from "../utils";
import * as index from "./index";
import waterBG from "../../assets/Background/water-bg.json";
import swampBG from "../../assets/Background/swamp-bg.json";

let fishes;
let fixed;
let player;
let cursors;
let text;
let coins = 0;
let fishCount = 0;
let bucketSize = 5;
let height = 2048;
let oxygentimer = 30;
let timeLeft;
let caughtFish = [];
let fishArray = [];
let userProfile;
let coinsCollectedThatDive;

export class MainGame extends Phaser.Scene {
 constructor() {
  super("maingame");
 }

 init({ currentUserDetails, resetFish, fishData }) {
  if (resetFish !== undefined) {
   fishCount = resetFish;
  }
  fishArray = fishData;
  userProfile = currentUserDetails;

  coins = +currentUserDetails.Money;
  bucketSize = +currentUserDetails.Fish_Bag;
  oxygentimer = +currentUserDetails.Oxygen;
 }

 preload() {
  this.load.tilemapTiledJSON("default", waterBG);
  this.load.tilemapTiledJSON("swamp", swampBG);
  this.load.image("extruded-tiles", index.extrudedWaterTiles);
  this.load.image("boat", index.boat);
  this.load.image("Cod", index.Cod);
  this.load.image("Darth Fisher", index.darthFisher);
  this.load.image("Dory", index.Dory);
  this.load.image("Jaws", index.Jaws);
  this.load.image("McFish", index.McFish);
  this.load.image("coolfish", index.coolfish);
  this.load.image("magic fish", index.magicFish);
  this.load.image("northern fish", index.northernFish);
  this.load.image("really big fish", index.reallyBigFish);
  this.load.image("the fish named jordan", index.theFishNamedJordan);
  this.load.image("shark", index.shark);
  this.load.image("xlrock2flat", index.xlrock2flat);
  this.load.image("xlrock2left", index.xlrock2left);
  this.load.image("xlrock2right", index.xlrock2right);
  this.load.image("xlrock1flat", index.xlrock1flat);
  this.load.image("xlrock1left", index.xlrock1left);
  this.load.image("xlrock1right", index.xlrock1right);
  this.load.image("medrock1flat", index.medrock1flat);
  this.load.image("medrock2flat", index.smallrock1flat);
  this.load.spritesheet("character", index.character, {
   frameWidth: 128,
   frameHeight: 128,
  });
  this.load.spritesheet("swimming", index.swimming, {
   frameWidth: 128,
   frameHeight: 128,
  });
 }

 create() {
  coinsCollectedThatDive = 0;
  const mapKeys = ["default", "swamp"];
  const map = this.make.tilemap({
   key: mapKeys[Phaser.Math.Between(0, mapKeys.length - 1)],
  });
  const tileSet = map.addTilesetImage("water_(4)", "extruded-tiles", 64, 64, 1, 2);

  map.createLayer("background", tileSet);
  map.createLayer("foreground", tileSet);

  this.cameras.main.fadeIn(2000);

  this.input.keyboard.enabled = true;

  caughtFish = [];

  function collectFish(player, fish) {
   if (fishCount === bucketSize) {
    return;
   }
   caughtFish.push(fish.texture.key);
   fishCount++;
   index.EventsCenter.emit("fish-caught", caughtFish);
   for (let i = 0; i < fishArray.length; i++) {
    if (fishArray[i].name === fish.texture.key) {
     // coins += fishArray[i].fish_value;
     coinsCollectedThatDive += fishArray[i].fish_value;
     index.EventsCenter.emit("coins-collected", coinsCollectedThatDive);
    }
   }
   fish.disableBody(true, true);
   this.scene.launch("uiscene", {
    coins: coins,
    fishCount: fishCount,
    bucketSize: bucketSize,
   });
  }

  if (fishCount === 0) {
   index.EventsCenter.emit("fish-caught", caughtFish);
   index.EventsCenter.emit("coins-collected", coinsCollectedThatDive);
  }

  fixed = this.physics.add.staticGroup();
  createRocks(fixed);

  //Create Player
  player = this.physics.add.sprite(30, 30, "character").setScale(0.5);
  player.setSize(50, 80, true);

  // player.setCollideWorldBounds(true);

  this.cameras.main.startFollow(player, true);
  this.cameras.main.setBounds(0, 0, 800, height);
  this.cameras.main.zoom = 0.8;

  // setTimeout(() => {
  //   this.scene.launch("EndDive");
  // }, 5000);

  //Create Player
  const boat = fixed.create(119, 250, "boat").setScale(0.6).refreshBody();
  boat.setSize(220, 60, true);

  createCharAnims(this);

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, fixed);

  //Randomly spawn fish
  //Do we want to split these up into groups for points reasons? Can make the higher point fish spawn lower, be faster etc

  const fishes = this.physics.add.group();
  createUniqueFish(Phaser.Math.Between(3, 8), 400, 600, fishes, "Cod", 400, 600);
  createUniqueFish(Phaser.Math.Between(3, 8), 500, 800, fishes, "Darth Fisher", 500, 800);
  createUniqueFish(Phaser.Math.Between(3, 8), 700, 1100, fishes, "Dory", 700, 1100);
  createUniqueFish(Phaser.Math.Between(3, 8), 1000, 1400, fishes, "coolfish", 1000, 1400);
  createUniqueFish(Phaser.Math.Between(3, 8), 1000, 1400, fishes, "magic fish", 1000, 1400);
  createUniqueFish(Phaser.Math.Between(3, 8), 1000, 1800, fishes, "McFish", 1000, 1800);
  createUniqueFish(Phaser.Math.Between(4, 7), 1000, 1800, fishes, "northern fish", 1000, 1800);
  createUniqueFish(Phaser.Math.Between(1, 3), 1500, 1900, fishes, "Jaws", 1500, 1900);
  createUniqueFish(Phaser.Math.Between(1, 3), 1500, 1900, fishes, "the fish named jordan", 1500, 1900);
  createUniqueFish(Phaser.Math.Between(1, 2), 1800, 2000, fishes, "really big fish", 1800, 2000);

  this.physics.add.overlap(player, fishes, collectFish, null, this);

  //this.scene.launch("testscene");
  this.scene.launch("uiscene", { coins: coins, fishCount: fishCount });

  index.EventsCenter.on(
   "time-left",
   (time) => {
    timeLeft = time;
   },
   this
  );

  const sharks = this.physics.add.group();
  createShark(1, 550, 850, sharks, "shark", 550, 850);
  createShark(1, 1500, 2000, sharks, "shark", 1500, 2000);

  this.physics.add.collider(player, sharks, sharkAttack, null, this);
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
    player.anims.play("left", true);
   } else if (cursors.right.isDown && player.x < 784) {
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
  }

  //When player is in water
  if (player.y > 230) {
   //As the player jumps into the water the camera has a transitional Zoom in
   this.cameras.main.zoomTo(2.5, 3000);
   player.body.setAllowGravity(false);

   if ((cursors.left.isDown && player.x > 16 && timeLeft > 1) || (cursors.left.isDown && player.x > 16 && timeLeft === undefined)) {
    player.setVelocityX(-200);
    player.anims.play("swimming-left", true);
   } else if ((cursors.right.isDown && player.x < 784 && timeLeft > 1) || (cursors.right.isDown && player.x < 784 && timeLeft === undefined)) {
    player.setVelocityX(200);
    player.anims.play("swimming-right", true);
   } else if (
    (cursors.up.isDown && player.x < 784 && player.x > 16 && timeLeft > 1) ||
    (cursors.up.isDown && player.x < 784 && player.x > 16 && timeLeft === undefined)
   ) {
    player.setVelocityY(-200);
    player.anims.play("swimming-up", true);
   } else if (
    (cursors.down.isDown && player.y <= height - 48 && player.x < 784 && player.x > 16 && timeLeft > 1) ||
    (cursors.down.isDown && player.y <= height - 48 && player.x < 784 && player.x > 16 && timeLeft === undefined)
   ) {
    player.setVelocityY(200);
    player.anims.play("swimming-down", true);
   } else if ((!cursors.isDown && timeLeft > 1) || (!cursors.isDown && timeLeft === undefined)) {
    player.setVelocityY(10).setVelocityX(0);
    player.anims.play("swimming-idle", true);
   }
  }

  if (player.y > 215 && player.y < 230 && cursors.up.isDown) {
   player.setVelocityY(-250).flipY = false;
   player.flipX = false;
   //Couldn't get the zoom out to work but would be nice to implement, but also depends on how our game ends
  }

  if (player.y < 230) {
   this.scene.launch("oxygenscene", {
    oxygentimer,
    currentUserDetails: userProfile,
    fishData: fishArray,
   });
  }

  if (player.y > 230) {
   this.scene.stop("EndDive");
  }

  if (timeLeft === 1) {
   // Currently not working, a fixed animation for when the character dies flicks to swimming when turning ^^
   this.input.keyboard.enabled = false;
   player.anims.play("player-dead", true).flipY = true;
   player.setVelocityX(0);
   player.setVelocityY(40);
   fishCount = 0;
   // if (player.y >= 2048) {
   //   player.setVelocityY(0);
   // }
  }
  if (player.y > 215 && player.y < 230 && cursors.up.isDown) {
   player.setVelocityY(-250).flipY = false;
   player.flipX = false;
   //Couldn't get the zoom out to work but would be nice to implement, but also depends on how our game ends
   this.scene.launch("EndDive", {
    currentUserDetails: userProfile,
    fishData: fishArray,
   });
  }
 }
}
