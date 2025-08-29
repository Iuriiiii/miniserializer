# MiniSerializer

`miniserializer` is a lightweight and efficient TypeScript library for serializing and deserializing JavaScript values, including complex objects, custom classes, and various native data types, into a compact `Uint8Array` binary format. It is designed to handle circular references and optimize the serialized output.

## Features

- **Primitive Type Support**: Serializes and deserializes `null`, `undefined`, `boolean`, `number`, `bigint`, `string`, `NaN`, `Infinity`, and `-Infinity`.
- **Native Object Support**: Handles `Date`, `Map`, `Set`, `Uint8Array`, `Error`, `URL`, and `RegExp` objects.
- **Custom Class Serialization**: Allows registration and serialization/deserialization of custom TypeScript/JavaScript classes, preserving their instance structure.
- **Circular Reference Handling**: Efficiently manages circular references within objects and arrays to prevent infinite loops during serialization and correctly reconstruct them during deserialization.
- **Compact Binary Format**: Serializes data into a `Uint8Array` for efficient storage and transmission.
- **Extensible**: Provides a mechanism to extend with custom serializers and deserializers for specific data types.

## Installation

```bash
deno add jsr:@online/miniserializer
```

## Usage

### Basic Serialization and Deserialization

```typescript
import { serialize, deserialize } from "@online/miniserializer";

const data = {
  name: "John Doe",
  age: 30,
  isStudent: false,
  courses: ["Math", "Science"],
  address: {
    street: "123 Main St",
    city: "Anytown",
  },
  birthDate: new Date("1990-01-01"),
  scores: new Map([["Math", 95], ["Science", 88]]),
  notes: new Set(["Good", "Hardworking"]),
};

const serializedData = serialize(data);
console.log("Serialized Data:", serializedData);

const deserializedData = deserialize(serializedData);
console.log("Deserialized Data:", deserializedData);

// Verify data integrity
console.log(deserializedData.name === data.name); // true
console.log(deserializedData.birthDate.getTime() === data.birthDate.getTime()); // true
```

### Custom Class Serialization

To serialize and deserialize custom classes, you need to register them using the `registerClass` function.

```typescript
import { serialize, deserialize, registerClass } from "@online/miniserializer";

class User {
  public constructor(
    public name: string,
    public email: string,
  ) {}

  public greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

// Register the class
registerClass(User);

const userInstance = new User("Alice", "alice@example.com");
const serializedUser = serialize(userInstance);
console.log("Serialized User:", serializedUser);

const deserializedUser = deserialize<User>(serializedUser);
console.log("Deserialized User:", deserializedUser);

// Verify instance and methods
console.log(deserializedUser instanceof User); // true
console.log(deserializedUser.name); // "Alice"
console.log(deserializedUser.greet()); // "Hello, my name is Alice"
```

### Handling Circular References

`miniserializer` automatically handles circular references.

```typescript
import { serialize, deserialize } from "@online/miniserializer";

interface Node {
  value: number;
  next?: Node;
}

const node1: Node = { value: 1 };
const node2: Node = { value: 2 };
const node3: Node = { value: 3 };

node1.next = node2;
node2.next = node3;
node3.next = node1; // Circular reference

const serializedNodes = serialize(node1);
console.log("Serialized Nodes (with circular reference):", serializedNodes);

const deserializedNodes = deserialize<Node>(serializedNodes);
console.log("Deserialized Nodes (with circular reference):", deserializedNodes);

// Verify circular reference
console.log(deserializedNodes.next?.next?.next === deserializedNodes); // true
```

## How it Works (Brief Overview)

`miniserializer` uses a stack-based approach for efficient binary serialization.

1.  **WritableStack**: During serialization, values are written to a `WritableStack`, which manages an `ArrayBuffer` and a `DataView`. It handles various data types by prefixing them with an `Opcode` to indicate their type and then writing their binary representation.
2.  **ReadableStack**: During deserialization, a `ReadableStack` reads the `Uint8Array` buffer. It interprets the `Opcodes` to reconstruct the original data types and values.
3.  **Database for References**: A `Database` class is used to track object, array, and string references during serialization. This allows `miniserializer` to detect and handle circular references by storing objects once and then referencing them by a unique ID, preventing infinite loops and reducing the serialized size.
4.  **Dispatchers**: `unknownSerializer` and `unknownDeserializer` act as central dispatchers, delegating the serialization/deserialization of different data types to specialized handlers (e.g., `objectSerializer`, `arrayDeserializer`, `classSerializer`).
5.  **Class Registration**: Custom classes are registered with `registerClass`, storing their constructors in a global singleton (`SERIALIZABLE_CLASSES`). This enables `miniserializer` to instantiate the correct class during deserialization.

## API

### `serialize(value: unknown): Uint8Array`

Serializes any JavaScript value into a `Uint8Array`.

-   `value`: The value to serialize.

Returns a `Uint8Array` representing the serialized data.

### `deserialize<T = unknown>(buffer: Uint8Array): T`

Deserializes a `Uint8Array` back into its original JavaScript value.

-   `buffer`: The `Uint8Array` containing the serialized data.

Returns the deserialized value, with an optional type `T`.

### `registerClass(clazz: Constructor): void`

Registers a custom class constructor to enable its serialization and deserialization.

-   `clazz`: The constructor function of the class to register.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT License](LICENSE)
