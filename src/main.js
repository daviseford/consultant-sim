import "pixi";
import "p2";
import Phaser from "phaser";
import BootState from "./states/Boot";
import SplashState from "./states/Splash";
import GameState from "./states/Game";
import LoseState from "./states/Lose";
import WinState from "./states/Win";

class Game extends Phaser.Game {

  constructor() {
    let width = document.documentElement.clientWidth > 768 ? 768 : document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);
    this.state.add('Lose', LoseState, false);
    this.state.add('Win', WinState, false);

    this.state.start('Boot');
  }

}

window.game = new Game();
