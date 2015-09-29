import expect from "expect";
import { add2, add3, Just, Maybe, Nothing } from "../src";

describe("values", () => {
  it("should apply a function to a value", () => {
    let value = 2;
    let fn = add3;

    expect(fn(value)).toEqual(5);
  });
});

describe("a container", () => {
  it("is not the same as a value", () => {
    let value = 2;
    let container = Just(2);

    expect(value).toNotEqual(container);
  });

  it("can't be applied a normal function", () => {
    let container = Just(2);
    let fn = add3;

    expect(add3(container)).toNotEqual(5);
  });
});

describe("a functor", () => {
  it("can be mapped over", () => {
    var functor = Just(2);

    expect(typeof functor.map).toEqual("function");
  });

  describe("map", () => {
    it("can apply functions to containers", () => {
      var container = Just(2);

      expect(container.map(add3)).toEqual(Just(5));
    });

    it("takes a function like add3, and a functor like Just(2) and returns a new functor like Just 5", () => {
      
    });
  });

  describe("maybe", () => {
    it("should apply the fn to the container if it is existy", () => {
      var container = Maybe(2);

      expect(container.map(add3).map(add3)).toEqual(Just(8));
    });

    it("should return Nothing if it is not existy", () => {
      var container = Maybe(undefined);

      expect(container.map(add3).map(add3)).toEqual(Nothing());
    });
  });

  describe("a function", () => {
    it("is a functor, and mapping means function composition", () => {
      expect(add2.map(add3)(7)).toEqual(12);
    });
  });

  describe("applicative", () => {
    it("knows how to apply a function wrapped in a context to a value wrapped in a context", () => {
      let valueWrappedInAContext = Just(2);
      let fnWrappedInAContext = Just(add3);

      expect(fnWrappedInAContext.lift(valueWrappedInAContext)).toEqual(Just(5));
    });
  });
});