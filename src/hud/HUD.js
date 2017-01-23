import Score from "./Score";
import BestTime from "./BestTime";
import Lives from "./Lives";

export default class HUD {
  constructor(state) {
    this.state = state;
    this.scorer = new Score();
    this.best_time = new BestTime(window);
    this.lives = new Lives(3);
    this.level_name = this.state.state.levelManager.getCurrentLevel();


    this.textStyle = {
      font: "bold 24px Arial",
      fill: "#000000",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };
    this.hud = this.state.add.text(100, this.state.game.height - 80, '', this.textStyle);
    this.hud.fixedToCamera = true;
    this.hud.setShadow(2, 2, 'rgba(255,255,255,1)', 0.1);

  }

  getLives() {
    return this.lives.getLives();
  }

  loseLife() {
    return this.lives.loseLife();
  }

  getScore() {
    return this.scorer.getScore();
  }

  getIncrement() {
    return this.scorer.getIncrement();
  }

  incrementScore() {
    return this.scorer.incrementScore();
  }

  getTime() {
    return this.state.game.time.totalElapsedSeconds().toFixed(3);
  }

  setBestTime() {
    return this.best_time.setBestTime(this.level_name, this.getTime());
  }

  getBestTime() {
    return this.best_time.getBestTime(this.level_name);
  }

  updateHUD() {
    this.hud.setText(
        `  Life: ${this.getLives()}` +
        `        Score: ${this.getScore()}` +
        `\n` +
        `  Time: ${this.getTime()}` +
        `  Best Time: ${this.getBestTime() || 'N/A'}`
    );
  }
}