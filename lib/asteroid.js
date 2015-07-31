(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Asteroid = Asteroids.Asteroid = function(obj) {
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    color: obj.color,
    radius: obj.radius,
    pos: obj.pos,
    vel: Asteroids.Util.randomVec(2)
  });
};

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

Asteroid.prototype.split = function () {
  var asteroid = this;
  for(var i = 0; i < 2; i++) {
    this.game.asteroids.push( new Asteroids.Asteroid({
      pos: asteroid.pos,
      game: asteroid.game,
      radius: asteroid.radius / 2,
      vel: Asteroids.Util.randomVec(2),
      color: "orange"
    }))
  }
  this.game.remove(asteroid);
}


})();
