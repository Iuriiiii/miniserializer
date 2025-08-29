import { isNumberBetween } from "./is-number-between.validator.ts";

export function is32float(value: number) {
  const isFloat = value % 1 !== 0;
  return isFloat && isNumberBetween(value, -3.4e38, 3.4e38);
}
