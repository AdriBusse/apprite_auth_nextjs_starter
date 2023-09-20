import { Models } from "appwrite"

export type IResultError<T> = [T | null, any | null]

export interface IAccountOps {
  user: Models.User<Models.Preferences> | null
  loading: boolean
  error: string | null
  operations: {
    getAccount: () => Promise<IResultError<Models.User<Models.Preferences>>>
    register: (
      email: string,
      password: string,
      name?: string
    ) => Promise<IResultError<Models.Session>>
    login: (
      email: string,
      password: string
    ) => Promise<IResultError<Models.Session>>
    logout: () => Promise<void>
  }
}

export interface ICollectionOps {
  query: (
    collectionId: string,
    queries?: string[]
  ) => Promise<IResultError<Models.DocumentList<Models.Document>>>
  create: (
    collectionId: string,
    data: any,
    documentId?: string
  ) => Promise<IResultError<Models.Document>>
  read: (
    collectionId: string,
    documentId: string
  ) => Promise<IResultError<Models.Document>>
  update: (
    collectionId: string,
    documentId: string,
    data: any
  ) => Promise<IResultError<Models.Document>>
  remove: (
    collectionId: string,
    documentId: string
  ) => Promise<IResultError<object>>
}

export interface IBucketOps {
  create: (data: File) => Promise<IResultError<Models.File>>
  getFile: (fileId: string) => URL
}

export interface IAvartarOps {
  getCreditCard: (name: string) => Promise<IResultError<URL>>
  getBrowserIcon: (name: string) => Promise<IResultError<URL>>
  getCountryFlag: (name: string) => Promise<IResultError<URL>>
  getQR: (url: string) => Promise<IResultError<URL>>
  getInitials: () => Promise<IResultError<URL>>
}
