import GameOverBackground from "../../assets/Background/GameOver.png";

let bg;
let text;
let time;
let userProfile;

export class EndDive extends Phaser.Scene {
 constructor() {
  super({ key: "EndDive" });
 }

 init({ timeLeft, currentUserDetails }) {
  userProfile = currentUserDetails;
 }

 preload() {}

 create() {
  text = this.add.text(530, 84, "End Dive!", {
   fontSize: "20px",
   fill: "#000",
  });

  text.setInteractive({ useHandCursor: true });

  text.on("pointerdown", () => {
   // ^^ Above this line export all game data to the db
   this.scene.launch("DiveStats", { currentUserDetails: userProfile });
   this.scene.stop("EndDive");
  });
 }
}
