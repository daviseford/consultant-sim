import "pixi";
import "p2";
import Phaser from "phaser";
import BootState from "./states/Boot";
import SplashState from "./states/Splash";
import Level1State from "./levels/Level1/Level1";
import Level1_LoseState from "./levels/Level1/Level1_Lose";
import Level1_WinState from "./levels/Level1/Level1_Win";
import Level2State from "./levels/Level2/Level2";
import Level2_LoseState from "./levels/Level2/Level2_Lose";
import Level2_WinState from "./levels/Level2/Level2_Win";
import Level3State from "./levels/Level3/Level3";
import Level3_LoseState from "./levels/Level3/Level3_Lose";
import Level3_WinState from "./levels/Level3/Level3_Win";

class Game extends Phaser.Game {

  constructor() {
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);

    this.state.add('Level1', Level1State, false);
    this.state.add('Level1_Lose', Level1_LoseState, false);
    this.state.add('Level1_Win', Level1_WinState, false);

    this.state.add('Level2', Level2State, false);
    this.state.add('Level2_Lose', Level2_LoseState, false);
    this.state.add('Level2_Win', Level2_WinState, false);

    this.state.add('Level3', Level3State, false);
    this.state.add('Level3_Lose', Level3_LoseState, false);
    this.state.add('Level3_Win', Level3_WinState, false);

    this.state.start('Boot');
  }

}

window.game = new Game();
