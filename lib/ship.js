(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var Ship = Asteroids.Ship = function(obj){
  var RADIUS = 35;
  // var COLOR = "#F00";
  var VEL = [0,0];
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    // color: COLOR,
    radius: RADIUS,
    pos: obj.game.randomPosition(),
    vel: VEL,
  });
};

Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

var newImage = new Image();
newImage.src = './assets/ufo.png';
Ship.sprite = newImage;

Ship.prototype.draw = function(ctx) {
  var sprite, height, width;
  sprite = Ship.sprite;
  height = 100;
  width = 100;
  ctx.drawImage(
    sprite, 0, 0, height, width,
    this.pos[0] - this.radius,
    this.pos[1] - this.radius,
    this.radius * 2,
    this.radius * 2
  );
}

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

Ship.prototype.setLastDirection = function () {
  if(this.vel[0] !== 0 || this.vel[1] !== 0){
    this.lastDirection = Asteroids.Util.norVector(this.vel)
  } else if (!this.lastDirection) {
    this.lastDirection = [1,0]
  };
}

Ship.prototype.fireBullet = function () {
  this.game.bullets.push(new Asteroids.Bullet({
    pos: this.pos,
    vel: [this.lastDirection[0] * 15, this.lastDirection[1] * 15],
    game: this.game
  }));
  if(this.game.bullets.length > 8){
    this.game.bullets.shift();
  };
};

})();
