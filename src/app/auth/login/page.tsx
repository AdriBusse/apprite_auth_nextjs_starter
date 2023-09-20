"use client"

import useAppwrite from "@/hooks/useAppwrite"
import { yupResolver } from "@hookform/resolvers/yup"
import { CardFooter, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { Button, Card, CardBody } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import Link from "next/link"
import { useRouter } from "next/navigation"

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required()

function Login() {
  const { account } = useAppwrite()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!account.loading && account.user) {
      router.push("/profile")
    }
  }, [account.user, account.loading])

  const onLoginSubmit = async () => {
    const [session, error] = await account.operations.login(
      getValues().email,
      getValues().password
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card
        isBlurred
        className="w-full border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="sm"
      >
        <CardHeader>
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Login
          </h5>
        </CardHeader>
        <CardBody>
          <div className={"h-4 mb-4"}>
            {account.error && (
              <small className={"text-red-500"}>{account.error}</small>
            )}
          </div>
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <div className="flex flex-col w-full mb-6 md:mb-0 ">
              <div className={"h-24"}>
                <Input
                  className={"mb-8"}
                  isInvalid={errors.email?.message !== undefined}
                  errorMessage={errors.email?.message}
                  {...register("email")}
                  type="text"
                  label="Email"
                  isRequired
                />
              </div>
              <div className={"h-24"}>
                <Input
                  className={"mb-8"}
                  isInvalid={errors.password?.message !== undefined}
                  errorMessage={errors.password?.message}
                  type="password"
                  {...register("password")}
                  label="Password"
                  isRequired
                />
              </div>
            </div>
            <Button type="submit" color="primary">
              Login
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <p>
            <small>
              No account yet?{" "}
              <Link className="underline text-blue3" href="signup">
                SignUp
              </Link>{" "}
              now!
            </small>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Login
