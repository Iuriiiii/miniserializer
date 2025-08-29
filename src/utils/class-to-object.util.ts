import type { SerializableClass } from "../abstractions/mod.ts";
import type { SerializedClass } from "../interfaces/mod.ts";
import type { AtLeastOneOf, UnsafeAny } from "../types/mod.ts";

export function classToObject(clazz: SerializableClass) {
  if ("serialize" in clazz && clazz.serialize instanceof Function) {
    const serialized = clazz.serialize();

    serialized.members ??= {};
    serialized.arguments ??= [];

    return serialized as SerializedClass<UnsafeAny>;
  }

  const members: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(clazz)) {
    if (value instanceof Function) {
      continue;
    }

    members[key] = value;
  }

  return { members, arguments: [] } satisfies SerializedClass<UnsafeAny>;
}
