




type Props = {
    id: number;
    id_user: string;
    is_active: boolean;
    isactive: boolean;
};


type TableKeys = ArrayOfKeys<Props>;








type LastOf<U extends PropertyKey> = (U extends any ? (x: () => U) => void : never) extends (x: infer P) => void
    ? P extends () => infer Return ? Return : never
    : never;


// type KeysToTuple<Obj extends string, Res extends any[] = [], L = LastOf<Obj>> = [Obj] extends [never]
//     ? Res
//     : KeysToTuple<Exclude<Obj, L>, [L, ...Res]>;

type ObjectLength<T extends object, A extends PropertyKey[] = [], L extends PropertyKey = LastOf<keyof T>> = [L] extends [never]
    ? A['length']
    : ObjectLength<Omit<T, L>, [L, ...A]>

type LO = ObjectLength<Props>
let r: LO = 4


type ArrayOfKeys<O extends object, R extends PropertyKey[] = [], L extends PropertyKey = LastOf<keyof O>> = [L] extends [never]
    ? R
    : ArrayOfKeys<Omit<O, L>, [L, ...R]>;



// type KeysArray<FieldKeys extends string, Result extends string[] = []> = {
//     [Key in FieldKeys]: Exclude<FieldKeys, Key> extends never ? [...Result, Key] : KeysArray<Exclude<FieldKeys, Key>, [...Result, Key]>;
// }[FieldKeys];

type KeysAsTuple<Dict extends object, Result extends PropertyKey[] = []> = {
    [Key in keyof Dict]: Exclude<keyof Dict, Key> extends never ? [...Result, Key] : KeysAsTuple<Omit<Dict, Key>, [...Result, Key]>;
}[keyof Dict];



type F = ArrayOfKeys<Props>
// type F = KeysAsTuple<Table>
let aa: F = [
    'id',
    'id_user',    
    'is_active',
    'isactive'
]




export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never





type OOO = LastOf<'123' | '789'>
let oo: OOO = '789'
//@ts-expect-error
let oo1: OOO = '123'











// [1,2] => [1,2] | [2,1]

// type ROP = Enumerate<7>
type PPP = {
    a: string,
    b: string,
    c: string,
    a1: string,
    a2: string,
    a3: string,
    b1: string,
    b2: string,
    b3: string,
}
type PP = 'Too much fields'

// type KeysAsTuple<O extends object, L extends Enumerate<3> = ObjectLength<O>> = ArrayOfKeys<O>
// // type OPp = KeysAsTuple<ArrayOfKeys<PPP>>
// type OPp1 = ArrayOfKeys<PPP>









// type TupleSplitHead<T extends any[], N extends number> = T['length'] extends N
//     ? T
//     : T extends [...infer R, any]
//     ? TupleSplitHead<R, N>
//     : never

// type TupleSplitTail<T, N extends number, O extends any[] = []> = O['length'] extends N
//     ? T
//     : T extends [infer F, ...infer R]
//     ? TupleSplitTail<[...R], N, [...O, F]>
//     : never

// type TupleSplit<T extends any[], N extends number> = [TupleSplitHead<T, N>, TupleSplitTail<T, N>]


// // type ModifiedTupleSplit = TupleSplit<[a: 1, b: 2, c: 3, d: 4, e: 5], 2>
// // [[a: 1, b: 2], [c: 3, d: 4, e: 5]]

// // type Insert<T extends any[], N extends number, V, C extends any[] = []> = [...TupleSplitHead<T, N>, V, ...TupleSplitTail<T, N>]

// type Insert<T extends any[], V, C extends any[] = [0], R = never> = C['length'] extends T['length']
//     ? R | [...TupleSplitHead<T, C['length']>, V, ...TupleSplitTail<T, C['length']>]
//     : Insert<T, V, [0, ...C], R | [...TupleSplitHead<T, C['length']>, V, ...TupleSplitTail<T, C['length']>]>


// type YFFF = Insert<[1, 2, 3, 4, 5, 6], ''>




type FirstOrLast__<UA extends unknown> = (UA extends any ? (x: () => UA) => void : never) extends (x: infer P) => void
    ? P extends () => infer Return ? Return : never
    : never;


type ShiftChain<Tuple> = Tuple extends [infer Head, ...infer Rest]
    ? [...ShiftChain<Rest>, Head] | Tuple
    : [];

type RemoveFirstFromTuple<T extends ReadonlyArray<unknown>> =
    T['length'] extends 0 ? [] :
    (((...b: T) => void) extends (a: any, ...b: infer I) => void ? I : [])

type ReInsert<T extends any[], D extends any[] = [], R = never> = T extends [infer First, ...infer Rest]
    ? D['length'] extends T['length'] ? R : ReInsert<[...Rest, First], [...D, 0], [...Rest, First] | R> | T
    : []



type Combo<Tupp extends any[], Res extends unknown[] = never, Cup = ShiftChain<Tupp>, CurrentCombo extends any[] = FirstOrLast__<Cup>, D extends any[] = []> = [CurrentCombo] extends [never]
    ? Res
    : Combo<never, Res | CurrentCombo | ReInsert<CurrentCombo>, Exclude<Cup, CurrentCombo>, FirstOrLast__<Exclude<Cup, CurrentCombo>>, [0, ...D]>;
// | ShiftChain<ReInsert<CurrentCombo>>



type LLL = ReInsert<[1, 2, 3, 4]>
type OOOO = Combo<[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>
//@ts-expect-error
const test: ShiftChain<[4, 1, 2, 3]> = [4, 3, 2, 1];



type $ObjectArray_<T extends object, A extends PropertyKey[] = [], L extends PropertyKey = LastOf<keyof T>> = [L] extends [never]
    ? A
    : $ObjectArray_<Omit<T, L>, [L, ...A]>


type ReplaceFirst<A extends ReadonlyArray<unknown>> = ''


type TupleLikeOf<Keys extends PropertyKey, Result extends PropertyKey[] = []> = {
    [Key in Keys]: Exclude<Keys, Key> extends never ? [...Result, Key] : TupleLikeOf<Exclude<Keys, Key>, [...Result, Key]>;
}[Keys];

let rr = [10, 2, 3] as const
let rtr: TupleLikeOf<(typeof rr)[number]> = [2,3,10]


// type RemoveFirstFromTuple<T extends any[]> =
//     T['length'] extends 0 ? undefined :
//     (((...b: T) => void) extends (a, ...b: infer I) => void ? I : [])

// KeysAsTuple

/**
 * @param {OR} - object
 */
type ZipObject<O extends object, OR extends object = {}, R extends object[] = [], ORLC extends any[] = [], LIMIT extends number = 3, F extends keyof O = LastOf<keyof O>> = [F] extends [never]
    ? [...R, OR]
    : ZipObject<
        Omit<O, F>,
        ORLC['length'] extends LIMIT ? { [K in F]: O[F] } : OR & { [K in F]: O[F] },
        ORLC['length'] extends LIMIT ? [...R, OR] : R,
        ORLC['length'] extends LIMIT ? [] : [0, ...ORLC]>


// type ZipObject_<O extends object, LIMIT extends number = 3, R extends object[] = [], COUNT extends any[] = [], F extends keyof O = LastOf<keyof O>> = [F] extends [never]
//     ? R
//     : ZipObject<Omit<O, F>, LIMIT, [R[COUNT['length']] extends object ? R[0] & { [K in F]: O[F] } : { [K in F]: O[F] }, ...R], [0, ...COUNT]>
    
type OO = ZipObject<PPP> // => todo from ziparray

type ZipToFlat<A extends object[], R extends unknown[] = []> = A['length'] extends 0
    ? R
    : ZipToFlat<RemoveFirstFromTuple<A>, [...R, ...KeysAsTuple<A[0]>]>

type PP1 = Combo<OO>


// type LL = TupleLikeOf<PP1>


type $LastOf<U extends unknown> = (U extends any ? (x: () => U) => void : never) extends (x: infer P) => void
    ? P extends () => infer Return ? Return : never
    : never;


type UnionUnFlat<Combed, R=never> = [$LastOf<Combed>] extends [never] ? R : UnionUnFlat<Exclude<Combed, $LastOf<Combed>>, ZipToFlat<$LastOf<Combed>> | R>
type MN = UnionUnFlat<PP1>;

// ZipToFlat<OO>
//@ts-expect-error
let ag: UnionUnFlat<PP1> = [
    'a1',
    'a2',
    'a3',
    'a',
    'b',
    'c',
    'b1',
    'b2',
    'b3'
]