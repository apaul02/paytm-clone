import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from 'next/navigation'
import prisma from "@repo/db/client";
import { P2pTransactions } from "../../../components/p2pTransactions";
export default async function(){
  const session = await getServerSession(authOptions);
  if(!session?.user?.id){
    redirect('/api/auth/signin')
  }
  const txns = await getP2pTxns();
  return <div className="w-full">
    <div className="text-4xl text-red-300 pt-8 mb-8 font-bold">
      P2P Transactions
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
      <div>
        <SendCard />
      </div>
      <div>
        <P2pTransactions transactions={txns} />
      </div>
    </div>
  </div>
}

export async function getP2pTxns(){
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session.user.id)
    }
  })
  return txns.map(t => ({
    time: t.timestamp,
    amount: t.amount
  }))
}