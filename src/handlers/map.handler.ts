import { DataType, Opcode } from "../enums/mod.ts";
import type { DeserializeOptions, SerializeOptions } from "../interfaces/mod.ts";
import type { UnsafeAny } from "../types/mod.ts";
import { unknownSerializer } from "../serializers/unknown.serializer.ts";
import { unknownDeserializer } from "../deserializers/unknown.deserializer.ts";

export function serializeMap(value: Map<UnsafeAny, UnsafeAny>, options: SerializeOptions) {
  const { stack } = options;

  if (!(value instanceof Map)) {
    return false;
  }

  stack.pushOpcode(Opcode.CUSTOM + DataType.MAP);
  stack.pushNumber(value.size);

  for (const [key, val] of value.entries()) {
    unknownSerializer(key, options);
    unknownSerializer(val, options);
  }

  return true;
}

export function deserializeMap(opcode: Opcode, options: DeserializeOptions) {
  const { stack } = options;

  if (opcode !== (Opcode.CUSTOM + DataType.MAP)) {
    return undefined;
  }

  stack.popOpcode();
  const size = stack.popNumber() as number;
  const map = new Map();

  for (let i = 0; i < size; i++) {
    const key = unknownDeserializer(options);
    const val = unknownDeserializer(options);
    map.set(key, val);
  }

  return map;
}
