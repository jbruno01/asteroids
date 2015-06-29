(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function() {
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 20;
  this.addAsteroids();
  this.ship = new Asteroids.Ship({game: this});
};

Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++ ){
    this.asteroids.push(new Asteroids.Asteroid({
      pos: this.randomPosition(),
      game: this
    }));
  };
};

Game.prototype.randomPosition = function() {
  return [(Math.random() * this.DIM_X), (Math.random() * this.DIM_Y)];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach(function(piece) {
    piece.draw(ctx);
  });
};

Game.prototype.moveObjects = function(){
  this.allObjects().forEach(function(piece) {
    piece.move();
  });
};

Game.prototype.render = function(ctx){
  this.step();
  this.draw(ctx);
};

Game.prototype.wrap = function(pos) {
  var wrapX = pos[0];
  var wrapY = pos[1];
  if(wrapX > 800){
    wrapX -= 800;
  };
  if(wrapX < 0) {
    wrapX += 800;
  };
  if(wrapY > 800){
    wrapY -= 800;
  };
  if(wrapY < 0){
    wrapY += 800;
  };
  return [wrapX, wrapY]
};

Game.prototype.checkCollisions = function() {
  var asteroids = this.asteroids;
  // var toBeRemoved = []
  for (var i = 0; i < asteroids.length - 1; i++ ){
    // for (var j = i + 1; j < asteroids.length; j++) {
    //   if (asteroids[i].isCollidedWith(asteroids[j])) {
    //     toBeRemoved.push(i);
    //     toBeRemoved.push(j);
    //   };
    // };
    if(asteroids[i].isCollidedWith(this.ship)){
      this.ship.relocate();
    };
  };
  // this.remove(toBeRemoved)
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(removeArray) {
  var game = this;
  removeArray.forEach(function(index){
    game.asteroids[index] = null;
  })
  var newAsteroids = [];
  game.asteroids.forEach(function(asteroid){
    if (asteroid !== null) {
      newAsteroids.push(asteroid);
    };
  });
  game.asteroids = newAsteroids;
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship);
};


})();
