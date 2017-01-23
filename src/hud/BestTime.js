export default class {
  constructor(window) {
    this.window = window;
  }

  getBestTime(level_name) {
    return this.window.localStorage.getItem(level_name);
  }

  setBestTime(level_name, time_seconds) {
    if (time_seconds < this.getBestTime(level_name) || this.getBestTime(level_name) === null) {
      this.window.localStorage.setItem(level_name, time_seconds);
    }
  }
}