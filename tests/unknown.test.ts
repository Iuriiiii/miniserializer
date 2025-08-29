import { assert, assertEquals, assertStrictEquals } from "@std/assert";
import { unknownSerializer } from "../src/serializers/unknown.serializer.ts";
import { unknownDeserializer } from "../src/deserializers/unknown.deserializer.ts";
import { WritableStack } from "../src/classes/writable-stack.class.ts";
import { ReadableStack } from "../src/classes/readable-stack.class.ts";
import { Database } from "../src/classes/database.util.ts";
import {
  DeserializeOptions,
  SerializedClass,
  SerializeOptions,
} from "../src/interfaces/mod.ts";
import { registerClass } from "../src/utils/mod.ts";
import type { UnsafeAny } from "../src/types/mod.ts";
import { SerializableClass } from "../src/abstractions/mod.ts";

Deno.test("unknownSerializer and unknownDeserializer should handle null", () => {
  const stack = new WritableStack(1024);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();

  const serializeOptions: SerializeOptions = {
    stack,
    serializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  unknownSerializer(null, serializeOptions);

  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializeOptions: DeserializeOptions = {
    stack: readableStack,
    deserializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  const deserialized = unknownDeserializer(deserializeOptions);
  assertStrictEquals(deserialized, null);
});

Deno.test("unknownSerializer and unknownDeserializer should handle undefined", () => {
  const stack = new WritableStack(1024);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();

  const serializeOptions: SerializeOptions = {
    stack,
    serializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  unknownSerializer(undefined, serializeOptions);

  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializeOptions: DeserializeOptions = {
    stack: readableStack,
    deserializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  const deserialized = unknownDeserializer(deserializeOptions);
  assertStrictEquals(deserialized, undefined);
});

Deno.test("unknownSerializer and unknownDeserializer should handle booleans", () => {
  const stackTrue = new WritableStack(1024);
  const objectDatabaseTrue = new Database<object>();
  const arrayDatabaseTrue = new Database<unknown[]>();
  const stringDatabaseTrue = new Database<string>();
  const serializeOptionsTrue: SerializeOptions = {
    stack: stackTrue,
    serializers: [],
    objectDatabase: objectDatabaseTrue,
    arrayDatabase: arrayDatabaseTrue,
    stringDatabase: stringDatabaseTrue,
  };
  unknownSerializer(true, serializeOptionsTrue);
  const readableStackTrue = new ReadableStack(new Uint8Array(stackTrue.buffer));
  const deserializeOptionsTrue: DeserializeOptions = {
    stack: readableStackTrue,
    deserializers: [],
    objectDatabase: objectDatabaseTrue,
    arrayDatabase: arrayDatabaseTrue,
    stringDatabase: stringDatabaseTrue,
  };
  const deserializedTrue = unknownDeserializer(deserializeOptionsTrue);
  assertStrictEquals(deserializedTrue, true);

  const stackFalse = new WritableStack(1024);
  const objectDatabaseFalse = new Database<object>();
  const arrayDatabaseFalse = new Database<unknown[]>();
  const stringDatabaseFalse = new Database<string>();
  const serializeOptionsFalse: SerializeOptions = {
    stack: stackFalse,
    serializers: [],
    objectDatabase: objectDatabaseFalse,
    arrayDatabase: arrayDatabaseFalse,
    stringDatabase: stringDatabaseFalse,
  };
  unknownSerializer(false, serializeOptionsFalse);
  const readableStackFalse = new ReadableStack(
    new Uint8Array(stackFalse.buffer),
  );
  const deserializeOptionsFalse: DeserializeOptions = {
    stack: readableStackFalse,
    deserializers: [],
    objectDatabase: objectDatabaseFalse,
    arrayDatabase: arrayDatabaseFalse,
    stringDatabase: stringDatabaseFalse,
  };
  const deserializedFalse = unknownDeserializer(deserializeOptionsFalse);
  assertStrictEquals(deserializedFalse, false);
});

Deno.test("unknownSerializer and unknownDeserializer should handle numbers", () => {
  const num = 12345;
  const stackNum = new WritableStack(1024);
  const objectDatabaseNum = new Database<object>();
  const arrayDatabaseNum = new Database<unknown[]>();
  const stringDatabaseNum = new Database<string>();
  const serializeOptionsNum: SerializeOptions = {
    stack: stackNum,
    serializers: [],
    objectDatabase: objectDatabaseNum,
    arrayDatabase: arrayDatabaseNum,
    stringDatabase: stringDatabaseNum,
  };
  unknownSerializer(num, serializeOptionsNum);
  const readableStackNum = new ReadableStack(new Uint8Array(stackNum.buffer));
  const deserializeOptionsNum: DeserializeOptions = {
    stack: readableStackNum,
    deserializers: [],
    objectDatabase: objectDatabaseNum,
    arrayDatabase: arrayDatabaseNum,
    stringDatabase: stringDatabaseNum,
  };
  const deserializedNum = unknownDeserializer(deserializeOptionsNum);
  assertEquals(deserializedNum, num);

  const floatNum = 123.45;
  const stackFloat = new WritableStack(1024);
  const objectDatabaseFloat = new Database<object>();
  const arrayDatabaseFloat = new Database<unknown[]>();
  const stringDatabaseFloat = new Database<string>();
  const serializeOptionsFloat: SerializeOptions = {
    stack: stackFloat,
    serializers: [],
    objectDatabase: objectDatabaseFloat,
    arrayDatabase: arrayDatabaseFloat,
    stringDatabase: stringDatabaseFloat,
  };
  unknownSerializer(floatNum, serializeOptionsFloat);
  const readableStackFloat = new ReadableStack(
    new Uint8Array(stackFloat.buffer),
  );
  const deserializeOptionsFloat: DeserializeOptions = {
    stack: readableStackFloat,
    deserializers: [],
    objectDatabase: objectDatabaseFloat,
    arrayDatabase: arrayDatabaseFloat,
    stringDatabase: stringDatabaseFloat,
  };
  const deserializedFloat = unknownDeserializer<number>(
    deserializeOptionsFloat,
  );
  assertEquals(Math.floor(deserializedFloat), Math.floor(floatNum));

  const negNum = -678;
  const stackNeg = new WritableStack(1024);
  const objectDatabaseNeg = new Database<object>();
  const arrayDatabaseNeg = new Database<unknown[]>();
  const stringDatabaseNeg = new Database<string>();
  const serializeOptionsNeg: SerializeOptions = {
    stack: stackNeg,
    serializers: [],
    objectDatabase: objectDatabaseNeg,
    arrayDatabase: arrayDatabaseNeg,
    stringDatabase: stringDatabaseNeg,
  };
  unknownSerializer(negNum, serializeOptionsNeg);
  const readableStackNeg = new ReadableStack(new Uint8Array(stackNeg.buffer));
  const deserializeOptionsNeg: DeserializeOptions = {
    stack: readableStackNeg,
    deserializers: [],
    objectDatabase: objectDatabaseNeg,
    arrayDatabase: arrayDatabaseNeg,
    stringDatabase: stringDatabaseNeg,
  };
  const deserializedNeg = unknownDeserializer(deserializeOptionsNeg);
  assertEquals(deserializedNeg, negNum);

  const nan = NaN;
  const stackNan = new WritableStack(1024);
  const objectDatabaseNan = new Database<object>();
  const arrayDatabaseNan = new Database<unknown[]>();
  const stringDatabaseNan = new Database<string>();
  const serializeOptionsNan: SerializeOptions = {
    stack: stackNan,
    serializers: [],
    objectDatabase: objectDatabaseNan,
    arrayDatabase: arrayDatabaseNan,
    stringDatabase: stringDatabaseNan,
  };
  unknownSerializer(nan, serializeOptionsNan);
  const readableStackNan = new ReadableStack(new Uint8Array(stackNan.buffer));
  const deserializeOptionsNan: DeserializeOptions = {
    stack: readableStackNan,
    deserializers: [],
    objectDatabase: objectDatabaseNan,
    arrayDatabase: arrayDatabaseNan,
    stringDatabase: stringDatabaseNan,
  };
  const deserializedNan = unknownDeserializer(deserializeOptionsNan) as number;
  assert(isNaN(deserializedNan));

  const infinity = Infinity;
  const stackInfinity = new WritableStack(1024);
  const objectDatabaseInfinity = new Database<object>();
  const arrayDatabaseInfinity = new Database<unknown[]>();
  const stringDatabaseInfinity = new Database<string>();
  const serializeOptionsInfinity: SerializeOptions = {
    stack: stackInfinity,
    serializers: [],
    objectDatabase: objectDatabaseInfinity,
    arrayDatabase: arrayDatabaseInfinity,
    stringDatabase: stringDatabaseInfinity,
  };
  unknownSerializer(infinity, serializeOptionsInfinity);
  const readableStackInfinity = new ReadableStack(
    new Uint8Array(stackInfinity.buffer),
  );
  const deserializeOptionsInfinity: DeserializeOptions = {
    stack: readableStackInfinity,
    deserializers: [],
    objectDatabase: objectDatabaseInfinity,
    arrayDatabase: arrayDatabaseInfinity,
    stringDatabase: stringDatabaseInfinity,
  };
  const deserializedInfinity = unknownDeserializer(deserializeOptionsInfinity);
  assertEquals(deserializedInfinity, infinity);

  const negInfinity = -Infinity;
  const stackNegInfinity = new WritableStack(1024);
  const objectDatabaseNegInfinity = new Database<object>();
  const arrayDatabaseNegInfinity = new Database<unknown[]>();
  const stringDatabaseNegInfinity = new Database<string>();
  const serializeOptionsNegInfinity: SerializeOptions = {
    stack: stackNegInfinity,
    serializers: [],
    objectDatabase: objectDatabaseNegInfinity,
    arrayDatabase: arrayDatabaseNegInfinity,
    stringDatabase: stringDatabaseNegInfinity,
  };
  unknownSerializer(negInfinity, serializeOptionsNegInfinity);
  const readableStackNegInfinity = new ReadableStack(
    new Uint8Array(stackNegInfinity.buffer),
  );
  const deserializeOptionsNegInfinity: DeserializeOptions = {
    stack: readableStackNegInfinity,
    deserializers: [],
    objectDatabase: objectDatabaseNegInfinity,
    arrayDatabase: arrayDatabaseNegInfinity,
    stringDatabase: stringDatabaseNegInfinity,
  };
  const deserializedNegInfinity = unknownDeserializer(
    deserializeOptionsNegInfinity,
  );
  assertEquals(deserializedNegInfinity, negInfinity);
});

Deno.test("unknownSerializer and unknownDeserializer should handle strings", () => {
  const str = "Hello, Deno!";
  const stack = new WritableStack(1024);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();
  const serializeOptions: SerializeOptions = {
    stack,
    serializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  unknownSerializer(str, serializeOptions);
  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializeOptions: DeserializeOptions = {
    stack: readableStack,
    deserializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  const deserialized = unknownDeserializer(deserializeOptions);
  assertEquals(deserialized, str);

  const emptyStr = "";
  const stackEmpty = new WritableStack(1024);
  const objectDatabaseEmpty = new Database<object>();
  const arrayDatabaseEmpty = new Database<unknown[]>();
  const stringDatabaseEmpty = new Database<string>();
  const serializeOptionsEmpty: SerializeOptions = {
    stack: stackEmpty,
    serializers: [],
    objectDatabase: objectDatabaseEmpty,
    arrayDatabase: arrayDatabaseEmpty,
    stringDatabase: stringDatabaseEmpty,
  };
  unknownSerializer(emptyStr, serializeOptionsEmpty);
  const readableStackEmpty = new ReadableStack(
    new Uint8Array(stackEmpty.buffer),
  );
  const deserializeOptionsEmpty: DeserializeOptions = {
    stack: readableStackEmpty,
    deserializers: [],
    objectDatabase: objectDatabaseEmpty,
    arrayDatabase: arrayDatabaseEmpty,
    stringDatabase: stringDatabaseEmpty,
  };
  const deserializedEmpty = unknownDeserializer(deserializeOptionsEmpty);
  assertEquals(deserializedEmpty, emptyStr);
});

Deno.test("unknownSerializer and unknownDeserializer should handle arrays", () => {
  const arr = [1, "two", true, null, undefined];
  const stack = new WritableStack(1024);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();
  const serializeOptions: SerializeOptions = {
    stack,
    serializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  unknownSerializer(arr, serializeOptions);
  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializeOptions: DeserializeOptions = {
    stack: readableStack,
    deserializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  const deserialized = unknownDeserializer(deserializeOptions);
  assertEquals(JSON.stringify(deserialized), JSON.stringify(arr));

  const nestedArr = [1, [2, "three"], { a: 4 }];
  const stackNested = new WritableStack(1024);
  const objectDatabaseNested = new Database<object>();
  const arrayDatabaseNested = new Database<unknown[]>();
  const stringDatabaseNested = new Database<string>();
  const serializeOptionsNested: SerializeOptions = {
    stack: stackNested,
    serializers: [],
    objectDatabase: objectDatabaseNested,
    arrayDatabase: arrayDatabaseNested,
    stringDatabase: stringDatabaseNested,
  };
  unknownSerializer(nestedArr, serializeOptionsNested);
  const readableStackNested = new ReadableStack(
    new Uint8Array(stackNested.buffer),
  );
  const deserializeOptionsNested: DeserializeOptions = {
    stack: readableStackNested,
    deserializers: [],
    objectDatabase: objectDatabaseNested,
    arrayDatabase: arrayDatabaseNested,
    stringDatabase: stringDatabaseNested,
  };
  const deserializedNested = unknownDeserializer(deserializeOptionsNested);
  assertEquals(JSON.stringify(deserializedNested), JSON.stringify(nestedArr));
});

Deno.test("unknownSerializer and unknownDeserializer should handle objects", () => {
  const obj = { a: 1, b: "hello", c: true, d: null, e: undefined };
  const stack = new WritableStack(1024);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();
  const serializeOptions: SerializeOptions = {
    stack,
    serializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  unknownSerializer(obj, serializeOptions);
  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializeOptions: DeserializeOptions = {
    stack: readableStack,
    deserializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  const deserialized = unknownDeserializer(deserializeOptions);
  assertEquals(deserialized, obj);

  const nestedObj = { x: 1, y: { z: "world" } };
  const stackNested = new WritableStack(1024);
  const objectDatabaseNested = new Database<object>();
  const arrayDatabaseNested = new Database<unknown[]>();
  const stringDatabaseNested = new Database<string>();
  const serializeOptionsNested: SerializeOptions = {
    stack: stackNested,
    serializers: [],
    objectDatabase: objectDatabaseNested,
    arrayDatabase: arrayDatabaseNested,
    stringDatabase: stringDatabaseNested,
  };
  unknownSerializer(nestedObj, serializeOptionsNested);
  const readableStackNested = new ReadableStack(
    new Uint8Array(stackNested.buffer),
  );
  const deserializeOptionsNested: DeserializeOptions = {
    stack: readableStackNested,
    deserializers: [],
    objectDatabase: objectDatabaseNested,
    arrayDatabase: arrayDatabaseNested,
    stringDatabase: stringDatabaseNested,
  };
  const deserializedNested = unknownDeserializer(deserializeOptionsNested);
  assertEquals(deserializedNested, nestedObj);
});

Deno.test("unknownSerializer and unknownDeserializer should handle regex", () => {
  const regex = /ab+c/i;
  const stack = new WritableStack(1024);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();
  const serializeOptions: SerializeOptions = {
    stack,
    serializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  unknownSerializer(regex, serializeOptions);
  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializeOptions: DeserializeOptions = {
    stack: readableStack,
    deserializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  const deserialized = unknownDeserializer(deserializeOptions) as RegExp;
  assertEquals(deserialized.source, regex.source);
  assertEquals(deserialized.flags, regex.flags);
});

Deno.test("unknownSerializer and unknownDeserializer should handle complex object with references", () => {
  const obj: UnsafeAny = {};
  obj.a = 1;
  obj.b = obj; // Self-reference

  const stack = new WritableStack(1024);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();
  const serializeOptions: SerializeOptions = {
    stack,
    serializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  unknownSerializer(obj, serializeOptions);
  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializeOptions: DeserializeOptions = {
    stack: readableStack,
    deserializers: [],
    objectDatabase: new Database<object>(),
    arrayDatabase: new Database<unknown[]>(),
    stringDatabase: new Database<string>(),
  };
  const deserialized = unknownDeserializer(deserializeOptions) as UnsafeAny;

  assertEquals(deserialized.a, 1);
  assert(deserialized.b === deserialized);
});

// Define a simple class for testing class serialization/deserialization
class MyClass {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

Deno.test("unknownSerializer and unknownDeserializer should handle classes", () => {
  registerClass(MyClass); // Register the class globally

  const instance = new MyClass("Deno", 3);
  const stack = new WritableStack(1024);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();
  const serializeOptions: SerializeOptions = {
    stack,
    serializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  unknownSerializer(instance, serializeOptions);
  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializeOptions: DeserializeOptions = {
    stack: readableStack,
    deserializers: [],
    objectDatabase: new Database<object>(),
    arrayDatabase: new Database<unknown[]>(),
    stringDatabase: new Database<string>(),
  };
  const deserialized = unknownDeserializer(deserializeOptions) as MyClass;

  assertEquals(deserialized.name, "Deno");
  assertEquals(deserialized.age, 3);
  assertEquals(deserialized.greet(), "Hello, my name is Deno");
  assert(deserialized instanceof MyClass);
});

class MyClass2 extends SerializableClass {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    super();
    this.name = name;
    this.age = age;
  }

  public greet(): string {
    return `Hello, my name is ${this.name}`;
  }

  override serialize(): SerializedClass<typeof MyClass2> {
    return {
      arguments: [this.name, this.age],
      members: {
        name: this.name,
        age: this.age,
      },
    };
  }

  static override deserialize(
    serialized: SerializedClass<typeof MyClass2>,
  ): MyClass2 {
    const [name, age] = serialized.arguments!;
    return new MyClass2(name, age);
  }
}

Deno.test("unknownSerializer and unknownDeserializer should handle classes with custom serializer and deserializers", () => {
  registerClass(MyClass); // Register the class globally

  const instance = new MyClass("Deno", 3);
  const stack = new WritableStack(1024);
  const objectDatabase = new Database<object>();
  const arrayDatabase = new Database<unknown[]>();
  const stringDatabase = new Database<string>();
  const serializeOptions: SerializeOptions = {
    stack,
    serializers: [],
    objectDatabase,
    arrayDatabase,
    stringDatabase,
  };
  unknownSerializer(instance, serializeOptions);
  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializeOptions: DeserializeOptions = {
    stack: readableStack,
    deserializers: [],
    objectDatabase: new Database<object>(),
    arrayDatabase: new Database<unknown[]>(),
    stringDatabase: new Database<string>(),
  };
  const deserialized = unknownDeserializer(deserializeOptions) as MyClass;

  assertEquals(deserialized.name, "Deno");
  assertEquals(deserialized.age, 3);
  assertEquals(deserialized.greet(), "Hello, my name is Deno");
  assert(deserialized instanceof MyClass);
});
