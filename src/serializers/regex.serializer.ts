import { Opcode } from "../enums/mod.ts";
import { SerializeOptions } from "../interfaces/mod.ts";

export function regexSerializer(value: RegExp, options: SerializeOptions) {
  const { stack } = options;
  stack.pushOpcode(Opcode.REGEX);
  stack.pushString(value.source);
  stack.pushString(value.flags);
}
