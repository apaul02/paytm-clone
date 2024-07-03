import { getServerSession } from "next-auth";
import { Signup } from "../../components/Signup";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function(){
  const session = await getServerSession(authOptions);
  if(session?.user?.id){
    redirect('/dashboard')
  }
  return <div>
    <Signup />
  </div>
}