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

Ship.prototype.power = function(impulse) {
  var newVel = this.game.maxSpeed(
    (this.vel[0] + impulse[0]),
    (this.vel[1] + impulse[1])
  );
  this.vel[0] = newVel[0];
  this.vel[1] = newVel[1];
};

Ship.prototype.fireBullet = function () {
  this.game.bullets.push(new Asteroids.Bullet({
    pos: this.pos,
    vel: [(this.vel[0] * 2), (this.vel[1] * 2)],
    game: this.game
  }));
  if(this.game.bullets.length > 6){
    this.game.bullets.shift();
  };
};

})();
