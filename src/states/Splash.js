import Phaser from "phaser";

export default class extends Phaser.State {
  init() {
  }

  preload() {
    this.load.tilemap('map', 'assets/tilemaps/maps/features_test1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
    this.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
    this.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');

    this.load.image('kudos', 'assets/images/kudos.png');
    this.load.image('email', 'assets/images/email.png');
    this.load.image('phone', 'assets/images/phone_icon.png');
    this.load.image('conf-call', 'assets/images/conf-call.png');

    this.load.spritesheet('suit', 'assets/images/suit.png', 32, 48);
  }

  create() {
    this.state.start('Game')
  }

}
