"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface ReferralPopupProps {
  onClose: (referralCode?: string) => void
}

export function ReferralPopup({ onClose }: ReferralPopupProps) {
  const [referralCode, setReferralCode] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (referralCode.trim() && referralCode.length !== 6) {
      setError("Referans kodu 6 simvol olmalıdır")
      return
    }
    onClose(referralCode.trim() || undefined)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-background rounded-lg shadow-lg border">
        <button
          onClick={() => onClose()}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Bağla"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-balance">Xoş gəlmisiniz!</h2>
            <p className="text-muted-foreground text-pretty">
              Referans kodunuz var? Daxil edin və pul qazanmağa başlayın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="referralCode">Referans kodu (ixtiyari)</Label>
              <Input
                id="referralCode"
                type="text"
                placeholder="6 simvollu kod"
                value={referralCode}
                onChange={(e) => {
                  setReferralCode(e.target.value.toUpperCase())
                  setError("")
                }}
                maxLength={6}
                className="text-center text-lg tracking-wider"
              />
              <p className="text-xs text-muted-foreground">
                Referans kodu daxil etsəniz, sizi dəvət edən şəxs 0.001 AZN qazanacaq
              </p>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => onClose()}>
                Keç
              </Button>
              <Button type="submit" className="flex-1">
                Davam et
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
