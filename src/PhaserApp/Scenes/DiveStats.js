import GameStatsCard from "../../assets/Background/DiveStats.png";

let bg;
let text;
let time;
let userProfile;

export class DiveStats extends Phaser.Scene {
 constructor() {
  super({ key: "DiveStats" });
 }

 init({ timeLeft, currentUserDetails }) {
  userProfile = currentUserDetails;
 }

 preload() {
  this.load.image("GameStatsCard", GameStatsCard);
 }

 create() {
  this.add.image(400, 300, "GameStatsCard").setScale(1.25);

  text = this.add.text(335, 350, "Dive Again!", {
   fontSize: "20px",
   fill: "#000",
  });

  text.setInteractive({ useHandCursor: true });

  text.on("pointerdown", () => {
   // ^^ Above this line export all game data to the db
   this.scene.stop("DiveStats");
   this.scene.start("newgame", { currentUserDetails: userProfile, resetFish: 0 });
   this.scene.stop("maingame");
  });
 }
}
