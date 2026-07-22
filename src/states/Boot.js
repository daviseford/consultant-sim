import Phaser from "phaser";

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#EDEEC9';
    this.scale.setResizeCallback(this.game.resizeGame, this.game);
  }

  preload() {
  }

  render() {
    this.state.start('Splash')
  }

}
