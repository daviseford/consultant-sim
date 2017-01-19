/* globals __DEV__ */
import Phaser from "phaser";
import Score from "../../helpers/Score";
import Lives from "../../helpers/Lives";
import HUD from "../../helpers/HUD";
import BestTime from "../../helpers/BestTime";
import Consultant from "../../sprites/Consultant";
import Promotion from "../../sprites/Promotion";
import Kudos from "../../sprites/Kudos";
import {frictionUtil} from "../../utils";


export default class extends Phaser.State {
  init() {
    this.best_time = new BestTime(window);
    this.level_name = 'level3';
    this.lives = new Lives(4);
    this.player_startPos = {x: 215, y: 20};
    this.scorer = new Score();
    this.addLevelGroups = this.addLevelGroups.bind(this);
    this.checkWinCondition = this.checkWinCondition.bind(this);
    this.consultantHitKudos = this.consultantHitKudos.bind(this);
    this.consultantLoseLife = this.consultantLoseLife.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePhysics = this.handlePhysics.bind(this);
    this.getTime = this.getTime.bind(this);
    this.winLevel = this.winLevel.bind(this);
    this.addKudos = this.addKudos.bind(this);
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
      kudos: this.game.add.group(),
      promotions: this.game.add.group(),
    };

    this.groups.promotions.add(new Promotion({
      game: this,
      x: 1060,
      y: 600,
    }));
    this.addKudos();
  }

  addKudos() {
    const kudoPos = [
      {x: 910, y: 630}, {x: 700, y: 630}, {x: 500, y: 630},
      {x: 1060, y: 500}, {x: 500, y: 60}, {x: 340, y: 200},
    ];
    kudoPos.forEach((pos) => {
      const newKudos = new Kudos({
        game: this,
        x: pos.x,
        y: pos.y,
      });
      this.groups.kudos.add(newKudos);
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
    this.game.physics.arcade.collide(this.layer, [this.consultant]);
    this.game.physics.arcade.overlap(this.consultant, this.groups.kudos, this.consultantHitKudos);
    this.game.physics.arcade.overlap(this.consultant, this.groups.promotions, this.winLevel);
  }

  checkWinCondition() {
    if (this.scorer.getScore() === this.groups.kudos.length * this.scorer.getIncrement()) {
      this.winLevel();
    }
  }

  winLevel() {
    this.best_time.setHighScore(this.level_name, this.getTime());
    this.state.start('Level3_Win');
  }

  getTime() {
    return this.game.time.totalElapsedSeconds().toFixed(3);
  }

  consultantLoseLife(consultant, boss) {
    this.lives.loseLife();
    consultant.kill();
    if (this.lives.getLives() <= 0) {
      this.state.start('Level3_Lose');
    } else {
      this.groups.kudos.forEachDead((x) => x.kill());
      this.addKudos();
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
