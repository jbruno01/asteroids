(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var dir = Asteroids.Util.randomVec(1);

Asteroids.LittleStar = function(obj) {
  var COLOR = "white";
  var RADIUS = 2;
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    color: COLOR,
    radius: RADIUS,
    pos: obj.pos,
    vel: [dir[0] * .1, dir[1] * .1]
  });
};

Asteroids.MediumStar = function(obj) {
  var COLOR = "white";
  var RADIUS = 4;
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    color: COLOR,
    radius: RADIUS,
    pos: obj.pos,
    vel: [dir[0] * .2, dir[1] * .2]
  });
};

Asteroids.BigStar = function(obj) {
  var COLOR = "white";
  var RADIUS = 6;
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    color: COLOR,
    radius: RADIUS,
    pos: obj.pos,
    vel: [dir[0] * .6, dir[1] * .6]
  });
};

Asteroids.Util.inherits(Asteroids.LittleStar, Asteroids.MovingObject);
Asteroids.Util.inherits(Asteroids.MediumStar, Asteroids.MovingObject);
Asteroids.Util.inherits(Asteroids.BigStar, Asteroids.MovingObject);

})();
