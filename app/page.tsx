"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { BalanceCard } from "@/components/balance-card"
import { DailyRewardCard } from "@/components/daily-reward-card"
import { ReferralCard } from "@/components/referral-card"
import { EarningCards } from "@/components/earning-cards"
import { ReferralPopup } from "@/components/referral-popup"
import {
  getCurrentUser,
  logout,
  checkDailyReward,
  createAnonymousUser,
  getOrCreateAnonymousUser,
  onAuthChange,
} from "@/lib/auth"
import type { User } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles, TrendingUp } from "lucide-react"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showReferralPopup, setShowReferralPopup] = useState(false)

  useEffect(() => {
    setMounted(true)

    const hasVisited = localStorage.getItem("hasVisited")

    const unsubscribe = onAuthChange((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const today = new Date().toDateString()
        setDailyRewardClaimed(currentUser.lastLoginDate === today)
      }
    })

    if (!hasVisited) {
      // First visit - show referral popup
      setShowReferralPopup(true)
      localStorage.setItem("hasVisited", "true")
    } else {
      getOrCreateAnonymousUser().then((currentUser) => {
        setUser(currentUser)
        const today = new Date().toDateString()
        setDailyRewardClaimed(currentUser.lastLoginDate === today)
      })
    }

    return () => unsubscribe()
  }, [])

  const handleReferralPopupClose = async (referralCode?: string) => {
    setShowReferralPopup(false)

    const newUser = await createAnonymousUser(referralCode)
    setUser(newUser)

    // Check and claim daily reward automatically
    const claimed = await checkDailyReward()
    setDailyRewardClaimed(true)

    if (claimed) {
      // Refresh user data to show updated balance
      const updatedUser = await getCurrentUser()
      if (updatedUser) {
        setUser(updatedUser)
      }
    }
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
    setDailyRewardClaimed(false)
    // Reset to show popup again
    localStorage.removeItem("hasVisited")
    setShowReferralPopup(true)
  }

  const handleClaimReward = async () => {
    const claimed = await checkDailyReward()
    if (claimed) {
      setDailyRewardClaimed(true)
      // Refresh user data to show updated balance immediately
      const updatedUser = await getCurrentUser()
      if (updatedUser) {
        setUser(updatedUser)
      }
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  if (showReferralPopup) {
    return <ReferralPopup onClose={handleReferralPopupClose} />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header username={user.username} userId={user.id} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-3 text-center md:text-left">
          <h2 className="text-4xl font-bold text-balance">
            Pul Qazanmağa Başlayın <span className="text-primary">💰</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
            Hər gün sayta daxil olun, dostlarınızı dəvət edin və asanlıqla pul qazanın. Qazandığınız pulu AxtarGet
            xidmətlərində istifadə edin və ya kartınıza köçürün!
          </p>
        </div>

        <BalanceCard balance={user.balance} />

        <div className="grid gap-6 md:grid-cols-2">
          <DailyRewardCard claimed={dailyRewardClaimed} onClaim={handleClaimReward} />
          <ReferralCard referralCode={user.referralCode} />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Pul qazanma yolları</h3>
          <EarningCards />
        </div>

        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold">Tezliklə gələcək!</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Yeni görəvlər sistemi</strong> tezliklə əlavə olunacaq! Müxtəlif
            tapşırıqları yerinə yetirərək daha çox pul qazana biləcəksiniz. Aktiv qalın və daha çox qazanın!
          </p>
        </div>

        <div className="rounded-lg bg-card border shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold">Haqqında</h3>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              AxtaGet platformasında qazandığınız pulları müxtəlif xidmətlərdə istifadə edə bilərsiniz:
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="https://axtarget.xyz/follower-service.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full justify-between group hover:border-primary bg-transparent">
                  <span>Takipçi Xidməti</span>
                  <ExternalLink className="h-4 w-4 group-hover:text-primary transition-colors" />
                </Button>
              </a>

              <a href="https://axtarget.xyz/prmiumCV.html" target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" className="w-full justify-between group hover:border-primary bg-transparent">
                  <span>CV Hazırlanması</span>
                  <ExternalLink className="h-4 w-4 group-hover:text-primary transition-colors" />
                </Button>
              </a>
            </div>

            <div className="rounded-lg bg-muted p-4 space-y-2">
              <p className="text-sm font-medium">💳 Pul çıxarışı</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pul çıxarışı sistemi hazırlanır. Tezliklə qazandığınız pulları birbaşa bank kartınıza köçürə
                biləcəksiniz. Aktiv qalın və balansınızı artırın!
              </p>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Qeyd:</strong> Bu platforma AxtarGet MMC tərəfindən yaradılmışdır. 
              Sizin rəqəmsal dünyaznız olmağa və daima yeniliklərlə qarşınıza çıxacağıq. İzləmədə qalın).
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
