(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };
  var Bullet = Asteroids.Bullet = function (obj) {
    var RADIUS = 3;
    var COLOR = "#00F";
    Asteroids.MovingObject.call(this, {
      game: obj.game,
      radius: RADIUS,
      color: COLOR,
      pos: obj.pos,
      vel: obj.vel
    })
  };


  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  })();
