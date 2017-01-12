export default function createBanner(state) {
  state.banner = state.add.text(state.world.centerX, state.game.height - 180, 'Consultant Simulator');
  state.banner.font = 'Bangers';
  state.banner.padding.set(10, 16);
  state.banner.fontSize = 40;
  state.banner.fill = '#77BFA3';
  state.banner.smoothed = false;
  state.banner.anchor.setTo(0.5);
}