import type { DeserializeOptions } from "../interfaces/mod.ts";
import type { Opcode } from "../enums/mod.ts";

/** Deserializer function */
export type DeserializeFunction = (
  opcode: Opcode | number,
  options: DeserializeOptions,
) => unknown;
