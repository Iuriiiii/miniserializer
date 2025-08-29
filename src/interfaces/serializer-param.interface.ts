import type { UnsafeAny } from "../types/mod.ts";

export interface SerializerParam<T = UnsafeAny> {
  value: T;
  dataView: DataView;
}
