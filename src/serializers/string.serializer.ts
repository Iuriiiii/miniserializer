import { Opcode } from "../enums/mod.ts";
import { SerializeOptions } from "../interfaces/mod.ts";

export function stringSerializer(value: string, options: SerializeOptions) {
  const { stack, stringDatabase } = options;

  if (stringDatabase.has(value)) {
    stack.pushOpcode(Opcode.STRING_REFERENCE);
    stack.push(stringDatabase.get(value)!, Opcode.U16);
  } else {
    stringDatabase.add(value);
    stack.pushOpcode(Opcode.STRING);
    stack.pushString(value);
  }
}
