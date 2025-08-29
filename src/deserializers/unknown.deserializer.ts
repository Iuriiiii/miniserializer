import type { DeserializeOptions } from "../interfaces/mod.ts";
import { Opcode } from "../enums/mod.ts";
import { arrayDeserializer } from "./array.deserializer.ts";
import { classDeserializer } from "./class.deserializer.ts";
import { constructorDeserializer } from "./constructor.deserializer.ts";
import { objectDeserializer } from "./object.deserializer.ts";
import { regexDeserializer } from "./regex.deserializer.ts";
import { stringDeserializer } from "./string.deserializer.ts";

export function unknownDeserializer<T = unknown>(
  options: DeserializeOptions,
): T {
  const { stack, deserializers } = options;
  const opcode = stack.peekOpcode();

  switch (opcode) {
    case Opcode.NULL:
      stack.popOpcode();
      return null as T;
    case Opcode.NAN:
      stack.popOpcode();
      return NaN as T;
    case Opcode.INFINITY:
      stack.popOpcode();
      return Infinity as T;
    case Opcode.NEGATIVE_INFINITY:
      stack.popOpcode();
      return -Infinity as T;
    case Opcode.UNDEFINED:
      stack.popOpcode();
      return undefined as T;
    case Opcode.TRUE:
      stack.popOpcode();
      return true as T;
    case Opcode.FALSE:
      stack.popOpcode();
      return false as T;
    case Opcode.CONSTRUCTOR:
      return constructorDeserializer(options) as T;
    case Opcode.I8:
    case Opcode.U8:
    case Opcode.I16:
    case Opcode.U16:
    case Opcode.I32:
    case Opcode.U32:
    case Opcode.I64:
    case Opcode.U64:
    case Opcode.F32:
    case Opcode.F64:
    case Opcode.BIGINT:
      return stack.popNumber() as T;
    case Opcode.STRING_REFERENCE:
    case Opcode.STRING:
      return stringDeserializer(opcode, options) as T;
    case Opcode.REGEX:
      return regexDeserializer(options) as T;
    case Opcode.ARRAY:
      return arrayDeserializer(options) as T;
    case Opcode.OBJECT:
      return objectDeserializer(options) as T;
    case Opcode.REFERENCE:
      stack.popOpcode();
      return options.objectDatabase.getById(stack.popNumber()! as number) as T;
    case Opcode.CLASS:
      return classDeserializer(options) as T;
    default:
      for (const deserializer of deserializers) {
        const result = deserializer(opcode, options);

        if (result !== undefined) {
          return result as T;
        }
      }

      throw new Error(`Unknown opcode: ${opcode}`);
  }
}
