import { DataType, Opcode } from "../enums/mod.ts";
import type { DeserializeOptions, SerializeOptions } from "../interfaces/mod.ts";
import type { UnsafeAny } from "../types/mod.ts";
import { unknownSerializer } from "../serializers/unknown.serializer.ts";
import { unknownDeserializer } from "../deserializers/unknown.deserializer.ts";

export function serializeSet(value: Set<UnsafeAny>, options: SerializeOptions) {
  const { stack } = options;

  if (!(value instanceof Set)) {
    return false;
  }

  stack.pushOpcode(Opcode.CUSTOM + DataType.SET);
  stack.pushNumber(value.size);

  for (const val of value.values()) {
    unknownSerializer(val, options);
  }

  return true;
}

export function deserializeSet(opcode: Opcode, options: DeserializeOptions) {
  const { stack } = options;

  if (opcode !== (Opcode.CUSTOM + DataType.SET)) {
    return undefined;
  }

  stack.popOpcode();
  const size = stack.popNumber() as number;
  const set = new Set();

  for (let i = 0; i < size; i++) {
    const val = unknownDeserializer(options);
    set.add(val);
  }

  return set;
}
