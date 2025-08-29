import type { DeserializeOptions } from "../interfaces/mod.ts";

export function regexDeserializer(options: DeserializeOptions) {
  const { stack } = options;
  stack.popOpcode();
  return new RegExp(stack.popString(), stack.popString());
}
