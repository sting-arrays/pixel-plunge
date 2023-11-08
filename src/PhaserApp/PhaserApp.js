import Phaser from "phaser";
import { TestScene } from "./Scenes/TestScene";
import { MainGame } from "./Scenes/MainGame";
import { UIScene } from "./Scenes/UIScene";
import { GameOverScene } from "./Scenes/GameOver";
import LoadingScreen from "./Scenes/LoadingScreen";
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
          gravity: { y: 500 },
          debug: true,
        },
      },
      scene: [LoadingScreen, MainGame, TestScene, UIScene, GameOverScene],
    };
    this.game = new Phaser.Game(config);
  }
  update = () => {
    this.game.events.emit("update");
  };

  destroy = () => {
    this.game.destroy(true);
  };
}
