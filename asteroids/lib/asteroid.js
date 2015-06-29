var Asteroids = require('util');
var MovingObject = require('movingObject');

function Asteroid(pos) {
  this.COLOR = "#ccc";
  this.radius = 50;
  MovingObject.call(this, {color: this.COLOR, radius: this.radius, pos: pos })
};

Asteroids.Util.inherits(Asteroid, MovingObject);
