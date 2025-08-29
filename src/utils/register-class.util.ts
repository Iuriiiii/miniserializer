import { SERIALIZABLE_CLASSES } from "../singletons/mod.ts";
import { Constructor } from "../types/mod.ts";

export function registerClass(clazz: Constructor) {
  SERIALIZABLE_CLASSES.set(clazz.name, clazz);
}
