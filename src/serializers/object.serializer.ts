import { Opcode } from "../enums/mod.ts";
import { SerializeOptions } from "../interfaces/mod.ts";
import { hasReference } from "./utils/has-reference.util.ts";
import { unknownSerializer } from "./unknown.serializer.ts";
import type { UnsafeAny } from "../types/mod.ts";

export function objectSerializer(
  value: UnsafeAny,
  options: SerializeOptions,
) {
  const { stack } = options;

  if (!hasReference(value, options)) {
    stack.pushOpcode(Opcode.OBJECT);

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const _value = value[key];

        stack.pushOpcode(Opcode.MEMBER);
        stack.pushString(key);
        unknownSerializer(_value, options);
      }
    }

    stack.pushOpcode(Opcode.END_OBJECT);
  }
}
