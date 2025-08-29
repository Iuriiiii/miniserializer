import type { Database, WritableStack } from "../classes/mod.ts";
import type { SerializerFunction } from "../types/mod.ts";

/**
 * Options for serializing.
 */
export interface SerializeOptions {
  /**
   * The object database.
   */
  objectDatabase: Database<object>;

  /**
   * The arrays database.
   */
  arrayDatabase: Database<unknown[]>;

  /**
   * The string database.
   */
  stringDatabase: Database<string>;

  /**
   * The custom serializers.
   */
  serializers: SerializerFunction[];

  /**
   * WritableStack
   */
  stack: WritableStack;
}
