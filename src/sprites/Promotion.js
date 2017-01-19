import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({game, x, y}) {
    super(game, x, y, 'promotion');
    this.game = game;
    this.anchor.setTo(0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.setTo(0, 0)
  }
}
