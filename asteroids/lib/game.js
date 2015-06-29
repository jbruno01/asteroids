(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

Asteroids.Game = function() {
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 25;
  this.addAsteroids();
};

Asteroids.Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++ ){
    this.asteroids.push(new Asteroids.Asteroid({pos: this.randomPosition()}));
  };
};

Asteroids.Game.prototype.randomPosition = function() {
  return [(Math.random() * this.DIM_X), (Math.random() * this.DIM_Y)];
};

Asteroids.Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach(function(asteroid) {
    asteroid.draw(ctx);
  });
};

Asteroids.Game.prototype.moveObjects = function(){
  this.asteroids.forEach(function(asteroid) {
    asteroid.move();
  });
};

Asteroids.Game.prototype.render = function(ctx){
  this.moveObjects();
  this.draw(ctx);
};

})();
