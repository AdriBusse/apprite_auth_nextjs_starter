import { Account, Client, ID, Models } from "appwrite"
import { useEffect, useMemo, useState } from "react"

import { IAccountOps } from "./types"
import { wrap } from "./utils"

export default function useAccount(client: Client): IAccountOps {
  const account = useMemo(() => {
    return new Account(client)
  }, [client])

  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const [user, error] = await getAccount()
      if (error) {
        setError(error)
      } else if (user) {
        setUser(user)
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  async function register(email: string, password: string, name?: string) {
    const wrapped = await wrap(() => {
      return account.create(ID.unique(), email, password, name)
    })

    const accInfor = await account.get()
    setUser(accInfor)
    setError(wrapped[1])
    return wrapped
  }

  async function login(email: string, password: string) {
    const wrapped = await wrap(() => {
      return account.createEmailSession(email, password)
    })
    if (wrapped[0] === null) {
      setError(wrapped[1])
      return wrapped
    }
    const accInfor = await getAccount()
    setUser(accInfor[0])
    setError(wrapped[1])
    return wrapped
  }

  async function logout() {
    try {
      await account.deleteSession("current")
      setUser(null)
    } catch (error: any) {
      setError(error)
    }
  }

  async function getAccount() {
    return wrap(() => account.get())
  }

  return {
    user,
    loading,
    error,
    operations: { getAccount, register, login, logout },
  }
}
