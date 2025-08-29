import { Opcode } from "../enums/mod.ts";
import { DeserializeOptions } from "../interfaces/mod.ts";
import { unknownDeserializer } from "./unknown.deserializer.ts";

export function regexDeserializer(options: DeserializeOptions) {
  const { stack } = options;
  stack.popOpcode();
  return new RegExp(stack.popString(), stack.popString());
}
