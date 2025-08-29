import { Opcode } from "../enums/mod.ts";
import type { SerializeOptions } from "../interfaces/mod.ts";
import type { Constructor } from "../types/mod.ts";

export function constructorSerializer(value: Constructor, options: SerializeOptions) {
  const { stack } = options;

  stack.pushOpcode(Opcode.CONSTRUCTOR);
  stack.pushString(value.name);
}
