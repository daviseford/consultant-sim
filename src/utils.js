'use strict';
export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
};

/*
 Simulates a friction-like effect.
 Removes a certain amount of momentum per use.
 */
export const frictionUtil = (val, decrementer = 1) => {
  if (val === 0) return 0;
  if (val > 0) {
    return val - decrementer >= 0 ? val - decrementer : val - 1;
  }
  return val + decrementer <= 0 ? val + decrementer : val + 1;
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};