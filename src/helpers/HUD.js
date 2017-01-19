export default class HUD {
  constructor(state) {
    this.state = state;
    this.level_name = this.state.level_name;
    this.hud = this.state.add.text(100, this.state.game.height - 100, '');
    this.hud.fixedToCamera = true;
  }

  updateHUD() {
    this.hud.setText(
        `  Life: ${this.state.lives.getLives()}` +
        `  Score: ${this.state.scorer.getScore()}` +
        `\n` +
        `  Time: ${this.state.getTime()}` +
        `  Best Time: ${this.state.best_time.getHighScore(this.level_name) || 'N/A'}`
    );
  }
}