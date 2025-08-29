import { SerializableClass } from "../abstractions/mod.ts";
import { isObject } from "@online/is";
import { SERIALIZABLE_CLASSES } from "../singletons/mod.ts";

export function isSerializableClass(
  value: unknown,
): value is SerializableClass {
  return isObject(value) &&
    value instanceof SerializableClass &&
    SERIALIZABLE_CLASSES.has(value.constructor.name);
}
