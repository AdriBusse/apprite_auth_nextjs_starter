import { Avatars, Client } from "appwrite"
import { useMemo } from "react"

import { IAvartarOps } from "./types"
import { wrap } from "./utils"

export default function useAvatar(client: Client): IAvartarOps {
  const avatar = useMemo(() => {
    return new Avatars(client)
  }, [client])

  async function getCreditCard(name: string) {
    const wrapped = await wrap(() => {
      return avatar.getCreditCard(name)
    })
    return wrapped
  }

  async function getBrowserIcon(name: string) {
    const wrapped = await wrap(() => {
      return avatar.getBrowser(name)
    })
    return wrapped
  }

  async function getCountryFlag(name: string) {
    const wrapped = await wrap(() => {
      return avatar.getFlag(name)
    })
    return wrapped
  }

  async function getQR(url: string) {
    const wrapped = await wrap(() => {
      return avatar.getQR(url)
    })
    return wrapped
  }

  async function getInitials() {
    const wrapped = await wrap(() => {
      return avatar.getInitials()
    })
    return wrapped
  }

  return {
    getCreditCard,
    getBrowserIcon,
    getCountryFlag,
    getQR,
    getInitials,
  }
}
