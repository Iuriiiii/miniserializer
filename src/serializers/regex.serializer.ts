import type { SerializeOptions } from "../interfaces/mod.ts";
import { Opcode } from "../enums/mod.ts";

export function regexSerializer(value: RegExp, options: SerializeOptions) {
  const { stack } = options;
  stack.pushOpcode(Opcode.REGEX);
  stack.pushString(value.source);
  stack.pushString(value.flags);
}
