export default class Score {
  constructor() {
    this.score = 0;
    this.incrementer = 5;
  }

  getScore() {
    return this.score;
  }

  getIncrement() {
    return this.incrementer;
  }

  incrementScore() {
    this.score += this.incrementer;
    return this.score;
  }
}