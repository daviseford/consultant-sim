import Phaser from "phaser";

export default class extends Phaser.Sprite {

  constructor({game, x, y, speed = [90, 90], asset}) {
    super(game, x, y, asset);
    this.asset = asset;
    this.game = game;

    this.anchor.setTo(0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.set(1);
    this.body.collideWorldBounds = true;
    this.body.velocity.setTo(speed[0], speed[1]);
    this.mass = 3;
  }

  asset() {
    return this.asset;
  }

  update() {
    this.angle += 0.5;
  }

}
