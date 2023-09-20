"use client"

import useAppwrite from "@/hooks/useAppwrite"
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { User } from "@nextui-org/user"
import React, { useEffect } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import IconBell from "../Icons/IconBell"
import IconChats from "../Icons/IconChats"
import IconLogout from "../Icons/IconLogout"

function UserButtons() {
  const { account, avatar } = useAppwrite()
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0"
  const router = useRouter()

  useEffect(() => {
    console.log({ error: account.error, user: account.user })
  }, [account.user])

  if (account.loading) {
    return <></>
  }
  if (!account.loading && account.user === null) {
    return (
      <NavbarContent justify="end">
        <NavbarItem className="">
          <Link href="/auth/login">
            <Button as={Link} color="primary" href="/auth/login" variant="flat">
              Login
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/auth/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    )
  }
  if (!account.loading && account.user !== null) {
    return (
      <>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              This
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Are
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Samples
            </Link>
          </NavbarItem>
          <NavbarItem className="">
            <Dropdown>
              <DropdownTrigger>
                <Avatar name="Test" />
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
              >
                <DropdownItem isDisabled className="h-14 gap-2 opacity-100">
                  <User
                    name="Jane Doe"
                    description="Product Designer"
                    avatarProps={{
                      src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                  />
                </DropdownItem>
                <DropdownItem
                  key="Profile"
                  shortcut="⌘N"
                  description="Visit your Profile"
                  startContent={<IconBell className={iconClasses} />}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="setting"
                  showDivider
                  shortcut="⌘C"
                  description="Shows your settings"
                  startContent={<IconChats className={iconClasses} />}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  description="Copy the file link"
                  startContent={<IconLogout className={iconClasses} />}
                  onClick={() => {
                    account.operations.logout()
                    router.push("/")
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </>
    )
  }
}

export default UserButtons
