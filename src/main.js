import "pixi";
import "p2";
import Phaser from "phaser";
import LevelManager from "./helpers/LevelManager";
import BootState from "./states/Boot";
import SplashState from "./states/Splash";
import LoseState from "./states/Lose";
import WinState from "./states/Win";
import Level1State from "./levels/Level1/Level1";
import Level2State from "./levels/Level2/Level2";
import Level3State from "./levels/Level3/Level3";
import Level4State from "./levels/Level4/Level4";

class Game extends Phaser.Game {

  constructor() {
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Lose', LoseState, false);
    this.state.add('Win', WinState, false);

    const levels = [
      {name: 'Level1', state: Level1State},
      {name: 'Level2', state: Level2State},
      {name: 'Level3', state: Level3State},
      {name: 'Level4', state: Level4State},
    ];

    this.state.levelManager = new LevelManager(levels.reduce((a, b) => {
      a.push(b.name);
      return a;
    }, []));

    levels.map((x) => {
      this.state.add(x.name, x.state, false)
    });

    this.state.start('Boot');
  }

}

window.game = new Game();
