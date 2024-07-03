import { Card } from "@repo/ui/card"

export function P2pTransactions  ({
    transactions
  }: { 
    transactions: {
        time: Date,
        amount: number,
        type: string
    }[]
}) {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.slice().reverse().slice(0,6).map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {t.type === "sent" ? "Sent INR" : "Received INR"}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className={`flex flex-col justify-center ${t.type === "sent" ? "text-red-500" : "text-green-500"} font-semibold`}>
                {t.type === "sent" ? "-" : "+"} Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}