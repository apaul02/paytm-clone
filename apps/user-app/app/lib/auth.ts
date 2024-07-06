import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import db from "@repo/db/client";




export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Number',
      credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "123456789"},
        password: { label: "Password", type: "password"}
      },
      async authorize(credentials: any){
        const hashedpassword = await bcrypt.hash(credentials.password, 10)
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone
          }
        })
        if(!existingUser){
          return null
        }
        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
        if(passwordValidation){
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email
          };
        }else{
          return null;
        }
        // try{
        // const hashedpassword = await bcrypt.hash(credentials.password, 10)
        // const existingUser = await db.user.findFirst({
        //   where: {
        //     number: credentials.phone
        //   },
        // })

        // if(existingUser){
        //   const passwordvalidation = await bcrypt.compare(credentials.password, existingUser.password)
        //   if(passwordvalidation) {
        //     return {
        //       id: existingUser.id.toString(),
        //       name: existingUser.name,
        //       email: existingUser.email
        //     }
        //   }
        //   return null
        // }}
        // catch(e){
        //   console.log(e);
        // }

        // try {
        //   const user = await db.user.create({
        //     data: {
        //       number: credentials.phone,
        //       password: hashedpassword
        //     }
        //   })
        //   const balance = await db.balance.create({
        //     data: {
        //       amount: 0,
        //       userId: user.id,
        //       locked: 0
        //     }
        //   })
        //   return {
        //     id: user.id.toString(),
        //     name: user.name,
        //     email: user.email
        //   }
        // }catch(e){
        //   console.log(e);
        // }
        // return null;  
      },

    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({token, session}: any) {
      session.user.id = token.sub

      return session
    }
  }
}