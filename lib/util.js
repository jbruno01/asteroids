(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var util = Asteroids.Util = {};

util.inherits = function(ChildClass, ParentClass) {
  var Surrogate = function (){};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
};

util.randomVec = function(length) {
  var x = Math.random()*2 - 1;
  var y = Math.random()*2 - 1;
  // length == sqrt((x * degree)^2 + (y* degree)^2)
  var mult = length / Math.sqrt(x * x + y * y);
  return [Math.floor(x * mult), Math.floor(y * mult)];
};

util.norVector = function (vec) {
  var magnitude = Math.sqrt((vec[0] * vec[0]) + (vec[1] * vec[1]));
  var newX = vec[0] / magnitude;
  var newY = vec[1] / magnitude;
  return [newX, newY]
}

})();
