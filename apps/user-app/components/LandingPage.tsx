"use client"
import { Button } from "@repo/ui/button"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"

export const LandingPage = () => {
const router = useRouter();
  return<div>
    <div className="flex flex-col justify-center h-scree">
      <div className="flex justify-center">
        <div>
          landing page
        </div>
        <div>
          <Button onClick={signIn}>Signin</Button>
          <Button onClick={() => { router.push('/signup')}}>SignUp</Button>
        </div>
      </div>
    </div>
  </div>
}