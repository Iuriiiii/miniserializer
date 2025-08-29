import type { DeserializeOptions, SerializedClass } from "../interfaces/mod.ts";
import type { UnsafeAny } from "../types/mod.ts";
import { getClassConstructor } from "../utils/mod.ts";
import { objectDeserializer } from "./object.deserializer.ts";
import { assert } from "@std/assert";

export function classDeserializer(options: DeserializeOptions) {
  const { stack } = options;

  stack.popOpcode();

  const className = stack.popString()!;
  const classConstructor = getClassConstructor(className);

  assert(
    classConstructor,
    `The class "${className}" is not registered.`,
  );

  const body = objectDeserializer(options) as unknown as SerializedClass<
    UnsafeAny
  >;

  const clazzInstance = new classConstructor(
    ...body.arguments,
  );

  return Object.assign(clazzInstance, body.members);
}
