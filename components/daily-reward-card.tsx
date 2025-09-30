"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Check } from "lucide-react"

interface DailyRewardCardProps {
  claimed: boolean
  onClaim: () => void
}

export function DailyRewardCard({ claimed, onClaim }: DailyRewardCardProps) {
  return (
    <Card className={claimed ? "opacity-60" : "border-primary/50"}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Gündəlik mükafat</CardTitle>
            <CardDescription>Hər gün 0.001 AZN qazanın</CardDescription>
          </div>
          <Gift className={`h-8 w-8 ${claimed ? "text-muted-foreground" : "text-primary"}`} />
        </div>
      </CardHeader>
      <CardContent>
        {claimed ? (
          <Button disabled className="w-full" variant="secondary">
            <Check className="mr-2 h-4 w-4" />
            Bu gün alındı
          </Button>
        ) : (
          <Button onClick={onClaim} className="w-full">
            Mükafatı al
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
