export default class Lives {
  constructor(lives) {
    this.lives = lives;
  }

  getLives() {
    return this.lives;
  }

  addLife() {
    this.lives++;
  }

  loseLife() {
    this.lives--;
  }

}