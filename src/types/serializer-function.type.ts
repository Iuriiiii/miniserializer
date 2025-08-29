import type { SerializeOptions } from "../interfaces/mod.ts";
import type { UnsafeAny } from "./unsafe-any.type.ts";

export type SerializerFunction = (
  value: UnsafeAny,
  options: SerializeOptions,
) => boolean;
