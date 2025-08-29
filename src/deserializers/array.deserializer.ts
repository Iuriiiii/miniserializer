import type { DeserializeOptions } from "../interfaces/mod.ts";
import { Opcode } from "../enums/mod.ts";
import { unknownDeserializer } from "./unknown.deserializer.ts";

export function arrayDeserializer(options: DeserializeOptions) {
  const { stack, objectDatabase } = options;
  const array: unknown[] = [];

  stack.popOpcode();

  while (true) {
    const indexOpcode = stack.popOpcode();

    if (indexOpcode === Opcode.END_ARRAY) {
      break;
    }

    const index = stack.popNumber() as number;
    const value = unknownDeserializer(options);

    array[index] = value;
  }

  objectDatabase.add(array);
  return array;
}
