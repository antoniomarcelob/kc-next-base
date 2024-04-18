'use client'

import SigninButton from "@/components/SigninButton"
import SignoutButton from "@/components/SignoutButton"
import { useSession } from "next-auth/react"
 
export default function SignIn() {

   const session = useSession()

   if(session && session.status === 'authenticated') {

     return (
        <>
          <SigninButton />
          <SignoutButton />
       </>
      )
    } 

    return (
      <SigninButton />
      )

} 