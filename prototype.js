Function.prototype.inherits = function (superClass) {
  var Surrogate = function (){};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
};


function MovingObject () {
  this.position = [x,y];
};
  MovingObject.prototype.move = function(){
    return "I'm moving! Wee!";
  };

function Ship () {
};
Ship.inherits(MovingObject);
  Ship.prototype.shoot = function(){
    return "Pew Pew.";
  };

function Asteroid () {
};
Asteroid.inherits(MovingObject);
  Asteroid.prototype.split = function(){
    return "Ouch."
  };
