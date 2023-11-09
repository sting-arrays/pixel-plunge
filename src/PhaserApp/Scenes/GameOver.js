import GameOverBackground from "../../assets/Background/GameOver.png";

let bg;
let text;
let time;
let userProfile;

export class GameOverScene extends Phaser.Scene {
 constructor() {
  super({ key: "GameOverScene" });
 }

 init({ timeLeft, currentUserDetails }) {
  userProfile = currentUserDetails;
 }

 preload() {
  this.load.image("GameOverBackground", GameOverBackground);
 }

 create() {
  this.add.image(400, 300, "GameOverBackground").setScale(1.25);

  text = this.add.text(320, 290, "Restart Game!", {
   fontSize: "20px",
   fill: "#000",
  });

  text.setInteractive({ useHandCursor: true });

  text.on("pointerdown", () => {
   this.scene.start("newgame", { currentUserDetails: userProfile });
   this.scene.stop("maingame");
   //  setTimeout(() => {
   //   this.scene.start("maingame");
   //   this.scene.stop("GameOverScene");
   //  }, 2000);
  });
 }
}
