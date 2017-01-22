/* globals __DEV__ */
import Phaser from "phaser";
import HUD from "../hud/HUD";
import createBanner from "../helpers/Banner";
import HeavyLargeBall from "../sprites/HeavyLargeBall";
import StandardBall from "../sprites/StandardBall";
import Consultant from "../sprites/Consultant";
import Kudos from "../sprites/Kudos";
import {frictionUtil, getRandomInt} from "../utils";


export default class extends Phaser.State {
  init() {
    this.player_startPos = {x: 260, y: 100};
    this.addLevelGroups = this.addLevelGroups.bind(this);
    this.checkWinCondition = this.checkWinCondition.bind(this);
    this.consultantHitKudos = this.consultantHitKudos.bind(this);
    this.consultantLoseLife = this.consultantLoseLife.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePhysics = this.handlePhysics.bind(this);
  }

  preload() {
    this.map = this.game.add.tilemap(this.state.levelManager.getCurrentLevel());
    this.map.addTilesetImage('ground_1x1');
    this.map.addTilesetImage('walls_1x2');
    this.map.addTilesetImage('tiles2');
    this.map.setCollisionBetween(0, 26);
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    this.layer.debugSettings.forceFullRedraw = true;

    createBanner(this);

    this.hud = new HUD(this);
  }

  create() {
    this.consultant = new Consultant({
      game: this,
      x: this.player_startPos.x,
      y: this.player_startPos.y,
      asset: 'suit'
    });

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

    const kudoPos = [
      {x: 90, y: 290}, {x: 120, y: 460}, {x: 130, y: 60},
      {x: 1053, y: 100}, {x: 1519, y: 60}, {x: 286, y: 380},
      {x: 569, y: 60}, {x: 830, y: 510}, {x: 973, y: 415},
      {x: this.world.centerX + 80, y: this.world.centerY},
      {x: this.world.centerX + 500, y: this.world.centerY + 60},
      {x: this.world.centerX + 700, y: this.world.centerY + 100},
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
  }

  handleInput() {
    // Apply some friction to the consultant - simulate accurate conditions :)
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
  }

  handlePhysics() {
    this.game.physics.arcade.collide(this.layer, [this.consultant, this.groups.boss, this.groups.distractions]);
    this.game.physics.arcade.collide(this.consultant, [this.groups.distractions, this.groups.boss], this.consultantLoseLife);
    this.game.physics.arcade.overlap(this.consultant, this.groups.kudos, this.consultantHitKudos);
  }

  checkWinCondition() {
    if (this.hud.getScore() === this.groups.kudos.length * this.hud.getIncrement()) {
      this.hud.setBestTime();
      this.state.start('Win');
    }
  }

  consultantLoseLife(consultant, boss) {
    this.hud.loseLife();
    consultant.kill();
    if (this.hud.getLives() <= 0) {
      this.state.start('Lose');
    } else {
      consultant.reset(this.player_startPos.x, this.player_startPos.y)
    }
  }

  consultantHitKudos(consultant, kudos) {
    kudos.kill();
    this.hud.incrementScore();
  };

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.consultant, 32, 32)
    }

  }
}
