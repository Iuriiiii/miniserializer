import type { UnsafeAny } from "./unsafe-any.type.ts";

export type Constructor = { new(...args: UnsafeAny[]): UnsafeAny; };
