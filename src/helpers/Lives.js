export default class Lives {
  constructor() {
    this.lives = 3;
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