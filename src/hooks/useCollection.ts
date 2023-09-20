import { Client, Databases, ID } from "appwrite"
import { useMemo } from "react"

import { ICollectionOps } from "./types"
import { wrap } from "./utils"

export default function useCollection(
  client: Client,
  databaseId: string
): ICollectionOps {
  const databases = useMemo(() => {
    return new Databases(client)
  }, [client])

  async function create(collectionId: string, data: any, documentId?: string) {
    return wrap(() =>
      databases.createDocument(
        databaseId,
        collectionId,
        documentId ?? ID.unique(),
        data
      )
    )
  }

  async function read(collectionId: string, documentId: string) {
    return wrap(() =>
      databases.getDocument(databaseId, collectionId, documentId)
    )
  }

  async function update(collectionId: string, documentId: string, data: any) {
    return wrap(() =>
      databases.updateDocument(databaseId, collectionId, documentId, data)
    )
  }

  async function remove(collectionId: string, documentId: string) {
    return wrap(() =>
      databases.deleteDocument(databaseId, collectionId, documentId)
    )
  }

  async function query(collectionId: string, queries?: string[]) {
    return wrap(() =>
      databases.listDocuments(databaseId, collectionId, queries)
    )
  }

  return {
    query,
    create,
    read,
    update,
    remove,
  }
}
