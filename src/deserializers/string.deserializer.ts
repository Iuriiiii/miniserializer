import type { DeserializeOptions } from "../interfaces/mod.ts";
import { Opcode } from "../enums/mod.ts";

export function stringDeserializer(
  opcode: Opcode,
  options: DeserializeOptions,
) {
  const { stack, stringDatabase } = options;

  stack.popOpcode();

  if (opcode === Opcode.STRING) {
    const value = stack.popString()!;
    stringDatabase.add(value);
    return value;
  } else {
    const stringReferenceId = stack.popNumber(Opcode.U16) as number;
    return stringDatabase.getById(stringReferenceId)!;
  }
}
