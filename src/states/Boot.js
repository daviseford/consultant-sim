import Phaser from "phaser";

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#EDEEC9';
  }

  preload() {
  }

  render() {
    this.state.start('Splash')
  }

}
