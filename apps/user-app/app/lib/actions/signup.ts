"use server"
import bcrypt from "bcrypt"
import prisma from "@repo/db/client"

export async function signUp(name: string, number: string, password: string){
  const existingUser = await prisma.user.findFirst({
    where: {
      number: number
    }
  })
  if(existingUser){
    console.log("Already exists")
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        number: number,
        password: hashedpassword
      }
    })
    const balance = await prisma.balance.create({
      data: {
        amount: 0,
        locked: 0,
        userId: user.id
      }
    })
  }catch(e){
    console.log(e);
  }
}