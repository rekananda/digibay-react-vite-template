export const byteOptions = ['B','kB','MB','GB','TB'] as const
export type ByteUnitsT = typeof byteOptions[number];

type ComputeRange<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N ? Result : ComputeRange<N, [...Result, Result['length']]>;
type Index40 = ComputeRange<40>[number];
type IsTuple<T> = T extends readonly any[] & {
  length: infer Length;
} ? Length extends Index40 ? T : never : never;
type AllowedIndexes<Tuple extends ReadonlyArray<any>, Keys extends number = never> = Tuple extends readonly [] ? Keys : Tuple extends readonly [infer _, ...infer Tail] ? AllowedIndexes<Tail, Keys | Tail['length']> : Keys;
export type DeepKeys<T, TDepth extends any[] = []> = TDepth['length'] extends 5 ? never : unknown extends T ? string : T extends readonly any[] & IsTuple<T> ? AllowedIndexes<T> | DeepKeysPrefix<T, AllowedIndexes<T>, TDepth> : T extends any[] ? DeepKeys<T[number], [...TDepth, any]> : T extends Date ? never : T extends object ? (keyof T & string) | DeepKeysPrefix<T, keyof T, TDepth> : never;
type DeepKeysPrefix<T, TPrefix, TDepth extends any[]> = TPrefix extends keyof T & (number | string) ? `${TPrefix}.${DeepKeys<T[TPrefix], [...TDepth, any]> & string}` : never;
export type DeepKeysUnder<T, TDepth extends any[] = []> = TDepth['length'] extends 5 ? never : unknown extends T ? string : T extends readonly any[] & IsTuple<T> ? AllowedIndexes<T> | DeepKeysUnderPrefix<T, AllowedIndexes<T>, TDepth> : T extends any[] ? DeepKeys<T[number], [...TDepth, any]> : T extends Date ? never : T extends object ? (keyof T & string) | DeepKeysUnderPrefix<T, keyof T, TDepth> : never;
type DeepKeysUnderPrefix<T, TPrefix, TDepth extends any[]> = TPrefix extends keyof T & (number | string) ? `${TPrefix}_${DeepKeys<T[TPrefix], [...TDepth, any]> & string}` : never;

export interface MainConstantaI {
  env: string
}