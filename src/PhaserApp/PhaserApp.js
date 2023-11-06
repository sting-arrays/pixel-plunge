import Phaser from "phaser";
import { TestScene } from "./Scenes/TestScene";

export class PhaserApp {
 constructor({ width, height, id }) {
  const config = {
   type: Phaser.AUTO,
   parent: id,
   width: width,
   height: height,
   physics: {
    default: "arcade",
    arcade: {
     gravity: { y: 0 },
     debug: true,
    },
   },
   scene: [TestScene],
  };
  this.game = new Phaser.Game(config);
  this.game.scene.add("testscene", new TestScene());
 }
 update = () => {
  this.game.events.emit("update");
 };

 destroy = () => {
  this.game.destroy(true);
 };
}
