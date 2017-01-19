export default class HighScore {
  constructor(window) {
    this.window = window;
  }

  getHighScore(level_name) {
    return this.window.localStorage.getItem(level_name);
  }

  setHighScore(level_name, time_seconds) {
    if (time_seconds < this.getHighScore(level_name) || this.getHighScore(level_name) === null) {
      this.window.localStorage.setItem(level_name, time_seconds);
    }
  }
}