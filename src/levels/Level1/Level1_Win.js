import Phaser from "phaser";

export default class extends Phaser.State {
  init() {
  }

  preload() {
    this.load.image('button', 'assets/buttons/next_button.png', 193, 71);
  }

  create() {
    let banner = this.add.text(
        this.world.centerX - 440,
        this.game.height - 500,
        'You win!\n' + 'Time Elapsed: ' + Math.round(this.game.time.totalElapsedSeconds()) + ' seconds'
    );
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.smoothed = false;
    banner.anchor.setTo(0.5);
    let button = this.add.button(this.world.centerX - 600, this.game.height - 450, 'button', this.actionOnClick, this, 2, 1, 0);
  }

  actionOnClick() {
    this.game.time.reset();
    this.state.start('Level2');
  }

}
