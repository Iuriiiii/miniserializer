import type { UnsafeAny } from "../src/types/unsafe-any.type.ts";
import type { AtLeastOneOf } from "../src/types/mod.ts";
import type { SerializedClass } from "../src/interfaces/mod.ts";
import { assertEqual, test } from "@inspatial/test";
import { unknownDeserializer } from "../src/deserializers/unknown.deserializer.ts";
import { unknownSerializer } from "../src/serializers/unknown.serializer.ts";
import { Database, ReadableStack, WritableStack } from "../src/classes/mod.ts";
import { SerializableClass } from "../src/abstractions/mod.ts";
import { registerClass } from "../src/utils/mod.ts";

class User extends SerializableClass {
  public isOld!: boolean;

  constructor(public readonly name: string, public readonly age: number) {
    super();
  }

  public override serialize(): AtLeastOneOf<SerializedClass<UnsafeAny>> {
    return {
      members: {
        name: this.name,
        age: this.age,
        isOld: this.isOld ?? true,
      },
    };
  }
}

registerClass(User);

class User2 extends SerializableClass {
  public isOld!: boolean;

  constructor(public readonly name: string, public readonly age: number) {
    super();
  }

  public override serialize() {
    return {
      members: {
        name: this.name,
        age: this.age,
        isOld: this.isOld ?? true,
      },
    };
  }
}

registerClass(User2);

class User3 extends SerializableClass {
  public isOld!: boolean;

  constructor(public readonly name: string, public readonly age: number) {
    super();
  }

  public override serialize(): AtLeastOneOf<SerializedClass<typeof User3>> {
    return {
      members: {
        name: this.name,
        age: this.age,
        isOld: this.isOld ?? true,
      },
    };
  }

  static override deserialize(
    serialized: SerializedClass<typeof User3>,
  ) {
    const { members } = serialized;
    return new User3(members.name as string, members.age as number);
  }
}

registerClass(User3);

test("Class Serialization", () => {
  const user = new User("John", 25);

  const stack = new WritableStack();
  const objectDatabase = new Database<object>();
  const stringDatabase = new Database<string>();
  const arrayDatabase = new Database<Array<unknown>>();

  unknownSerializer(user, {
    stack,
    objectDatabase,
    stringDatabase,
    arrayDatabase,
    serializers: [],
  });

  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserialization = unknownDeserializer<User>({
    stack: readableStack,
    objectDatabase,
    stringDatabase,
    arrayDatabase,
    deserializers: [],
  });

  assertEqual(deserialization instanceof User, true);
  assertEqual(deserialization.name, "John");
  assertEqual(deserialization.age, 25);
  assertEqual(deserialization.isOld, undefined);
});

class TestClassForConstructor {
  constructor(public readonly value: string) {}
}

registerClass(TestClassForConstructor);

test("Constructor Serialization and Deserialization through unknownSerializer", () => {
  const originalConstructor = TestClassForConstructor;

  const stack = new WritableStack();
  const objectDatabase = new Database<object>();
  const stringDatabase = new Database<string>();
  const arrayDatabase = new Database<Array<unknown>>();

  unknownSerializer(originalConstructor, {
    stack,
    objectDatabase,
    stringDatabase,
    arrayDatabase,
    serializers: [],
  });

  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserializedConstructor = unknownDeserializer<typeof TestClassForConstructor>({
    stack: readableStack,
    objectDatabase,
    stringDatabase,
    arrayDatabase,
    deserializers: [],
  });

  assertEqual(deserializedConstructor, originalConstructor);
  assertEqual(deserializedConstructor.name, originalConstructor.name);
});

test("Class Serialization 2", () => {
  const user = new User2("John", 25);

  const stack = new WritableStack();
  const objectDatabase = new Database<object>();
  const stringDatabase = new Database<string>();
  const arrayDatabase = new Database<Array<unknown>>();

  unknownSerializer(user, {
    stack,
    objectDatabase,
    stringDatabase,
    arrayDatabase,
    serializers: [],
  });

  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserialization = unknownDeserializer<User2>({
    stack: readableStack,
    objectDatabase,
    stringDatabase,
    arrayDatabase,
    deserializers: [],
  });

  assertEqual(deserialization instanceof User2, true);
  assertEqual(deserialization.name, "John");
  assertEqual(deserialization.age, 25);
  assertEqual(deserialization.isOld, true);
});

test("Class Serialization 3", () => {
  const user = new User3("John", 25);

  const stack = new WritableStack();
  const objectDatabase = new Database<object>();
  const stringDatabase = new Database<string>();
  const arrayDatabase = new Database<Array<unknown>>();

  unknownSerializer(user, {
    stack,
    objectDatabase,
    stringDatabase,
    arrayDatabase,
    serializers: [],
  });

  const readableStack = new ReadableStack(new Uint8Array(stack.buffer));
  const deserialization = unknownDeserializer<User3>({
    stack: readableStack,
    objectDatabase,
    stringDatabase,
    arrayDatabase,
    deserializers: [],
  });

  assertEqual(deserialization instanceof User3, true);
  assertEqual(deserialization.name, "John");
  assertEqual(deserialization.age, 25);
  assertEqual(deserialization.isOld, undefined);
});
