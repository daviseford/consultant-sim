import Phaser from "phaser";

export default class extends Phaser.State {
  init() {
  }

  preload() {
    this.load.tilemap('level1', 'assets/tilemaps/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'assets/tilemaps/maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level3', 'assets/tilemaps/maps/level3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level4', 'assets/tilemaps/maps/level4.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
    this.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
    this.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');

    this.load.image('kudos', 'assets/images/kudos.png');
    this.load.image('email', 'assets/images/email.png');
    this.load.image('phone', 'assets/images/phone_icon.png');
    this.load.image('conf-call', 'assets/images/conf-call.png');
    this.load.image('promotion', 'assets/images/promotion.png');

    this.load.spritesheet('suit', 'assets/images/suit.png', 32, 48);
  }

  create() {
    this.state.start('Level1');
  }

}
