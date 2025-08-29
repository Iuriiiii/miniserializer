import type { WritableStack } from "../classes/mod.ts";
import {
  isArray,
  isBigInt,
  isBoolean,
  isInfinity,
  isNaN,
  isNull,
  isNumber,
  isObject,
  isPlainObject,
  isRegex,
  isString,
  isUndefined,
} from "@online/is";
import type { SerializeOptions } from "../interfaces/mod.ts";
import { Opcode } from "../enums/mod.ts";
import { objectSerializer } from "./object.serializer.ts";
import { arraySerializer } from "./array.serializer.ts";
import { regexSerializer } from "./regex.serializer.ts";
import { isClassConstructor, isSerializableClass } from "../validators/mod.ts";
import { classSerializer } from "./class.serializer.ts";
import { stringSerializer } from "./string.serializer.ts";
import { constructorSerializer } from "./constructor.serializer.ts";

export function unknownSerializer(
  value: unknown,
  options: SerializeOptions,
): WritableStack {
  const { stack, serializers } = options;

  switch (true) {
    case isNull(value):
      stack.pushOpcode(Opcode.NULL);
      break;
    case isNaN(value):
      stack.pushOpcode(Opcode.NAN);
      break;
    case isInfinity(value):
      if (value < 0) {
        stack.pushOpcode(Opcode.NEGATIVE_INFINITY);
      } else {
        stack.pushOpcode(Opcode.INFINITY);
      }
      break;
    case isUndefined(value):
      stack.pushOpcode(Opcode.UNDEFINED);
      break;
    case isBoolean(value):
      stack.pushOpcode(value ? Opcode.TRUE : Opcode.FALSE);
      break;
    case isNumber(value) || isBigInt(value):
      stack.pushNumber(value);
      break;
    case isString(value):
      stringSerializer(value, options);
      break;
    case isClassConstructor(value):
      constructorSerializer(value, options);
      break;
    case isPlainObject(value):
      objectSerializer(value, options);
      break;
    case isArray(value):
      arraySerializer(value, options);
      break;
    case isRegex(value):
      regexSerializer(value, options);
      break;
    default:
      if (!serializers.some((serializer) => serializer(value, options))) {
        if (isObject(value) || isSerializableClass(value)) {
          classSerializer(value, options);
        }
      }
  }

  return stack;
}
