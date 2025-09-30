"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Users2 } from "lucide-react"

export function EarningCards() {
  const cards = [
    {
      id: 1,
      title: "Gündəlik giriş",
      description: "Hər gün sayta daxil olun",
      reward: "0.001 AZN",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "Referans bonusu",
      description: "Dostlarınızı dəvət edin",
      reward: "0.001 AZN",
      icon: Users2,
      color: "text-purple-500",
    },
    {
      id: 3,
      title: "Aktiv olun",
      description: "Davamlı olaraq sayta daxil olun",
      reward: "Bonus",
      icon: TrendingUp,
      color: "text-primary",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Icon className={`h-6 w-6 ${card.color}`} />
                <span className="text-sm font-bold text-primary">{card.reward}</span>
              </div>
              <CardTitle className="text-lg">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
