/* globals __DEV__ */
import Phaser from "phaser";
import Score from "../helpers/Score";
import Lives from "../helpers/Lives";
import createBanner from "../helpers/Banner";
import HeavyLargeBall from "../sprites/HeavyLargeBall";
import StandardBall from "../sprites/StandardBall";
import Consultant from "../sprites/Consultant";
import Kudos from "../sprites/Kudos";
import {frictionUtil, getRandomInt} from "../utils";


const score = new Score();
const lives = new Lives();

export default class extends Phaser.State {
  init() {
    this.consultantLoseLife = this.consultantLoseLife.bind(this);
  }

  preload() {

    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('ground_1x1');
    this.map.addTilesetImage('walls_1x2');
    this.map.addTilesetImage('tiles2');
    this.map.setCollisionBetween(1, 12);
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    this.layer.debugSettings.forceFullRedraw = true;
  }

  create() {
    this.consultant = new Consultant({
      game: this,
      x: 260,
      y: 100,
      asset: 'suit'
    });

    this.game.add.existing(this.consultant);

    createBanner(this);
    this.scoreText = this.add.text(this.world.centerX, this.game.height - 40, 'Score: ' + score.getScore());
    this.lifeText = this.add.text(this.world.centerX - 125, this.game.height - 40, 'Life: ' + lives.getLives());

    this.groups = {
      boss: this.game.add.group(),
      distractions: this.game.add.group(),
      kudos: this.game.add.group()
    };

    this.groups.boss.add(
        new HeavyLargeBall({
          game: this,
          x: this.world.centerX,
          y: this.world.centerY,
          asset: 'conf-call'
        })
    );

    // Add kudos
    const kudoPos = [
      {x: 120, y: 460}, {x: 130, y: 60},
      {x: 1053, y: 100}, {x: 1519, y: 60},
      {x: 286, y: 380}, {x: 569, y: 60},
      {x: 850, y: 510}, {x: 973, y: 415},
      {x: this.world.centerX + 80, y: this.world.centerY},
      {x: this.world.centerX + 500, y: this.world.centerY + 60},
      {x: this.world.centerX + 700, y: this.world.centerY + 140},
    ];

    kudoPos.forEach((pos) => {
      const newKudos = new Kudos({
        game: this,
        x: pos.x,
        y: pos.y,
      });
      this.groups.kudos.add(newKudos);
    });

    const distractionPos = [
      {x: 100, y: 400, speed: [110, 90]},
      {x: 768, y: 500},
      {x: 1275, y: 400, speed: [90, 90]},
    ];
    distractionPos.forEach((pos) => {
      const newDistraction = new StandardBall({
        game: this,
        speed: pos.speed ? pos.speed : [45, 45],
        x: pos.x,
        y: pos.y,
        asset: getRandomInt(0, 5) > 3 ? 'email' : 'phone'
      });
      this.groups.distractions.add(newDistraction);
    });

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }


  update() {

    if (this.checkWinCondition()) {
      this.state.start('Win');
    }

    this.game.physics.arcade.collide(this.layer, [this.consultant, this.groups.boss, this.groups.distractions]);
    this.game.physics.arcade.collide(this.consultant, [this.groups.distractions, this.groups.boss], this.consultantLoseLife);
    this.game.physics.arcade.overlap(this.consultant, this.groups.kudos, this.consultantHitKudos);

    this.consultant.body.velocity.y = frictionUtil(this.consultant.body.velocity.y, 3);
    this.consultant.body.velocity.x = frictionUtil(this.consultant.body.velocity.x, 20);
    if (this.cursors.up.isDown && (this.consultant.body.onFloor() || this.consultant.body.touching.down)) {
      this.consultant.body.velocity.y = -550;
    } else if (this.cursors.down.isDown) {
      this.consultant.body.velocity.y = 200;
    }

    if (this.cursors.right.isDown) {
      this.consultant.body.velocity.x = 200;
    } else if (this.cursors.left.isDown) {
      this.consultant.body.velocity.x = -200;
    }

    this.scoreText.setText('Score: ' + score.getScore());
    this.lifeText.setText('Life: ' + lives.getLives());

  }

  checkWinCondition() {
    return score.getScore() === this.groups.kudos.length * score.getIncrement();
  }

  consultantLoseLife(consultant, boss) {
    lives.loseLife();
    consultant.kill();
    if (lives.getLives() === 0) {
      this.state.start('Lose');
    } else {
      consultant.reset(260, 100)
    }
  }

  consultantHitKudos(consultant, kudos) {
    kudos.kill();
    score.incrementScore();
  };

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.consultant, 32, 32)
    }

  }
}
