import { assertEquals } from "https://deno.land/std@0.186.0/testing/asserts.ts";
import { isClassConstructor } from "../src/validators/is-class-constructor.validator.ts";

Deno.test("isClassConstructor should return true for native class constructors", () => {
  assertEquals(isClassConstructor(Object), true);
  assertEquals(isClassConstructor(Array), true);
  assertEquals(isClassConstructor(String), true);
  assertEquals(isClassConstructor(Number), true);
  assertEquals(isClassConstructor(Boolean), true);
  assertEquals(isClassConstructor(Function), true);
  assertEquals(isClassConstructor(Date), true);
  assertEquals(isClassConstructor(RegExp), true);
  assertEquals(isClassConstructor(Map), true);
  assertEquals(isClassConstructor(Set), true);
  assertEquals(isClassConstructor(Promise), true);
  assertEquals(isClassConstructor(Error), true);
  assertEquals(isClassConstructor(Int8Array), true);
  assertEquals(isClassConstructor(Uint8Array), true);
  assertEquals(isClassConstructor(Uint8ClampedArray), true);
  assertEquals(isClassConstructor(Int16Array), true);
  assertEquals(isClassConstructor(Uint16Array), true);
  assertEquals(isClassConstructor(Int32Array), true);
  assertEquals(isClassConstructor(Uint32Array), true);
  assertEquals(isClassConstructor(Float32Array), true);
  assertEquals(isClassConstructor(Float64Array), true);
  assertEquals(isClassConstructor(BigInt64Array), true);
  assertEquals(isClassConstructor(BigUint64Array), true);
  assertEquals(isClassConstructor(ArrayBuffer), true);
  assertEquals(isClassConstructor(SharedArrayBuffer), true);
  assertEquals(isClassConstructor(DataView), true);
  assertEquals(isClassConstructor(WeakMap), true);
  assertEquals(isClassConstructor(WeakSet), true);
  assertEquals(isClassConstructor(URL), true);
  assertEquals(isClassConstructor(URLSearchParams), true);
  assertEquals(isClassConstructor(TextEncoder), true);
  assertEquals(isClassConstructor(TextDecoder), true);
  assertEquals(isClassConstructor(Event), true);
  assertEquals(isClassConstructor(EventTarget), true);
});

Deno.test("isClassConstructor should return true for custom class constructors", () => {
  class MyClass {}
  assertEquals(isClassConstructor(MyClass), true);

  class AnotherClass extends MyClass {}
  assertEquals(isClassConstructor(AnotherClass), true);
});

Deno.test("isClassConstructor should return false for regular functions", () => {
  function myFunction() {}
  assertEquals(isClassConstructor(myFunction), false);
});

Deno.test("isClassConstructor should return false for arrow functions", () => {
  const myArrowFunction = () => {};
  assertEquals(isClassConstructor(myArrowFunction), false);
});

Deno.test("isClassConstructor should return false for primitive values", () => {
  assertEquals(isClassConstructor("hello"), false);
  assertEquals(isClassConstructor(123), false);
  assertEquals(isClassConstructor(true), false);
  assertEquals(isClassConstructor(Symbol("sym")), false);
  assertEquals(isClassConstructor(123n), false);
});

Deno.test("isClassConstructor should return false for null and undefined", () => {
  assertEquals(isClassConstructor(null), false);
  assertEquals(isClassConstructor(undefined), false);
});

Deno.test("isClassConstructor should return false for plain objects", () => {
  assertEquals(isClassConstructor({}), false);
  assertEquals(isClassConstructor({ a: 1 }), false);
});

Deno.test("isClassConstructor should return false for arrays", () => {
  assertEquals(isClassConstructor([]), false);
  assertEquals(isClassConstructor([1, 2, 3]), false);
});

Deno.test("isClassConstructor should return false for instances of classes", () => {
  class MyClass {}
  const instance = new MyClass();
  assertEquals(isClassConstructor(instance), false);
  assertEquals(isClassConstructor(new Object()), false);
  assertEquals(isClassConstructor(new Array()), false);
});
