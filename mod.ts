import { Database, ReadableStack, WritableStack } from "./src/classes/mod.ts";
import { registerClass } from "./src/utils/mod.ts";
import { isSerializableClass } from "./src/validators/mod.ts";
import { unknownSerializer } from "./src/serializers/unknown.serializer.ts";
import { unknownDeserializer } from "./src/deserializers/unknown.deserializer.ts";
import {
  deserializeDate,
  deserializeError,
  deserializeMap,
  deserializeSet,
  deserializeUint8Array,
  deserializeURL,
  serializeDate,
  serializeError,
  serializeMap,
  serializeSet,
  serializeUint8Array,
  serializeURL,
} from "./src/handlers/mod.ts";
import { assert } from "@std/assert";
import type { DeserializeOptions, SerializeOptions } from "./src/interfaces/mod.ts";
import type { AtLeastOneOf, DeserializeFunction, SerializerFunction } from "./src/types/mod.ts";
import { SerializableClass } from "./src/abstractions/mod.ts";

export { Database, isSerializableClass, ReadableStack, registerClass, SerializableClass, WritableStack };
export type { AtLeastOneOf, DeserializeFunction, DeserializeOptions, SerializeOptions, SerializerFunction };

const SERIALIZERS: SerializerFunction[] = [
  serializeDate,
  serializeMap,
  serializeSet,
  serializeUint8Array,
  serializeError,
  serializeURL,
];

const DESERIALIZERS: DeserializeFunction[] = [
  deserializeDate,
  deserializeMap,
  deserializeSet,
  deserializeUint8Array,
  deserializeError,
  deserializeURL,
];

export interface ISerializeOptions {
  serializers: SerializerFunction[];
}

export function serialize(value: unknown, options?: Partial<ISerializeOptions>): Uint8Array {
  const stack = new WritableStack();
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();

  const unknownOptions: SerializeOptions = {
    stack,
    objectDatabase,
    arrayDatabase,
    stringDatabase,
    serializers: SERIALIZERS.concat(options?.serializers ?? []),
  };

  // Version
  stack.pushNumber(1);

  unknownSerializer(value, unknownOptions);

  return new Uint8Array(stack.buffer.slice(0, stack.byteOffset));
}

export interface IDeserializeOptions {
  deserializers: DeserializeFunction[];
}

export function deserialize<T = unknown>(buffer: Uint8Array, options?: Partial<IDeserializeOptions>): T {
  const stack = new ReadableStack(buffer);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();

  const unkownOptions: DeserializeOptions = {
    stack,
    objectDatabase,
    arrayDatabase,
    stringDatabase,
    deserializers: DESERIALIZERS.concat(options?.deserializers ?? []),
  };

  const version = stack.popNumber();

  assert(version === 1, "Unable to unpack. Invalid version.");

  return unknownDeserializer(unkownOptions) as T;
}
