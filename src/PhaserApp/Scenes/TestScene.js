import Phaser from "phaser";

let testText;

export class TestScene extends Phaser.Scene {
 constructor() {
  super("testscene");
 }

 init() {}
 preload() {}
 create() {
  testText = this.add.text(400, 300, "Test Scene");
 }
 update() {}
}
