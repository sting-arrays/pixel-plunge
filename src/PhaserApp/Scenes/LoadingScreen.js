import Phaser from "phaser";
import logo from "../../assets/Other/stingarraylogo.png";
import { getAllFish, getAllUsers, getUserDetails } from "../../firebase";
import { fishData } from "../fishData";

let currentUser;
let currentUserDetails;
let guestAccount = {
 userName: "Guest",
 Fish_Bag: 10,
 Money: 0,
 Oxygen: 10,
 caught_fish: [],
};
let timeOut = 0;

let hasUserLoaded = false;

export default class LoadingScreen extends Phaser.Scene {
 constructor() {
  super("loadingpage");
 }

 init(data) {
  if (data.email === "Guest") {
   currentUserDetails = guestAccount;
   hasUserLoaded = true;
  } else {
   currentUser = data.email;
   getUserDetails(currentUser).then((result) => {
    currentUserDetails = result;
    hasUserLoaded = true;
   });
  }
 }

 preload() {
  this.load.image("logo", logo);
 }

 create() {
  this.cameras.main.setBackgroundColor("#00337C");
  const image = this.add.image(400, 250, "logo").setScale(0.5);
  this.add.text(270, 475, "Sting Arrays", {
   fontFamily: "Pixelify Sans",
   fontSize: "40px",
   color: "#ffffff",
  });

  this.cameras.main.fadeIn(2000);
  const loader = setInterval(() => {
   timeOut++;
   if (timeOut === 6) {
    clearInterval(loader);
    currentUserDetails = "Guest";
    hasUserLoaded = true;
   }
   if (hasUserLoaded) {
    this.cameras.main.once("camerafadeincomplete", function (camera) {
     camera.fadeOut(2000);
    });
    setTimeout(() => {
     this.scene.start("newgame", { currentUserDetails, fishData });
    }, 3000);
    clearInterval(loader);
   }
  }, 1000);
 }
}
