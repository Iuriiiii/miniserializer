export function isBigUint(value: unknown): value is bigint {
  return typeof value === "bigint" && value >= 0;
}
