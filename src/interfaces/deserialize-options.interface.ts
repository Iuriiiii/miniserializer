import type { DeserializeFunction } from "../types/mod.ts";
import type { SerializeOptions } from "./serialize-options.interface.ts";
import type { ReadableStack } from "../classes/mod.ts";

/**
 * Options for deserializing
 */
export interface DeserializeOptions extends Omit<SerializeOptions, "serializers" | "stack"> {
  /**
   * All custom deserializers.
   */
  deserializers: DeserializeFunction[];

  /**
   * ReadableStack
   */
  stack: ReadableStack;
}
