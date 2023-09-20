"use client"

import { IResultError } from "@/hooks/types"
import useAppwrite from "@/hooks/useAppwrite"
import React, { useEffect } from "react"

import { useRouter } from "next/navigation"

function Signup() {
  const { account } = useAppwrite()
  const router = useRouter()

  useEffect(() => {
    if (!account.loading && account.user) {
      router.push("/")
    }
  }, [account.user, account.loading])

  const onRegisterClick = async (
    email: string,
    password: string,
    name: string
  ): Promise<IResultError<boolean>> => {
    const [session, error] = await account.operations.register(
      email,
      password,
      name
    )
    return [session !== null, error]
  }
  if (account.loading) return <p>Loading...</p>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          onRegisterClick("johndoe@Mail123.com", "mypassword123", "John Doe")
        }}
      >
        SignUp
      </button>
    </main>
  )
}

export default Signup
