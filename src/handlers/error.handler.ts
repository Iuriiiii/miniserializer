import type { DeserializeOptions, SerializeOptions } from "../interfaces/mod.ts";
import { DataType, Opcode } from "../enums/mod.ts";
import { isUndefined } from "@online/is";

export function serializeError(value: Error, options: SerializeOptions) {
  const { stack } = options;

  if (!(value instanceof Error)) {
    return false;
  }

  stack.pushOpcode(Opcode.CUSTOM + DataType.ERROR);
  stack.pushString(value.name);
  stack.pushString(value.message);

  if (isUndefined(value.stack)) {
    stack.pushOpcode(Opcode.UNDEFINED);
  } else {
    stack.pushString(value.stack);
  }

  return true;
}

export function deserializeError(opcode: Opcode, options: DeserializeOptions) {
  const { stack } = options;

  if (opcode !== (Opcode.CUSTOM + DataType.ERROR)) {
    return undefined;
  }

  stack.popOpcode();

  const name = stack.popString() as string;
  const message = stack.popString() as string;
  const stackTrace = (() => {
    const opcode = stack.peekOpcode() as Opcode;

    if (opcode === Opcode.UNDEFINED) {
      stack.popOpcode();
      return undefined;
    }

    return stack.popString();
  })();

  const error = new Error(message);

  error.name = name;
  error.stack = stackTrace;

  return error;
}
