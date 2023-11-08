import Phaser from "phaser";
import { TestScene } from "./Scenes/TestScene";
import { MainGame } from "./Scenes/MainGame";
import { UIScene } from "./Scenes/UIScene";
import LoadingScreen from "./Scenes/LoadingScreen";
import { OxygenBar } from "./Scenes/OxygenBar";

export class PhaserApp {
 constructor({ width, height, id, userName }) {
  const config = {
   type: Phaser.AUTO,
   parent: id,
   width: width,
   height: height,
   physics: {
    default: "arcade",
    arcade: {
     gravity: { y: 500 },
     debug: true,
    },
   },
   scene: [LoadingScreen, MainGame, TestScene, UIScene, OxygenBar],
  };
  this.game = new Phaser.Game(config);
  this.game.scene.add("loadingpage", new LoadingScreen(), true, {userName})
 }
 update = () => {
  this.game.events.emit("update");
 };

 destroy = () => {
  this.game.destroy(true);
 };
}
