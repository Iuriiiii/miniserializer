import { Opcode } from "../enums/opcode.enum.ts";
import type { UnsafeAny } from "../types/mod.ts";

export class ReadableStack {
  private offset = 0;
  private readonly dataView!: DataView;
  constructor(buffer: Uint8Array) {
    this.dataView = new DataView(buffer.buffer);
  }

  public get byteOffset(): number {
    return this.offset;
  }

  public popOpcode(): Opcode {
    return this.dataView.getUint8(this.offset++);
  }

  public peekOpcode(): Opcode {
    return this.dataView.getUint8(this.offset);
  }

  public popString(): string {
    const bytes = this.popUint8Array();
    return new TextDecoder().decode(bytes);
  }

  public popUint8Array(): Uint8Array {
    const length = this.dataView.getUint32(this.offset, false);
    this.offset += 4;

    const bytes = new Uint8Array(this.dataView.buffer, this.offset, length);
    this.offset += length;

    return bytes;
  }

  public popNumber(opcode?: Opcode): number | bigint {
    const _opcode = opcode ?? this.popOpcode();

    switch (_opcode) {
      case Opcode.BIGINT: {
        const value = this.dataView.getBigInt64(this.offset, false);
        this.offset += 8;
        return value;
      }
      case Opcode.F32: {
        const value = this.dataView.getFloat32(this.offset, false);
        this.offset += 4;
        return value;
      }
      case Opcode.F64: {
        const value = this.dataView.getFloat64(this.offset, false);
        this.offset += 8;
        return value;
      }
      case Opcode.I8: {
        const value = this.dataView.getInt8(this.offset++);
        return value;
      }
      case Opcode.U8: {
        const value = this.dataView.getUint8(this.offset++);
        return value;
      }
      case Opcode.I16: {
        const value = this.dataView.getInt16(this.offset, false);
        this.offset += 2;
        return value;
      }
      case Opcode.U16: {
        const value = this.dataView.getUint16(this.offset, false);
        this.offset += 2;
        return value;
      }
      case Opcode.I32: {
        const value = this.dataView.getInt32(this.offset, false);
        this.offset += 4;
        return value;
      }
      case Opcode.U32: {
        const value = this.dataView.getUint32(this.offset, false);
        this.offset += 4;
        return value;
      }
      case Opcode.I64: {
        const value = this.dataView.getBigInt64(this.offset, false);
        this.offset += 8;
        return Number(value);
      }
      case Opcode.U64: {
        const value = this.dataView.getBigUint64(this.offset, false);
        this.offset += 8;
        return Number(value);
      }
      default:
        throw new Error(`Unsupported number opcode: ${opcode}`);
    }
  }

  // public read(): UnsafeAny {
  //   const opcode = this.popOpcode();

  //   switch (opcode) {
  //     case Opcode.TRUE:
  //       return true;
  //     case Opcode.FALSE:
  //       return false;
  //     case Opcode.NULL:
  //       return null;
  //     case Opcode.UNDEFINED:
  //       return undefined;
  //     case Opcode.NAN:
  //       return NaN;
  //     case Opcode.INFINITY:
  //       return Infinity;
  //     case Opcode.NEGATIVE_INFINITY:
  //       return -Infinity;
  //     case Opcode.I8:
  //     case Opcode.U8:
  //     case Opcode.I16:
  //     case Opcode.U16:
  //     case Opcode.I32:
  //     case Opcode.U32:
  //     case Opcode.F32:
  //     case Opcode.F64:
  //     case Opcode.BIGINT:
  //       return this.popNumber(opcode);
  //     case Opcode.STRING:
  //       return this.popString();
  //     case Opcode.REFERENCE:
  //       return this.dataView.getUint8(this.offset++);
  //     case Opcode.STRING_REFERENCE:
  //       return this.dataView.getUint8(this.offset++);
  //     default:
  //       throw new Error(`Unknown opcode: ${opcode}`);
  //   }
  // }
}
