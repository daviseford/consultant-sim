import Phaser from "phaser";

export default class extends Phaser.State {
  init() {
  }

  preload() {
    this.load.image('button', 'assets/buttons/next.png', 193, 71);
  }

  create() {
    let banner = this.add.text(
        440,
        550,
        'That was too easy anyways...\n' + 'Time Elapsed: ' + this.game.time.totalElapsedSeconds().toFixed(3) + ' seconds'
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
    this.game.time.reset();
    this.state.start('Level3');
  }

}
