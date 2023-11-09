import Phaser from "phaser";
import logo from "../../assets/Other/stingarraylogo.png";
import { getAllFish, getAllUsers, getUserDetails } from "../../firebase";

let currentUser;
let currentUserDetails;
let fishData;
let guestAccount = {
 userName: "Guest",
 Fish_Bag: 10,
 Money: 0,
 Oxygen: 100,
};

export default class LoadingScreen extends Phaser.Scene {
 constructor() {
  super("loadingpage");
 }

 init(data) {
    console.log(data)
  if (data.email === "Guest") {
   currentUserDetails = guestAccount;
   console.log("i am here", currentUserDetails)
  } else {
   currentUser = data.email;
   getUserDetails(currentUser).then((result) => {
    currentUserDetails = result;
   });
   getAllFish().then((response) => {
    fishData = response;
   });
  }
 }

 preload() {
  this.load.image("logo", logo);
 }

 create() {
  this.cameras.main.setBackgroundColor("#00337C");
  const image = this.add.image(400, 250, "logo").setScale(0.5);
  this.add.text(335, 500, "Sting-Arrays", "#FFF");

  this.cameras.main.once("camerafadeincomplete", function (camera) {
   camera.fadeOut(2000);
  });

  this.cameras.main.fadeIn(2000);
  setTimeout(() => {
   this.scene.start("newgame", { currentUserDetails, fishData });
  }, 4000);
 }
}
