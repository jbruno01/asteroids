(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

Asteroids.Asteroid = function(obj) {
  var COLOR = "#ccc";
  var RADIUS = 50;
  MovingObject.call(this, {
    color: COLOR,
    radius: RADIUS,
    pos: obj.pos,
    vel: Asteroids.Util.randomVec(10)
  });
};

Asteroids.Util.inherits(Asteroid, MovingObject);

})();
