import { IAccountOps, IAvartarOps, IBucketOps, ICollectionOps } from "./types"
import useAccount from "./useAccount"
import useAvatar from "./useAvatar"
import useBucket from "./useBucket"
import useClient from "./useClient"
import useCollection from "./useCollection"

export default function useAppwrite(): {
  account: IAccountOps
  collection: ICollectionOps
  bucket: IBucketOps
  avatar: IAvartarOps
} {
  if (
    !process.env.NEXT_PUBLIC_ENDPOINT ||
    !process.env.NEXT_PUBLIC_PROJECT ||
    !process.env.NEXT_PUBLIC_APPWRITE_DATABASE ||
    !process.env.NEXT_PUBLIC_APPWRITE_BUCKET
  ) {
    throw new Error(
      "Appwrite endpoint, project id, database id and bucket id not set"
    )
  }

  const client = useClient(
    process.env.NEXT_PUBLIC_ENDPOINT,
    process.env.NEXT_PUBLIC_PROJECT
  )

  const account = useAccount(client)
  const collection = useCollection(
    client,
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE
  )
  const bucket = useBucket(client, process.env.NEXT_PUBLIC_APPWRITE_BUCKET)
  const avatar = useAvatar(client)

  return { account, collection, bucket, avatar }
}
