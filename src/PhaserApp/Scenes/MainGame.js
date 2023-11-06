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
  //Do we want to split these up into groups for points reasons? Can make the higher point fish spawn lower, be faster etc
  fishes = this.physics.add.group();
  let fishArray = ["fish1", "fish2", "fish3", "fish4"];
  //number below is how many fish are spawned
  for (let i = 0; i < 5; i++) {
   //spawn x and y axis
   let y = Phaser.Math.Between(150, 700);
   let x = Phaser.Math.Between(0, 600);
   //creates fish sprite based on array
   let fish = fishes.create(x, y, fishArray[i % fishArray.length]).setScale(0.2);
   fish.setCollideWorldBounds(false);
   //adjust fish hitbox size
   fish.setSize(70, 50, true);
   //make fish move randomly, but stay below waterline and come back into screen
   setInterval(() => {
    //keep the fish away from the surface
    if (fish.y < 150) {
     fish.setVelocityY(100);
     //make the fish come back into screen after going off bottom
    } else if (fish.y > 800) {
     //make the fish come back into screen after going off left
     fish.setVelocityY(-200);
    } else if (fish.x < -50) {
     fish.setVelocityX(Phaser.Math.Between(50, 200));
     //make the fish come back into screen after going off right
    } else if (fish.x > 900) {
     fish.setVelocityX(Phaser.Math.Between(-50, -200));
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
   }, 1000);
   //give fish a random starting velocity
   fish.setVelocity(Phaser.Math.Between(-300, 300), 0);
   fish.body.setAllowGravity(false);
  }
 }

 update() {}
}
