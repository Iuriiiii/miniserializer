import { DataType, Opcode } from "../enums/mod.ts";
import type { DeserializeOptions, SerializeOptions } from "../interfaces/mod.ts";

export function serializeURL(value: URL, options: SerializeOptions) {
  const { stack } = options;

  if (!(value instanceof URL)) {
    return false;
  }

  stack.pushOpcode(Opcode.CUSTOM + DataType.URL);
  stack.pushString(value.href);

  return true;
}

export function deserializeURL(opcode: Opcode, options: DeserializeOptions) {
  const { stack } = options;

  if (opcode !== (Opcode.CUSTOM + DataType.URL)) {
    return undefined;
  }

  stack.popOpcode();

  const href = stack.popString();
  const url = new URL(href);

  return url;
}
