export default class {
  constructor(levels_array) {
    this.levels = levels_array;
    this.level_index = 0;
    this.current_level = this.levels[this.level_index];
  }

  getLevels() {
    return this.levels;
  }

  getFirstLevel() {
    return this.levels[0].name;
  }

  getCurrentLevel() {
    return this.current_level.name;
  }

  isGameOver() {
    return this.current_level.name === this.levels[this.levels.length - 1].name;
  }

  resetLevels() {
    this.level_index = 0;
    this.current_level = this.levels[this.level_index];
    return this.current_level.name;
  }

  toNextLevel() {
    this.level_index++;
    this.current_level = this.levels[this.level_index];
    return this.current_level.name;
  }

}