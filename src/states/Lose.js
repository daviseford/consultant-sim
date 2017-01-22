import Phaser from "phaser";

export default class extends Phaser.State {
  init(lose_text = 'You lose! Try again?') {
    this.lose_text = lose_text;
  }

  preload() {
    this.load.image('button', 'assets/buttons/retry.png', 193, 71);
  }

  create() {
    let banner = this.add.text(440, 550, this.lose_text);
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.smoothed = false;
    banner.anchor.setTo(0.5);
    let button = this.add.button(440, 300, 'button', this.restartLevel, this, 2, 1, 0);
    button.anchor.setTo(0.5);
  }

  restartLevel() {
    this.game.time.reset();
    this.state.start(this.state.levelManager.getCurrentLevel());
  }

}
