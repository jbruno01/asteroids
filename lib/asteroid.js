(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Asteroid = Asteroids.Asteroid = function(obj) {
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    // color: obj.color,
    radius: obj.radius,
    pos: obj.pos,
    vel: Asteroids.Util.randomVec(2)
  });
};

var newImage = new Image();
newImage.src = './assets/asteroid_blue.png';
Asteroid.sprite = newImage;

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);


Asteroid.prototype.split = function () {
  var asteroid = this;
  for(var i = 0; i < 2; i++) {
    this.game.asteroids.push( new Asteroids.Asteroid({
      pos: asteroid.pos,
      game: asteroid.game,
      radius: asteroid.radius / 2,
      vel: Asteroids.Util.randomVec(4),
      // color: "orange"
    }))
  }
  this.game.remove(asteroid);
}


Asteroid.prototype.draw = function (ctx) {
  var sprite, height, width;
  sprite = Asteroid.sprite;
  height = 90;
  width = 90;
  ctx.drawImage(
    sprite, 0, 0, height, width,
    this.pos[0] - this.radius,
    this.pos[1] - this.radius,
    this.radius * 2,
    this.radius * 2
  );
}

})();
