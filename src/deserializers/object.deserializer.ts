import type { DeserializeOptions } from "../interfaces/mod.ts";
import { Opcode } from "../enums/mod.ts";
import { unknownDeserializer } from "./unknown.deserializer.ts";

export function objectDeserializer(options: DeserializeOptions) {
  const { stack, objectDatabase } = options;
  const object: Record<string, unknown> = {};
  objectDatabase.add(object);

  stack.popOpcode();

  while (true) {
    const opcode = stack.popOpcode();

    if (opcode === Opcode.END_OBJECT) {
      break;
    }

    const key = stack.popString()!;
    const value = unknownDeserializer(options);

    object[key] = value;
  }

  return object;
}
