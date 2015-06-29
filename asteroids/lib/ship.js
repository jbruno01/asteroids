(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var Ship = Asteroids.Ship = function(obj){
  var RADIUS = 10;
  var COLOR = "#F00";
  var VEL = [0,0];
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    color: COLOR,
    radius: RADIUS,
    pos: obj.game.randomPosition(),
    vel: VEL
  });
};

Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

Ship.prototype.relocate = function () {
  this.vel = [0,0];
  this.pos = this.game.randomPosition();
};

})();
