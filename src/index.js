// http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html#just-what-is-a-functor-really

export let add2 = x => x + 2;
export let add3 = x => x + 3;

let exists = x => x !== null && x !== undefined;

let _Maybe = x => exists(x) ? Just(x) : Nothing();

let _Just = function (x) {
  this.val = x;
};

_Just.prototype = Object.create(_Maybe.prototype);
_Just.prototype.map = function (fn) {
  return Just(fn(this.val));
};

_Just.prototype.lift = function (x) {
  return Just(this.val(x.val));
};

let _Nothing = function () {};
_Nothing.prototype = Object.create(_Maybe.prototype);
_Nothing.prototype.map = function (fn) {
  return Nothing();
};

export let Nothing = function () { return new _Nothing() };
export let Just = function (x) { return new _Just(x) };

export let Maybe = _Maybe;

Function.prototype.map = function (fn) {
  var fn2 = this;
  return function (x) {
    return fn2(fn(x));
  };
};









