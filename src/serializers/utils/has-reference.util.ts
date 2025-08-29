import { Opcode } from "../../enums/mod.ts";
import { SerializeOptions } from "../../interfaces/mod.ts";
import { UnsafeAny } from "../../types/mod.ts";

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
