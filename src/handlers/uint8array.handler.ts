import { DataType, Opcode } from "../enums/mod.ts";
import type { DeserializeOptions, SerializeOptions } from "../interfaces/mod.ts";

export function serializeUint8Array(value: Uint8Array, options: SerializeOptions) {
  const { stack } = options;

  if (!(value instanceof Uint8Array)) {
    return false;
  }

  stack.pushOpcode(Opcode.CUSTOM + DataType.UINT8ARRAY);
  stack.pushUint8Array(value);

  return true;
}

export function deserializeUint8Array(opcode: Opcode, options: DeserializeOptions) {
  const { stack } = options;

  if (opcode !== (Opcode.CUSTOM + DataType.UINT8ARRAY)) {
    return undefined;
  }

  stack.popOpcode();

  const uint8Array = stack.popUint8Array();

  return uint8Array;
}
