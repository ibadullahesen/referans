"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins } from "lucide-react"

interface BalanceCardProps {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const displayBalance = balance ?? 0

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardDescription className="text-foreground/70">Balansınız</CardDescription>
        <CardTitle className="text-4xl font-bold flex items-center gap-2">
          <Coins className="h-8 w-8 text-primary" />
          {displayBalance.toFixed(3)} AZN
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Hər gün sayta daxil olaraq və dostlarınızı dəvət edərək pul qazanın
        </p>
      </CardContent>
    </Card>
  )
}
