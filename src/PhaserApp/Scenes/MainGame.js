import Phaser from "phaser";
import background from "../../assets/Background/background.png";
import boat from "../../assets/Scenary/boat.png";
import fish1 from "../../assets/Fish/1.png";
import fish2 from "../../assets/Fish/2.png";
import fish3 from "../../assets/Fish/3.png";
import fish4 from "../../assets/Fish/4.png";

let fixed;
let fishes;

export class MainGame extends Phaser.Scene {
 constructor() {
  super("maingame");
 }

 init() {}
 preload() {
  this.load.image("background", background);
  this.load.image("boat", boat);
  this.load.image("fish1", fish1);
  this.load.image("fish2", fish2);
  this.load.image("fish3", fish3);
  this.load.image("fish4", fish4);
 }
 create() {
  this.add.image(400, 1000, "background");

  fixed = this.physics.add.staticGroup();

  fixed.create(40, 75, "boat");

  //Randomly spawn fish
  fishes = this.physics.add.group();
  let fishArray = ["fish1", "fish2", "fish3", "fish4"];

  for (let i = 0; i < 5; i++) {
   let y = Phaser.Math.Between(150, 700);
   let fish = fishes.create(16, y, fishArray[i % fishArray.length]).setScale(0.2);
   fish.setBounce(1);
   fish.setCollideWorldBounds(true);
   setInterval(() => {
    if (fish.y < 150) {
     fish.setVelocityY(100);
    } else {
     fish.setVelocityX(Phaser.Math.Between(-200, 200));
     fish.setVelocityY(Phaser.Math.Between(-50, 50));
    }
   }, 1000);
   fish.setVelocity(Phaser.Math.Between(-300, 0), 0);
   fish.body.setAllowGravity(false);
  }

  function randomlyMoveFish(fish) {
   fish.y = fish.y - 100;
  }
 }

 update() {}
}
