import Phaser from "phaser";
import gameLogo from "../../assets/Other/pixelplungelogo.png";

let userProfile;
let fishArray;
let fishCount;

export default class LoadingScreen extends Phaser.Scene {
 constructor() {
  super("newgame");
 }

 init({ currentUserDetails, fishData, resetFish }) {
  fishCount = resetFish;
  userProfile = currentUserDetails;
  fishArray = fishData;
 }

 preload() {
  this.load.image("gamelogo", gameLogo);
 }

 create() {
  this.cameras.main.setBackgroundColor("#00337C");
  const image = this.add.image(400, 300, "gamelogo").setScale(0.5);

  this.cameras.main.once("camerafadeincomplete", function (camera) {
   camera.fadeOut(1500);
  });

  this.cameras.main.fadeIn(1000);
  setTimeout(() => {
   this.scene.start("maingame", { currentUserDetails: userProfile, fishData: fishArray, resetFish: fishCount });
  }, 2000);
 }
}
