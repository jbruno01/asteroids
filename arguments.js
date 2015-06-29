function sum() {
  var args = Array.prototype.slice.call(arguments);
  var sum = 0;
  args.forEach(function(element) {
    sum += element;
  });
  return sum;
}

Function.prototype.myBind = function (obj) {
  var fn = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments);
    return fn.apply(obj, args.concat(innerArgs));
  };
};

function curriedSum(numArgs){
  var numbers = [];
  function _curriedSum (num){
    numbers.push(num);
    if(numbers.length === numArgs){
      var sum = 0;
      numbers.forEach(function(el){
        sum += el;
      });
      return sum;
    } else {
      return _curriedSum;
    };
  };
  return _curriedSum;
};

Function.prototype.curry = function (numArgs) {
  var fn = this;
  var totalArgs = [];
  function _curry (arg) {
    totalArgs.push(arg);
    if (totalArgs.length === numArgs) {
      return fn.apply(null, totalArgs);
    } else {
      return _curry;
    };
  };
  return _curry;
};
