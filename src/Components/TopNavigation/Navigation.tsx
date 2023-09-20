"use client"

import UserButtons from "@/Components/TopNavigation/UserButtons"
import { Navbar, NavbarBrand } from "@nextui-org/react"
import React from "react"

import Link from "next/link"

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href={"/"}>
          <p className="font-bold text-inherit">AcamunitY</p>
        </Link>
      </NavbarBrand>
      <UserButtons />
    </Navbar>
  )
}
