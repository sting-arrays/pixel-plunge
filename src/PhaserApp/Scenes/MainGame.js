import Phaser, { NONE } from "phaser";
import { createCharAnims, createRocks, createShark, createUniqueFish, sharkAttack, createAllFish, createBubbles } from "../utils";
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
// let background;

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
  this.load.image("chomp", index.chomp);
  this.load.image("dumbo", index.dumbo);
  this.load.image("Eleventicles", index.Eleventicles);
  this.load.image("Flat Boi", index.FlatBoi);
  this.load.image("kaboom", index.kaboom);
  this.load.image("Red Rum", index.RedRum);
  this.load.image("tang fish", index.tangFish);
  this.load.image("zebra", index.zebra);
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
  this.load.image("pier", index.pier);
  this.load.image("column1", index.column1);
  this.load.image("column2", index.column2);
  this.load.image("column3", index.column3);
  this.load.image("railing", index.railing);
  this.load.image("invisibleWall", index.invisibleWall);
  this.load.image("bottomboundary", index.bottomBoundary);
  this.load.image("sideboundary", index.sideBoundary);
  this.load.image("smallBubble", index.smallBubble);
  this.load.image("medBubble", index.medBubble);
  this.load.image("largeBubble", index.largeBubble);
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
     coins += fishArray[i].fish_value;
     coinsCollectedThatDive += fishArray[i].fish_value;

     index.EventsCenter.emit("coins-collected", coinsCollectedThatDive);
    }
   }
   fish.disableBody(true, true);
   this.scene.launch("uiscene", {
    coins,
    fishCount,
    bucketSize,
   });
  }

  if (fishCount === 0) {
   index.EventsCenter.emit("fish-caught", caughtFish);
   index.EventsCenter.emit("coins-collected", coinsCollectedThatDive);
  }

  fixed = this.physics.add.staticGroup();
  createRocks(fixed);

  //Create Player
  player = this.physics.add.sprite(30, 130, "character").setScale(0.5);
  player.setSize(60, 130, true);

  // player.setCollideWorldBounds(true);

  this.cameras.main.startFollow(player, true);
  this.cameras.main.setBounds(0, 0, 800, height);
  this.cameras.main.zoom = 1.5;

  // setTimeout(() => {
  //   this.scene.launch("EndDive");
  // }, 5000);

  //Create Boat
  // const boat = fixed.create(119, 250, "boat").setScale(0.6).refreshBody();
  // boat.setSize(220, 60, true);

  const pier = fixed.create(120, 182, "pier").refreshBody();

  const column1 = fixed.create(15, 224, "column1").setScale(0.5).refreshBody();
  const column2 = fixed.create(146, 224, "column2").setScale(0.5).refreshBody();
  const column3 = fixed.create(256, 224, "column3").setScale(0.5).refreshBody();

  this.add.image(40, 161, "railing").setScale(0.4);

  const invisibleWall = fixed.create(120, 255, "invisibleWall").refreshBody();
  fixed.create(400, 2048, "bottomboundary");
  fixed.create(816, 1024, "sideboundary");
  fixed.create(-16, 1024, "sideboundary");

  createCharAnims(this);

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, fixed);

  //Randomly spawn fish
  //Do we want to split these up into groups for points reasons? Can make the higher point fish spawn lower, be faster etc

  const fishes = this.physics.add.group();
  createAllFish(fishes);

  this.physics.add.overlap(player, fishes, collectFish, null, this);

  // this.scene.launch("testscene");
  this.scene.launch("uiscene", {
   coins: coins,
   fishCount: fishCount,
   bucketSize: bucketSize,
  });

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
  createBubbles(this, player);
 }

 update() {
  if (player.y < 290 && player.x < 300) {
   this.cameras.main.zoomTo(1.5, 1500);
   player.rotation = 0;
  }
  //When player is out of water
  if (player.y < 215) {
   player.rotation = 0;
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
   const { left, up, down, right } = cursors;
   const swimmingLeft = left.isDown;
   const swimmingRight = right.isDown;
   const swimmingUp = up.isDown;
   const swimmingDown = down.isDown;

   const diagUpRight = swimmingUp && swimmingRight;
   const diagUpLeft = swimmingUp && swimmingLeft;
   const diagDownRight = swimmingDown && swimmingRight;
   const diagDownLeft = swimmingDown && swimmingLeft;

   const noMovement = !cursors.isDown;
   const timeRemaining = timeLeft > 1 || timeLeft === undefined;

   //As the player jumps into the water the camera has a transitional Zoom in
   this.cameras.main.zoomTo(2.5, 3000);
   player.body.setAllowGravity(false);

   if (diagDownLeft && timeRemaining) {
    player.setVelocityX(-100);
    player.setVelocityY(100);
    player.anims.play("swimming-left", true);
    player.rotation = 12;
   } else if (diagDownRight && timeRemaining) {
    player.setVelocityX(100);
    player.setVelocityY(100);
    player.anims.play("swimming-right", true);
    player.rotation = 7;
   } else if (diagUpLeft && timeRemaining) {
    player.setVelocityX(-100);
    player.setVelocityY(-100);
    player.anims.play("swimming-left", true);
    player.rotation = 13;
   } else if (diagUpRight && timeRemaining) {
    player.setVelocityX(100);
    player.setVelocityY(-100);
    player.anims.play("swimming-right", true);
    player.rotation = 6;
   } else if (swimmingLeft && timeRemaining) {
    player.rotation = 0;
    player.setVelocityX(-150);
    player.anims.play("swimming-left", true);
   } else if (swimmingRight) {
    player.rotation = 0;
    player.setVelocityX(150);
    player.anims.play("swimming-right", true);
   } else if (swimmingUp && timeRemaining) {
    player.rotation = 0;
    player.setVelocityY(-150);
    player.anims.play("swimming-up", true);
   } else if (swimmingDown && timeRemaining) {
    player.rotation = 0;
    player.setVelocityY(150);
    player.anims.play("swimming-down", true);
   } else if (noMovement && timeRemaining) {
    player.setVelocityY(10).setVelocityX(0);
    player.anims.play("swimming-idle", true);
    player.rotation = 0;
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
   player.setVelocityY(-280).flipY = false;
   player.flipX = false;
   //Couldn't get the zoom out to work but would be nice to implement, but also depends on how our game ends
   this.scene.launch("EndDive", {
    currentUserDetails: userProfile,
    fishData: fishArray,
   });
  }
 }
}
