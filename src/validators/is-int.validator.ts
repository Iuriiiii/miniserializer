import { isNumberBetween } from "./is-number-between.validator.ts";

export function isInt(value: unknown, bits: number): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    isNumberBetween(value, -(2 ** (bits - 1)), 2 ** (bits - 1) - 1)
  );
}
