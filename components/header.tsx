"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Wallet, User } from "lucide-react"

interface HeaderProps {
  username: string
  userId: string
  onLogout: () => void
}

export function Header({ username, userId, onLogout }: HeaderProps) {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">AxtaGet</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Salam, <span className="font-medium text-foreground">{username}</span>
            </span>
            <Button onClick={onLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Çıxış
            </Button>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span>
            İstifadəçi ID: <span className="font-mono font-medium text-foreground">{userId}</span>
          </span>
        </div>
      </div>
    </header>
  )
}
