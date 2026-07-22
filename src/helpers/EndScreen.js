import Phaser from "phaser";

const COLORS = {
  ink: 0x24211F,
  paper: 0xEDEEC9,
  panel: 0xF7F1D6,
  mint: 0x77BFA3
};

const TEXT_COLORS = {
  ink: '#24211F',
  paper: '#EDEEC9',
  muted: '#625B4D'
};

export default class EndScreen {
  constructor(state, options) {
    this.state = state;
    this.options = options;
    this.activated = false;

    this.state.game.touchControls.setVisible(false);
    this.create();
  }

  create() {
    this.background = this.state.add.graphics(0, 0);
    this.button = this.state.add.graphics(0, 0);

    this.brand = this.addText('CONSULTANT SIM / RESULTS', 18, TEXT_COLORS.paper, 'bold');
    this.stamp = this.addText(this.options.stamp, 19, TEXT_COLORS.ink, 'bold');
    this.eyebrow = this.addText(this.options.eyebrow, 18, TEXT_COLORS.muted, 'bold');
    this.title = this.addText(this.options.title, 58, TEXT_COLORS.ink, 'bold');
    this.message = this.addText(this.options.message, 22, TEXT_COLORS.muted);
    this.primaryLabel = this.addText(this.options.primaryStat.label, 16, TEXT_COLORS.muted, 'bold');
    this.primaryValue = this.addText(this.options.primaryStat.value, 44, TEXT_COLORS.ink, 'bold');
    this.secondaryLabel = this.addText(this.options.secondaryStat.label, 16, TEXT_COLORS.muted, 'bold');
    this.secondaryValue = this.addText(this.options.secondaryStat.value, 30, TEXT_COLORS.ink, 'bold');
    this.buttonLabel = this.addText(this.options.actionLabel, 21, TEXT_COLORS.paper, 'bold');
    this.hint = this.addText('ENTER / SPACE / TAP', 14, TEXT_COLORS.muted, 'bold');

    this.stamp.anchor.setTo(0.5);
    this.buttonLabel.anchor.setTo(0.5);
    this.hint.anchor.setTo(0.5);

    this.button.inputEnabled = true;
    this.button.input.useHandCursor = true;
    this.button.events.onInputOver.add(() => { this.button.alpha = 0.86; });
    this.button.events.onInputOut.add(() => { this.button.alpha = 1; });
    this.button.events.onInputDown.add(this.activate, this);

    this.enterKey = this.state.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.spaceKey = this.state.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.enterKey.onDown.add(this.activate, this);
    this.spaceKey.onDown.add(this.activate, this);

    this.layout();
  }

  addText(text, size, fill, weight = 'normal') {
    return this.state.add.text(0, 0, text, {
      font: `${weight} ${size}px "Trebuchet MS"`,
      fill: fill
    });
  }

  layout() {
    const width = this.state.game.width;
    const height = this.state.game.height;
    const contentWidth = Math.min(760, width - 96);
    const left = (width - contentWidth) / 2;
    const statSplit = left + Math.floor(contentWidth * 0.62);
    const buttonWidth = Math.min(390, contentWidth);

    this.lastWidth = width;
    this.lastHeight = height;

    this.background.clear();
    this.background.beginFill(COLORS.paper);
    this.background.drawRect(0, 0, width, height);
    this.background.beginFill(COLORS.ink);
    this.background.drawRect(0, 0, width, 118);
    this.background.beginFill(this.options.accent);
    this.background.drawRect(0, 112, width, 6);
    this.background.drawRect(width - 224, 0, 224, 112);
    this.background.beginFill(COLORS.panel);
    this.background.lineStyle(3, COLORS.ink, 1);
    this.background.drawRect(left, 330, contentWidth, 144);
    this.background.moveTo(statSplit, 350);
    this.background.lineTo(statSplit, 454);
    this.background.endFill();

    this.button.clear();
    this.button.beginFill(COLORS.ink);
    this.button.drawRect(0, 0, buttonWidth, 72);
    this.button.endFill();
    this.button.x = left;
    this.button.y = 520;
    this.button.hitArea = new Phaser.Rectangle(0, 0, buttonWidth, 72);

    this.brand.x = 34;
    this.brand.y = 48;
    this.stamp.x = width - 112;
    this.stamp.y = 56;
    this.eyebrow.x = left;
    this.eyebrow.y = 154;
    this.title.x = left;
    this.title.y = 184;
    this.message.x = left;
    this.message.y = 267;
    this.message.wordWrap = true;
    this.message.wordWrapWidth = contentWidth;
    this.primaryLabel.x = left + 28;
    this.primaryLabel.y = 350;
    this.primaryValue.x = left + 28;
    this.primaryValue.y = 378;
    this.secondaryLabel.x = statSplit + 28;
    this.secondaryLabel.y = 350;
    this.secondaryValue.x = statSplit + 28;
    this.secondaryValue.y = 389;
    this.buttonLabel.x = left + buttonWidth / 2;
    this.buttonLabel.y = 556;
    this.hint.x = left + buttonWidth / 2;
    this.hint.y = 615;
  }

  update() {
    if (this.lastWidth !== this.state.game.width || this.lastHeight !== this.state.game.height) {
      this.layout();
    }
  }

  activate() {
    if (this.activated) return;

    this.activated = true;
    this.state.game.touchControls.setVisible(true);
    this.options.onAction.call(this.state);
  }

  destroy() {
    this.enterKey.onDown.remove(this.activate, this);
    this.spaceKey.onDown.remove(this.activate, this);
  }
}
