import Phaser from "phaser";
import { TestScene } from "./Scenes/TestScene";
import { MainGame } from "./Scenes/MainGame";
import { UIScene } from "./Scenes/UIScene";
import { GameOverScene } from "./Scenes/GameOver";
import LoadingScreen from "./Scenes/LoadingScreen";
import { OxygenBar } from "./Scenes/OxygenBar";
import NewGame from "./Scenes/NewGame";
import { EndDive } from "./Scenes/EndDive";
import { DiveStats } from "./Scenes/DiveStats";
import HelpScene from "./Scenes/HelpScene";

export class PhaserApp {
  constructor({ width, height, id, email }) {
    const config = {
      type: Phaser.AUTO,
      parent: id,
      width: width,
      height: height,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 500 },
          debug: false,
        },
      },
      scene: [
        LoadingScreen,
        MainGame,
        TestScene,
        UIScene,
        OxygenBar,
        GameOverScene,
        NewGame,
        EndDive,
        DiveStats,
        HelpScene,
      ],
    };
    this.game = new Phaser.Game(config);
    this.game.scene.add("loadingpage", new LoadingScreen(), true, { email });
  }
  update = () => {
    this.game.events.emit("update");
  };

  destroy = () => {
    this.game.destroy(true);
  };
}
