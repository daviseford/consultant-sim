import Phaser from "phaser";

export default class extends Phaser.State {
  init() {
  }

  preload() {
  }

  create() {
    let banner = this.add.text(this.world.centerX - 500, this.game.height - 500, 'You lose!');
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.smoothed = false;
    banner.anchor.setTo(0.5);
  }

}
