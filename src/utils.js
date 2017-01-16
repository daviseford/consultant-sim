'use strict';
export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
};

export const frictionUtil = (val, std_decrementer = 1) => {
  if (val === 0) return 0;
  if (val > 0) {
    return val - std_decrementer >= 0 ? val - std_decrementer : val - 1;
  }
  return val + std_decrementer <= 0 ? val + std_decrementer : val + 1;
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};