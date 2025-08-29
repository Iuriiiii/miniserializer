import { SERIALIZABLE_CLASSES } from "../singletons/mod.ts";

export function getClassConstructor(className: string) {
  return SERIALIZABLE_CLASSES.get(className);
}
