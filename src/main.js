import "pixi";
import "p2";
import Phaser from "phaser";
import LevelManager from "./helpers/LevelManager";
import BootState from "./states/Boot";
import SplashState from "./states/Splash";
import LoseState from "./states/Lose";
import WinState from "./states/Win";
import SixteenSecondsState from "./levels/SixteenSeconds";
import LongDropState from "./levels/LongDrop";
import KudoHop1State from "./levels/KudoHop1";
import LargeDungeon1State from "./levels/LargeDungeon1";
// import LargeDungeon2State from "./levels/LargeDungeon2";

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
      // {name: 'LargeDungeon2', state: LargeDungeon2State, asset: 'assets/tilemaps/maps/large_dungeon2.json'},
      {name: 'SixteenSeconds', state: SixteenSecondsState, asset: 'assets/tilemaps/maps/sixteen_seconds.json'},
      {name: 'LongDrop', state: LongDropState, asset: 'assets/tilemaps/maps/long_drop1.json'},
      {name: 'KudoHop1', state: KudoHop1State, asset: 'assets/tilemaps/maps/kudo_hop1.json'},
      {name: 'LargeDungeon1', state: LargeDungeon1State, asset: 'assets/tilemaps/maps/large_dungeon1.json'},
    ];

    this.state.levelManager = new LevelManager(levels);

    levels.map((x) => {
      this.state.add(x.name, x.state, false)
    });

    this.state.start('Boot');
  }

}

window.game = new Game();
