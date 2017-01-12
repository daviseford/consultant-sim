import Phaser from "phaser";

export default class extends Phaser.Sprite {

  constructor({game, x, y, asset}) {
    super(game, x, y, asset);
    this.game = game;
    //  We need to enable physics on the player
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.anchor.set(0);
    this.body.bounce.y = 0.1;
    this.body.gravity.y = 1000;

    this.body.setSize(16, 16, 8, 8);

    this.game.camera.follow(this);
    this.body.collideWorldBounds = true;
    this.body.linearDamping = 1;
  }

  create() {
  }

  update() {
  }


}
