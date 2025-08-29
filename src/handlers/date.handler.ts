import { DataType, Opcode } from "../enums/mod.ts";
import type { DeserializeOptions, SerializeOptions } from "../interfaces/mod.ts";

export function serializeDate(value: Date, options: SerializeOptions) {
  const { stack } = options;

  if (!(value instanceof Date)) {
    return false;
  }

  stack.pushOpcode(Opcode.CUSTOM + DataType.DATE);
  stack.pushNumber(value.getTime());

  return true;
}

export function deserializeDate(opcode: Opcode, options: DeserializeOptions) {
  const { stack } = options;

  if (opcode !== (Opcode.CUSTOM + DataType.DATE)) {
    return undefined;
  }

  stack.popOpcode();

  const time = stack.popNumber() as number;
  const date = new Date(time);

  return date;
}
