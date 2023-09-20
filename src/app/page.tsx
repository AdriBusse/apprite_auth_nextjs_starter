"use client"

import useAppwrite from "@/hooks/useAppwrite"
import { Button } from "@nextui-org/button"

export default function Home() {
  const { account } = useAppwrite()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me</Button>

      <button
        onClick={async () => {
          await account.operations.login("johndoe@mali.com", "test1234")
        }}
      >
        login
      </button>
    </main>
  )
}
