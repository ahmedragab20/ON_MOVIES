export interface IGeneric {
  [key: string]: any
}

export interface IMovie {
  id: string
  title: string
  description: string
  year: number
  actors: IActor[]
}

export interface IActor {
  id: string
  name: string
  age: number
  join_date: Date
  role: TActorRole
}

export type TActorRole =
  | 'Background role'
  | 'Cameo'
  | 'Recurring character'
  | 'Side character'
  | 'Series regular'
