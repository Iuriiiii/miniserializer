import type { DeserializeOptions } from "../interfaces/mod.ts";
import { getClassConstructor } from "../utils/mod.ts";

export function constructorDeserializer(options: DeserializeOptions) {
  const { stack } = options;

  stack.popOpcode();

  const constructorName = stack.popString()!;

  return getClassConstructor(constructorName);
}
