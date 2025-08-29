import type { SerializeOptions } from "../interfaces/mod.ts";
import { Opcode } from "../enums/mod.ts";
import { unknownSerializer } from "./unknown.serializer.ts";
import { hasReference } from "./utils/has-reference.util.ts";

export function arraySerializer(value: unknown[], options: SerializeOptions) {
  const { stack } = options;

  if (!hasReference(value, options)) {
    stack.pushOpcode(Opcode.ARRAY);

    for (const [key, _value] of Object.entries(value)) {
      stack.pushOpcode(Opcode.MEMBER);
      const index = Number(key);

      stack.pushNumber(index);
      unknownSerializer(_value, options);
    }

    stack.pushOpcode(Opcode.END_ARRAY);
  }
}
