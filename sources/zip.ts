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


type FirstOrLast__<UA extends unknown> = (UA extends any ? (x: () => UA) => void : never) extends (x: infer P) => void
    ? P extends () => infer Return ? Return : never
    : never;

type ReInsert<T extends any[], D extends any[] = [], R = never> = T extends [infer First, ...infer Rest]
    ? D['length'] extends T['length'] ? R : ReInsert<[...Rest, First], [...D, 0], [...Rest, First] | R> | T
    : []

type ShiftChain<Tuple> = Tuple extends [infer Head, ...infer Rest]
    ? [...ShiftChain<Rest>, Head] | Tuple
    : [];


type Combo<Tupp extends any[], Res extends unknown[] = never, Cup = ShiftChain<Tupp>, CurrentCombo extends any[] = FirstOrLast__<Cup>, D extends any[] = []> = [CurrentCombo] extends [never]
    ? Res
    : Combo<never, Res | CurrentCombo | ReInsert<CurrentCombo>, Exclude<Cup, CurrentCombo>, FirstOrLast__<Exclude<Cup, CurrentCombo>>, [0, ...D]>;


type LastOf<U extends PropertyKey> = (U extends any ? (x: () => U) => void : never) extends (x: infer P) => void
    ? P extends () => infer Return ? Return : never
    : never;


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


type KeysAsTuple<Dict extends object, Result extends PropertyKey[] = []> = {
    [Key in keyof Dict]: Exclude<keyof Dict, Key> extends never ? [...Result, Key] : KeysAsTuple<Omit<Dict, Key>, [...Result, Key]>;
}[keyof Dict];

type RemoveFirstFromTuple<T extends ReadonlyArray<unknown>> =
    T['length'] extends 0 ? [] :
    (((...b: T) => void) extends (a: any, ...b: infer I) => void ? I : [])

type ZipToFlat<A extends object[], R extends unknown[] = []> = A['length'] extends 0
    ? R
    : ZipToFlat<RemoveFirstFromTuple<A>, [...R, ...KeysAsTuple<A[0]>]>

type $LastOf<U extends unknown> = (U extends any ? (x: () => U) => void : never) extends (x: infer P) => void
    ? P extends () => infer Return ? Return : never
    : never;

type UnionUnFlat<Combed, R = never> = [$LastOf<Combed>] extends [never] ? R : UnionUnFlat<Exclude<Combed, $LastOf<Combed>>, ZipToFlat<$LastOf<Combed>> | R>

// type MN = UnionUnFlat<PP1>;

type OO = ZipObject<PPP> // => todo from ziparray

type PP1 = Combo<OO>
type Var = UnionUnFlat<PP1>

let ag: Var = [
    'a1',
    'a2',
    'a3',
    'c',
    'a',
    'b',
    'b1',
    'b2',
    'b3'
]

Object.keys