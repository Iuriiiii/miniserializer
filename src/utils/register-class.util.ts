import type { Constructor } from "../types/mod.ts";
import { SERIALIZABLE_CLASSES } from "../singletons/mod.ts";

export function registerClass(clazz: Constructor) {
  SERIALIZABLE_CLASSES.set(clazz.name, clazz);
}
