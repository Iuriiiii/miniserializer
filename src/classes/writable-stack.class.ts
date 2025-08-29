import { isBigInt } from "@online/is";
import { Opcode } from "../enums/opcode.enum.ts";
import type { UnsafeAny } from "../types/mod.ts";
import { is32float, is64float, isByte, isDword, isUbyte, isUdword, isUint, isUword, isWord } from "../validators/mod.ts";
import { isInt } from "../validators/is-int.validator.ts";

export class WritableStack {
  public buffer: ArrayBuffer;
  private readonly dataView: DataView;
  private readonly textEncoder = new TextEncoder();
  private offset = 0;

  constructor(byteLength: number = 1024 * 1024) {
    this.buffer = new ArrayBuffer(byteLength);
    this.dataView = new DataView(this.buffer);
  }

  public get byteOffset(): number {
    return this.offset;
  }

  public pushString(value: string): void {
    const encoded = this.textEncoder.encode(value);
    this.pushUint8Array(encoded);
  }

  public pushUint8Array(value: Uint8Array): void {
    this.dataView.setUint32(this.offset, value.byteLength, false);
    this.offset += 4;

    for (let i = 0; i < value.length; i++) {
      this.dataView.setUint8(this.offset + i, value[i]);
    }

    this.offset += value.byteLength;
  }

  public pushNumber(value: number | bigint) {
    if (isBigInt(value)) {
      this.pushOpcode(Opcode.BIGINT);
      this.dataView.getBigUint64(this.offset, false);
      this.dataView.setBigInt64(this.offset, value, false);
      this.offset += 8;
      return;
    }

    switch (true) {
      case is32float(value):
        this.pushOpcode(Opcode.F32);
        this.dataView.setFloat32(this.offset, value, false);
        this.offset += 4;
        break;
      case is64float(value):
        this.pushOpcode(Opcode.F64);
        this.dataView.setFloat64(this.offset, value, false);
        this.offset += 8;
        break;
      case isByte(value):
        this.pushOpcode(Opcode.I8);
        this.dataView.setInt8(this.offset++, value);
        break;
      case isUbyte(value):
        this.pushOpcode(Opcode.U8);
        this.dataView.setUint8(this.offset++, value);
        break;
      case isWord(value):
        this.pushOpcode(Opcode.I16);
        this.dataView.setInt16(this.offset, value, false);
        this.offset += 2;
        break;
      case isUword(value):
        this.pushOpcode(Opcode.U16);
        this.dataView.setUint16(this.offset, value, false);
        this.offset += 2;
        break;
      case isDword(value):
        this.pushOpcode(Opcode.I32);
        this.dataView.setInt32(this.offset, value, false);
        this.offset += 4;
        break;
      case isUdword(value):
        this.pushOpcode(Opcode.U32);
        this.dataView.setUint32(this.offset, value, false);
        this.offset += 4;
        break;
      case isInt(value, 64): // I64
        this.pushOpcode(Opcode.I64);
        this.dataView.setBigInt64(this.offset, BigInt(value), false);
        this.offset += 8;
        break;
      case isUint(value, 64): // U64
        this.pushOpcode(Opcode.U64);
        this.dataView.setBigUint64(this.offset, BigInt(value), false);
        this.offset += 8;
        break;
      default:
        throw new Error(`Unsupported number: ${value}`);
    }
  }

  public pushOpcode(opcode: Opcode) {
    this.dataView.setUint8(this.offset++, opcode);
  }

  public push(opcode: Opcode, value: UnsafeAny) {
    this.dataView.setUint8(this.offset++, opcode);

    switch (opcode) {
      case Opcode.TRUE:
      case Opcode.FALSE:
      case Opcode.NULL:
      case Opcode.INFINITY:
      case Opcode.NEGATIVE_INFINITY:
      case Opcode.NAN:
      case Opcode.UNDEFINED:
        // Pushed before...
        break;
      case Opcode.I8:
      case Opcode.U8:
      case Opcode.I16:
      case Opcode.U16:
      case Opcode.I32:
      case Opcode.U32:
      case Opcode.F32:
      case Opcode.F64:
      case Opcode.BIGINT:
        return this.pushNumber(value);
      case Opcode.STRING: {
        const encoded = this.textEncoder.encode(value);

        this.dataView.setUint32(this.offset, encoded.length, true);
        this.offset += 4;

        for (let i = 0; i < encoded.length; i++) {
          this.dataView.setUint8(this.offset + i, encoded[i]);
        }

        this.offset += encoded.length;
        break;
      }
      case Opcode.WSTRING: {
        // this.dataView.setUint32(this.offset, value.length, true);
        // this.offset += 4;
        // for (let i = 0; i < value.length; i++) {
        //   this.dataView.setUint16(this.offset + i * 2, value.charCodeAt(i), true);
        // }
        // this.offset += value.length * 2;
        break;
      }

      case Opcode.REFERENCE:
        // max of 256 references.
        return this.dataView.setUint8(this.offset++, value);
      case Opcode.STRING_REFERENCE:
        // max of 256 references.
        return this.dataView.setUint8(this.offset++, value);
      default:
        throw new Error(`Unknown opcode: ${opcode}`);
    }
  }
}
