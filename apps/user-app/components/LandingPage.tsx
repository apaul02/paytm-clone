"use client"
import { Button } from "@repo/ui/button"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"

export const LandingPage = () => {
const router = useRouter();
  return<div>
    <div className="grid grid-cols-2 p-4">
      <div>
        <div className="flex flex-col justify-center h-screen">
          <div className="pl-4">
            <div className="text-6xl font-bold pb-2">
              Take Control of Your Finances with MoneyZ
            </div>
            <p className="max-w-[600px] text-slate-500 md:text-xl">
              MoneyZ is a powerful payment app that helps you manage your money with ease. Track your spending,
              set budgets, and make payments all in one place.
            </p>
            <div className="flex pt-10 gap-6">
              <Button onClick={signIn}>SignIn</Button>
              <Button onClick={() => router.push("/signup")}>Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center h-screen">
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="max-w-[500px] text-2xl  text-black">
              "I love how easy it is to make payments with MoneyZ. The app is intuitive and user-friendly, which makes managing my finances a  breeze."
            </div>
            <div className="pt-2 pl-4 italic text-lg text-slate-500">
              - Jane Smith
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-slate-100 ">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center" >
          <div className="text-5xl text-center font-bold pt-20 pb-5">
            Payments Made Easy
          </div>
          <div className="text-slate-500 text-xl max-w-[900px] text-center">
          MoneyZ offers a suite of features to help you take control of your finances, including budgeting, spending tracking, and easy payments
          </div>
          <div className="pt-20 flex justify-center gap-10 pb-10">
            <div>
              <div className="max-w-[300px]">
                <div className="text-2xl font-bold pb-2">
                  Easy Payments
                </div>
                <div className="text-slate-500">
                Make payments to friends, family, or businesses with just a few taps. MoneyZ supports a variety of payment methods.
                </div>
              </div>
            </div>
            <div>
              <div className="max-w-[300px]">
                <div className="text-2xl font-bold pb-2">
                  Spending Tracking
                </div>
                <div className="text-slate-500">
                  Easily track your spending across multiple accounts and categories to gain insights into your financial habits. 
                </div>
              </div>
            </div>
            <div>
              <div className="max-w-[300px]">
                <div className="text-2xl font-bold pb-2">
                  Budgeting
                </div>
                <div className="text-slate-500">
                  Set budgets for your expenses and track your spending to stay on top of your finances.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}