import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
export const authOptions = {
    providers: [
       CredentialsProvider({
        name: 'Email',
        credentials: {
          phone: {label: "Phone Number", type: "text", placeholder: "123456789"},
          password: {label: "Password", type: "password", placeholder: ""}
        },
        async authorize(credentials: any){
          const hashedpassword = await bcrypt.hash(credentials.password, 10);
          const existingMerchant = await db.merchant.findFirst({
            where: {
              number: credentials.phone
            }
          })
          if(existingMerchant){
            const passwordvalidation = await bcrypt.compare(credentials.password, existingMerchant.password)
            if(passwordvalidation) {
              return {
                id: existingMerchant.id.toString(),
                name: existingMerchant.name,
                email: existingMerchant.email
              }
            }
            return null
          }

          try {
            const merchant = await db.merchant.create({
              data: {
                number: credentials.phone,
                password: hashedpassword
              }
            })
            return {
              id: merchant.id.toString(),
              name: merchant.name,
              email: merchant.email
            }
          }catch(e){
            console.log(e)
          }
          return null
        }
       })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
      async session({token, session}: any){
        session.user.id = token.sub

        return session
      }
    }
    
  }