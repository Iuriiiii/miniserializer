import { isInt } from "./is-int.validator.ts";
import { isNumberBetween } from "./is-number-between.validator.ts";

export function isUint(value: unknown, bits: number): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    isNumberBetween(value, 0, 2 ** bits - 1)
  );
}
