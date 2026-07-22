import Phaser from "phaser";
import EndScreen from "../helpers/EndScreen";

export default class extends Phaser.State {
  init(win_text = 'You win... this time.') {
    this.game_over = this.state.levelManager.isGameOver();
    this.win_text = this.game_over ? 'You beat the game!' : win_text;
  }

  create() {
    const elapsed = this.game.time.totalElapsedSeconds().toFixed(3);
    const best = window.localStorage.getItem(this.state.levelManager.getCurrentLevel());

    this.endScreen = new EndScreen(this, {
      accent: 0xF28C28,
      stamp: this.game_over ? 'PROMOTED' : 'SIGNED OFF',
      eyebrow: this.game_over ? 'FINAL ENGAGEMENT CLOSED' : 'ENGAGEMENT COMPLETE',
      title: this.game_over ? 'Made partner.' : 'Client satisfied.',
      message: this.game_over
        ? 'Every client survived. Somehow. Your calendar is finally clear.'
        : 'Kudos collected, deliverable accepted, calendar still completely full.',
      primaryStat: {label: 'DELIVERY TIME', value: `${elapsed}s`},
      secondaryStat: {label: 'PERSONAL BEST', value: best ? `${best}s` : 'N/A'},
      actionLabel: this.game_over ? 'PLAY AGAIN  ↻' : 'NEXT ENGAGEMENT  →',
      onAction: this.actionOnClick
    });
  }

  update() {
    this.endScreen.update();
  }

  actionOnClick() {
    const lvlName = this.game_over ? this.state.levelManager.resetLevels() : this.state.levelManager.toNextLevel();
    this.game.time.reset();
    this.state.start(lvlName);
  }

  shutdown() {
    if (this.endScreen) this.endScreen.destroy();
  }

}
