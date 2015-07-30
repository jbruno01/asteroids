(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

Asteroids.Asteroid = function(obj) {
  var COLOR = "green";
  var RADIUS = 50;
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    color: COLOR,
    radius: RADIUS,
    pos: obj.pos,
    vel: Asteroids.Util.randomVec(3)
  });
};

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

})();
