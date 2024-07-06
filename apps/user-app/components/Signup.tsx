"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { PasswordInput, TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import { signUp } from "../app/lib/actions/signup"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if(!name || !password || !number){
      setError("All fields are required");
      return
    }
    try {
      const user = await signUp(name, number, password);
      if(user?.message){
        setError(user.message);
        return;
      }
      console.log('User signed up:', user);

      const result = await signIn("credentials", {
        phone: number,
        password: password,
        redirect: false
      });

      if (result?.error) {
        console.error('SignIn Error:', result.error);
        setError("Failed to SignIn after SignUp");
        return;
      } else {
        console.log('SignIn Successful:', result);
        router.push('/dashboard');
      }
    } catch (e) {
      console.error('SignUp Error:');
      setError("SignUp Failed Please try again later");
      return;
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex flex justify-center">
        <Card title="Signup">
          <div className="min-w-72 pt-2">
            <TextInput onChange={(e) => setName(e)} label={"Name"} placeholder={"John Doe"} />
            <TextInput onChange={(e) => setNumber(e)} label={"Number"} placeholder={"0123456789"} />
            <PasswordInput onChange={(e) => setPassword(e)} label={"Password"} placeholder={"*****"} />
          </div>
          {error && <p className="text-red-500 text-center font-semibold text-sm mt-2">{error}</p>}
          <div className="pt-4 flex justify-center">
            <Button onClick={handleSignup}>SignUp</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
