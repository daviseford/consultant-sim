import Phaser from "phaser";

export default class extends Phaser.State {
  init(win_text = 'You win... this time.') {
    this.game_over = this.state.levelManager.isGameOver();
    this.win_text = this.game_over ? 'You beat the game!' : win_text;
  }

  preload() {
    if (this.game_over) {
      this.load.image('button', 'assets/buttons/retry.png', 193, 71);
    } else {
      this.load.image('button', 'assets/buttons/next.png', 193, 71);
    }
  }

  create() {
    let banner = this.add.text(
        440,
        550,
        this.win_text + '\nTime Elapsed: ' + this.game.time.totalElapsedSeconds().toFixed(3) + ' seconds'
    );
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.smoothed = false;
    banner.anchor.setTo(0.5);
    let button = this.add.button(440, 300, 'button', this.actionOnClick, this, 2, 1, 0);
    button.anchor.setTo(0.5);
  }

  actionOnClick() {
    const lvlName = this.game_over ? this.state.levelManager.resetLevels() : this.state.levelManager.toNextLevel();
    this.game.time.reset();
    this.state.start(lvlName);
  }

}
