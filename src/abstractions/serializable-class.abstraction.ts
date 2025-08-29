import type { SerializedClass } from "../interfaces/mod.ts";
import type { AtLeastOneOf, UnsafeAny } from "../types/mod.ts";

/**
 * Represents a class that can be serialized.
 */
export abstract class SerializableClass {
  /**
   * Deserializes a serialized class.
   * @param serialized - The serialized class data
   * @returns An instance of this class.
   */
  public static deserialize?(serialized: SerializedClass<UnsafeAny>): UnsafeAny;

  /**
   * Serializes this class.
   * @returns The serialized class data.
   */
  public abstract serialize(): AtLeastOneOf<SerializedClass<UnsafeAny>>;
}
