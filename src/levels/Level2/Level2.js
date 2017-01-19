/* globals __DEV__ */
import Phaser from "phaser";
import Score from "../../helpers/Score";
import Lives from "../../helpers/Lives";
import HUD from "../../helpers/HUD";
import BestTime from "../../helpers/BestTime";
import HeavyLargeBall from "../../sprites/HeavyLargeBall";
import StandardBall from "../../sprites/StandardBall";
import Consultant from "../../sprites/Consultant";
import Kudos from "../../sprites/Kudos";
import {frictionUtil, getRandomInt} from "../../utils";


export default class extends Phaser.State {
  init() {
    this.best_time = new BestTime(window);
    this.level_name = 'level2';
    this.lives = new Lives(4);
    this.player_startPos = {x: 260, y: 100};
    this.scorer = new Score();
    this.addLevelGroups = this.addLevelGroups.bind(this);
    this.checkWinCondition = this.checkWinCondition.bind(this);
    this.consultantHitKudos = this.consultantHitKudos.bind(this);
    this.consultantLoseLife = this.consultantLoseLife.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePhysics = this.handlePhysics.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  preload() {
    this.map = this.game.add.tilemap(this.level_name);
    this.map.addTilesetImage('ground_1x1');
    this.map.addTilesetImage('walls_1x2');
    this.map.addTilesetImage('tiles2');
    this.map.setCollisionBetween(0, 26);
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    this.layer.debugSettings.forceFullRedraw = true;

    this.hud = new HUD(this);
  }

  create() {
    this.consultant = new Consultant({
      game: this,
      x: this.player_startPos.x,
      y: this.player_startPos.y,
      asset: 'suit'
    });
    //  By default the Signal is empty, so we create it here:
    this.consultant.body.onWorldBounds = new Phaser.Signal();

    //  And then listen for it
    this.consultant.body.onWorldBounds.add(this.consultantLoseLife, this);

    this.game.add.existing(this.consultant);
    this.addLevelGroups();

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }


  update() {
    this.checkWinCondition();
    this.handlePhysics();
    this.handleInput();
    this.hud.updateHUD();
  }

  addLevelGroups() {
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

    this.groups.boss.add(
        new HeavyLargeBall({
          game: this,
          x: 2001,
          y: 450,
          asset: 'conf-call'
        })
    );

    const kudoPos = [
      {x: 520, y: 450}, {x: 2065, y: 640}, {x: 2505, y: 264},
      {x: 2930, y: 540}, {x: 3100, y: 60}, {x: 2700, y: 250},
      {x: 2350, y: 190}, {x: 2350, y: 460}, {x: 2100, y: 100},
      {x: 1649, y: 562}, {x: 1673, y: 393}, {x: 2100, y: 420},
      {x: 60, y: 570}, {x: 445, y: 545}, {x: 1055, y: 160},
      {x: 90, y: 290}, {x: 120, y: 460}, {x: 130, y: 60},
      {x: 1053, y: 60}, {x: 1588, y: 195}, {x: 286, y: 380},
      {x: 569, y: 60}, {x: 850, y: 510}, {x: 973, y: 415},
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
      {x: 2108, y: 100, speed: [120, 20]},
      {x: 900, y: 500},
      {x: 1275, y: 400, speed: [90, 90]},
      {x: 2200, y: 400, speed: [21, 82]},
      {x: 2121, y: 600, speed: [200, -200]},
    ];
    distractionPos.forEach((pos) => {
      const newDistraction = new StandardBall({
        game: this,
        speed: pos.speed ? pos.speed : [75, 45],
        x: pos.x,
        y: pos.y,
        asset: getRandomInt(0, 5) > 3 ? 'email' : 'phone'
      });
      this.groups.distractions.add(newDistraction);
    });
  }

  handleInput() {
    // Apply some friction to the consultant - simulate accurate conditions :)
    this.consultant.body.velocity.y = frictionUtil(this.consultant.body.velocity.y, 3);
    this.consultant.body.velocity.x = frictionUtil(this.consultant.body.velocity.x, 20);

    if (this.cursors.up.isDown && (this.consultant.body.onFloor() || this.consultant.body.touching.down)) {
      this.consultant.body.velocity.y = -550;
    } else if (this.cursors.down.isDown && this.consultant.body.velocity.y <= 200) {
      this.consultant.body.velocity.y = 200;
    }

    if (this.cursors.right.isDown) {
      this.consultant.body.velocity.x = 200;
    } else if (this.cursors.left.isDown) {
      this.consultant.body.velocity.x = -200;
    }
  }

  handlePhysics() {
    this.game.physics.arcade.collide(this.layer, [this.consultant, this.groups.boss, this.groups.distractions]);
    this.game.physics.arcade.collide(this.consultant, [this.groups.distractions, this.groups.boss], this.consultantLoseLife);
    this.game.physics.arcade.overlap(this.consultant, this.groups.kudos, this.consultantHitKudos);
  }

  checkWinCondition() {
    if (this.scorer.getScore() === this.groups.kudos.length * this.scorer.getIncrement()) {
      this.best_time.setHighScore(this.level_name, this.getTime());
      this.state.start('Level2_Win');
    }
  }

  getTime() {
    return this.game.time.totalElapsedSeconds().toFixed(3);
  }

  consultantLoseLife(consultant, boss) {
    this.lives.loseLife();
    consultant.kill();
    if (this.lives.getLives() <= 0) {
      this.state.start('Level2_Lose');
    } else {
      consultant.reset(this.player_startPos.x, this.player_startPos.y)
    }
  }

  consultantHitKudos(consultant, kudos) {
    kudos.kill();
    this.scorer.incrementScore();
  };

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.consultant, 32, 32)
    }

  }
}
