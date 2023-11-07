import Phaser from "phaser";

let testText;

export class TestScene extends Phaser.Scene {
 constructor() {
  super("testscene");
 }

 init() {}
 preload() {}
 create() {
  this.text = this.add
   .text(10, 10, "Cursors to move", {
    font: "16px Courier",
    fill: "#00FF00",
   })
   .setScrollFactor(0);
 }
 update() {
  this.text.setText([
   `screen x: ${this.input.x}`,
   `screen y: ${this.input.y}`,
   `world x: ${this.input.mousePointer.worldX}`,
   `world y: ${this.input.mousePointer.worldY}`,
  ]);
 }
}
