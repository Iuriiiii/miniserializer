import { isNumberBetween } from "./is-number-between.validator.ts";

export function is64float(value: number) {
  const isFloat = value % 1 !== 0;
  return isFloat && isNumberBetween(value, -1.8e308, 1.8e308);
}