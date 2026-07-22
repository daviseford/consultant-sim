import Phaser from "phaser";
import EndScreen from "../helpers/EndScreen";

export default class extends Phaser.State {
  init(lose_text = 'You lose! Try again?') {
    this.lose_text = lose_text;
  }

  create() {
    const elapsed = this.game.time.totalElapsedSeconds().toFixed(3);

    this.endScreen = new EndScreen(this, {
      accent: 0xB84A2F,
      stamp: 'BENCHED',
      eyebrow: 'PERFORMANCE REVIEW',
      title: 'Back on the bench.',
      message: 'Three lives, zero utilization. The engagement is still salvageable.',
      primaryStat: {label: 'TIME ON ENGAGEMENT', value: `${elapsed}s`},
      secondaryStat: {label: 'OUTCOME', value: 'UNBILLABLE'},
      actionLabel: 'RETRY ENGAGEMENT  ↻',
      onAction: this.restartLevel
    });
  }

  update() {
    this.endScreen.update();
  }

  restartLevel() {
    this.game.time.reset();
    this.state.start(this.state.levelManager.getCurrentLevel());
  }

  shutdown() {
    if (this.endScreen) this.endScreen.destroy();
  }

}
