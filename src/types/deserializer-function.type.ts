import { Opcode } from "../enums/mod.ts";
import type { DeserializeOptions } from "../interfaces/mod.ts";

/** Deserializer function */
export type DeserializeFunction = (
  opcode: Opcode | number,
  options: DeserializeOptions,
) => unknown;
