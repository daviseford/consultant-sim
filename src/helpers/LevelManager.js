export default class {
  constructor(arr_of_level_names) {
    this.levels = arr_of_level_names;
    this.level_index = 0;
    this.current_level = this.levels[this.level_index];
  }

  getLevels() {
    return this.levels;
  }

  getFirstLevel() {
    return this.levels[0];
  }

  getCurrentLevel() {
    return this.current_level;
  }

  isGameOver() {
    return this.current_level === this.levels[this.levels.length - 1];
  }

  resetLevels() {
    this.level_index = 0;
    this.current_level = this.levels[this.level_index];
    return this.current_level;
  }

  toNextLevel() {
    this.level_index++;
    this.current_level = this.levels[this.level_index];
    return this.current_level;
  }

}