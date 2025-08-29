import type { UnsafeAny } from "../../types/mod.ts";
import type { SerializeOptions } from "../../interfaces/mod.ts";
import { Opcode } from "../../enums/mod.ts";

export function hasReference(value: UnsafeAny, options: SerializeOptions) {
  const { stack, objectDatabase } = options;
  const existsObjectInDatabase = objectDatabase.has(value);

  if (existsObjectInDatabase) {
    stack.pushOpcode(Opcode.REFERENCE);
    stack.pushNumber(objectDatabase.get(value)!);
  } else {
    objectDatabase.add(value);
  }

  return existsObjectInDatabase;
}
