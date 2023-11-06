import Phaser from "phaser";

export class MainGame extends Phaser.Scene {
 constructor() {
  super("maingame");
 }

 init() {}
 preload() {}
 create() {
  this.add.text(400, 300, "MainGame Scene");
 }
 update() {}
}
