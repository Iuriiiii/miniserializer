import { assert, assertEquals, assertStrictEquals } from "@std/assert";
import { deserialize, serialize } from "../mod.ts";

Deno.test("serialize and deserialize should handle Date objects", () => {
  const originalDate = new Date();
  const serialized = serialize(originalDate);
  const deserialized = deserialize<Date>(serialized);
  assertEquals(deserialized.getTime(), originalDate.getTime());
  assert(deserialized instanceof Date);
});

Deno.test("serialize and deserialize should handle Map objects", () => {
  const originalMap = new Map<string, unknown>();
  originalMap.set("key1", "value1");
  originalMap.set("key2", 123);
  originalMap.set("key3", true);
  originalMap.set("key4", new Date());

  const serialized = serialize(originalMap);
  const deserialized = deserialize<Map<string, unknown>>(serialized);

  assert(deserialized instanceof Map);
  assertEquals(deserialized.size, originalMap.size);
  assertEquals(deserialized.get("key1"), originalMap.get("key1"));
  assertEquals(deserialized.get("key2"), originalMap.get("key2"));
  assertEquals(deserialized.get("key3"), originalMap.get("key3"));
  assertEquals((deserialized.get("key4") as Date).getTime(), (originalMap.get("key4") as Date).getTime());
});

Deno.test("serialize and deserialize should handle Set objects", () => {
  const originalSet = new Set<unknown>();
  originalSet.add("value1");
  originalSet.add(123);
  originalSet.add(true);
  originalSet.add(new Date());

  const serialized = serialize(originalSet);
  const deserialized = deserialize<Set<unknown>>(serialized);

  assert(deserialized instanceof Set);
  assertEquals(deserialized.size, originalSet.size);
  assert(deserialized.has("value1"));
  assert(deserialized.has(123));
  assert(deserialized.has(true));
  assert(
    Array.from(deserialized).some((item) =>
      item instanceof Date &&
      (item as Date).getTime() === (Array.from(originalSet).find((item) => item instanceof Date) as Date).getTime()
    ),
  );
});

Deno.test("serialize and deserialize should handle RegExp objects", () => {
  const originalRegExp = /ab+c/i;
  const serialized = serialize(originalRegExp);
  const deserialized = deserialize<RegExp>(serialized);
  assert(deserialized instanceof RegExp);
  assertEquals(deserialized.source, originalRegExp.source);
  assertEquals(deserialized.flags, originalRegExp.flags);
});

Deno.test("serialize and deserialize should handle BigInt objects", () => {
  const originalBigInt = 1234567890120n;
  const serialized = serialize(originalBigInt);
  const deserialized = deserialize<bigint>(serialized);
  assertEquals(deserialized, originalBigInt);
  assertStrictEquals(typeof deserialized, "bigint");
});

Deno.test("serialize and deserialize should handle Uint8Array objects", () => {
  const originalUint8Array = new Uint8Array([1, 2, 3, 255, 0, 128]);
  const serialized = serialize(originalUint8Array);
  const deserialized = deserialize<Uint8Array>(serialized);
  assert(deserialized instanceof Uint8Array);
  assertEquals(deserialized.length, originalUint8Array.length);
  for (let i = 0; i < originalUint8Array.length; i++) {
    assertEquals(deserialized[i], originalUint8Array[i]);
  }
});

Deno.test("serialize and deserialize should handle Error objects", () => {
  const originalError = new Error("Test error message");
  originalError.name = "CustomError";
  originalError.stack = "Custom stack trace\n    at someFunction (file.ts:1:1)"; // Simulate a stack trace
  const serialized = serialize(originalError);
  const deserialized = deserialize<Error>(serialized);
  assert(deserialized instanceof Error);
  assertEquals(deserialized.name, originalError.name);
  assertEquals(deserialized.message, originalError.message);
  assertEquals(deserialized.stack, originalError.stack);
});

Deno.test("serialize and deserialize should handle URL objects", () => {
  const originalURL = new URL("https://example.com/path?query=string#hash");
  const serialized = serialize(originalURL);
  const deserialized = deserialize<URL>(serialized);
  assert(deserialized instanceof URL);
  assertEquals(deserialized.href, originalURL.href);
});
