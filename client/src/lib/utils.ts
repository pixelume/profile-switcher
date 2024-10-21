import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPrimitive(value: unknown): boolean {
  return value !== Object(value);
}

type Primitive = string | number | boolean | undefined | symbol | bigint | null;

type TypeOfResult =
  | "string"
  | "number"
  | "boolean"
  | "undefined"
  | "symbol"
  | "bigint"
  | "function"
  | "object"
  | "null";

type TypeOf<T> = T extends Primitive ? TypeOfResult : "object";

export function getTypeOf<T>(value: T): TypeOf<T> {
  if (value === null) return "null" as TypeOf<T>;
  return typeof value as TypeOf<T>;
}

// // Usage examples
// const stringType = getTypeOf("hello");     // type is "string"
// const numberType = getTypeOf(42);          // type is "number"
// const booleanType = getTypeOf(true);       // type is "boolean"
// const undefinedType = getTypeOf(undefined);// type is "undefined"
// const functionType = getTypeOf(() => {});  // type is "function"
// const symbolType = getTypeOf(Symbol());    // type is "symbol"
// const objectType = getTypeOf({});          // type is "object"
// const arrayType = getTypeOf([]);           // type is "object"
// const nullType = getTypeOf(null);          // type is "null"

// // Verify types
// type StringType = typeof stringType;    // "string"
// type NumberType = typeof numberType;    // "number"
// type BooleanType = typeof booleanType;  // "boolean"
// type UndefinedType = typeof undefinedType; // "undefined"
// type FunctionType = typeof functionType;   // "function"
// type SymbolType = typeof symbolType;       // "symbol"
// type ObjectType = typeof objectType;       // "object"
// type ArrayType = typeof arrayType;         // "object"
// type NullType = typeof nullType;           // "null"
