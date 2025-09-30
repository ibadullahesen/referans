"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Copy, Check } from "lucide-react"

interface ReferralCardProps {
  referralCode: string
}

export function ReferralCard({ referralCode }: ReferralCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Referans sistemi</CardTitle>
            <CardDescription>Dostlarınızı dəvət edin və 0.001 AZN qazanın</CardDescription>
          </div>
          <Users className="h-8 w-8 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Sizin referans kodunuz:</p>
          <div className="flex gap-2">
            <Input value={referralCode} readOnly className="font-mono text-lg font-bold" />
            <Button onClick={handleCopy} variant="outline" size="icon">
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="rounded-lg bg-muted p-4 space-y-2">
          <p className="text-sm font-medium">Necə işləyir?</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Kodunuzu dostlarınızla paylaşın</li>
            <li>Onlar qeydiyyatdan keçərkən kodu daxil etsinlər</li>
            <li>Hər yeni istifadəçi üçün 0.001 AZN qazanın</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
