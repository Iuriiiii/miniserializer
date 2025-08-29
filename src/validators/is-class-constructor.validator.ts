import type { Constructor, UnsafeAny } from "../types/mod.ts";

export function isClassConstructor(value: unknown): value is Constructor {
  if (typeof value !== "function") {
    return false;
  }

  const proto = (value as any).prototype;
  const stringified = value.toString();
  return !!proto && !!proto.constructor && proto.constructor === value &&
    (stringified.startsWith("class") || stringified.endsWith("{ [native code] }"));
}
