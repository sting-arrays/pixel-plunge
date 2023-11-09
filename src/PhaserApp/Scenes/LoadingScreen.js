import Phaser from "phaser";
import logo from "../../assets/Other/stingarraylogo.png";
import { getAllFish, getAllUsers, getUserDetails } from "../../firebase";

let currentUser;
let currentUserDetails;

export default class LoadingScreen extends Phaser.Scene {
  constructor() {
    super("loadingpage");
  }

  init(data) {
    currentUser = data.userName;
    getUserDetails(currentUser).then((result) => {
      currentUserDetails = result;
    });
  }

  preload() {
    this.load.image("logo", logo);
  }

  create() {
    let data = [];
    getAllFish().then((response) => {
      data = response;
    });

    let users = [];
    getAllUsers().then((response) => {
      users = response;
    });

    this.cameras.main.setBackgroundColor("#00337C");
    const image = this.add.image(400, 250, "logo").setScale(0.5);
    this.add.text(335, 500, "Sting-Arrays", "#FFF");

    this.cameras.main.once("camerafadeincomplete", function (camera) {
      camera.fadeOut(4000);
    });

    this.cameras.main.fadeIn(4000);
    setTimeout(() => {
      this.scene.start("maingame", { currentUserDetails });
    }, 7000);
  }
}
