import { assert } from "node:console";
import { Opcode } from "../enums/mod.ts";
import { SerializeOptions } from "../interfaces/mod.ts";
import { classToObject, getClassConstructor } from "../utils/mod.ts";
import { objectSerializer } from "./object.serializer.ts";
import { hasReference } from "./utils/has-reference.util.ts";
import { UnsafeAny } from "../types/mod.ts";

export function classSerializer(
  value: UnsafeAny,
  options: SerializeOptions,
) {
  const { stack } = options;

  if (!hasReference(value, options)) {
    const className = value.constructor.name;

    assert(getClassConstructor(className), `The class "${className}" is not registered.`);

    stack.pushOpcode(Opcode.CLASS);
    stack.pushString(className);

    const serializedClass = classToObject(value);
    objectSerializer(serializedClass, options);
  }
}
