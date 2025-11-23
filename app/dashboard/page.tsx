"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, LogOut, CalendarIcon, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { VaccineCalendar } from "@/components/ui/vaccine-calendar"
import { VaccineList } from "@/components/ui/vaccine-list"
import { Sidebar } from "@/components/ui/sidebar"
import { VaccineScheduleForm } from "@/components/ui/vaccine-schedule-form"
import { SettingsModal } from "@/components/ui/settings-modal"
import { historicoService, type Estatisticas } from "@/services/api"
import UserList from "@/components/ui/user-list"

interface User {
  email: string
  name: string
  id: string | number
  isAdmin?: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [stats, setStats] = useState<Estatisticas | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) router.push("/login")
    else setUser(JSON.parse(storedUser))
  }, [router])

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return
      try {
        const data = await historicoService.obterEstatisticas(Number(user.id))
        setStats(data)
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error)
      }
    }
    if (user) fetchStats()
  }, [user, refreshKey])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleRefresh = () => setRefreshKey(prev => prev + 1)

  if (!user) return null
  const usuarioId = Number(user.id)

  const total =
    (stats?.doses_aplicadas ?? 0) +
    (stats?.doses_pendentes ?? 0) +
    (stats?.doses_atrasadas ?? 0)
  const completionRate = total > 0 ? Math.round(((stats?.doses_aplicadas ?? 0) / total) * 100) : 0

  const greeting = (() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bom dia"
    if (hour < 18) return "Boa tarde"
    return "Boa noite"
  })()

  return (
    <div className="min-h-screen bg-secondary/30 dark:bg-gray-900 flex">
      {/* SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSettingsOpen={() => setIsSettingsOpen(true)}
        isAdmin={user.isAdmin}
      />

      {/* MODAL */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">

            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Imunetrack" width={80} height={80} priority />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 bg-clip-text text-transparent">
                ImuneTrack
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-right hidden sm:block">
                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">

          {activeTab === "dashboard" && (
            <>
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 p-8 text-white shadow-xl mb-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-6 w-6 text-white/90" />
                    <span className="text-sm font-medium opacity-90">
                      {greeting}!
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold mb-2 tracking-tight">{user.name}</h2>
                  <p className="text-lg opacity-90 mb-6">
                    Você está {completionRate}% em dia com suas vacinas
                  </p>

                  <div className="max-w-md">
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-full bg-white/90 rounded-full transition-all duration-1000 shadow-lg"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                    <p className="text-sm mt-2 opacity-75">
                      {stats?.doses_aplicadas ?? 0} de {total} doses aplicadas
                    </p>
                  </div>
                </div>
              </div>

              {/* STATS */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="hover-lift bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="flex items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Vacinas Aplicadas</CardTitle>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.doses_aplicadas ?? 0}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Doses completas</p>
                  </CardContent>
                </Card>

                <Card className="hover-lift bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="flex items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                    <Clock className="h-5 w-5 text-teal-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.doses_pendentes ?? 0}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Agendadas</p>
                  </CardContent>
                </Card>

                <Card className="hover-lift bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="flex items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Atrasadas</CardTitle>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.doses_atrasadas ?? 0}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Doses atrasadas</p>
                  </CardContent>
                </Card>
              </div>

              {/* GRID PRINCIPAL */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
                      <CheckCircle2 className="h-5 w-5 text-teal-600" />
                      Suas Vacinas
                    </CardTitle>
                    <CardDescription>Histórico e próximas doses programadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VaccineList usuarioId={usuarioId} key={refreshKey} />
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                      Calendário de Vacinação
                    </CardTitle>
                    <CardDescription>Datas programadas para suas vacinas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VaccineCalendar usuarioId={usuarioId}/>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* AGENDAR */}
          {activeTab === "schedule" && (
            <div className="max-w-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 bg-clip-text text-transparent">
                  Agendar Vacina
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Agende uma nova vacina de forma rápida e fácil.
                </p>
              </div>
              <VaccineScheduleForm usuarioId={usuarioId} onSchedule={handleRefresh} />
            </div>
          )}

          {/* HISTÓRICO */}
          {activeTab === "history" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 bg-clip-text text-transparent">
                  Histórico de Vacinação
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Veja todo o seu histórico de vacinação.</p>
              </div>
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Todas as Vacinas</CardTitle>
                  <CardDescription>Histórico completo de doses aplicadas e agendadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <VaccineList usuarioId={usuarioId} key={refreshKey} />
                </CardContent>
              </Card>
            </>
          )}

          {/* ADMIN */}
          {activeTab === "admin" && user.isAdmin && (
            <div className="max-w-4xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 bg-clip-text text-transparent">
                  Área do Administrador
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Gerencie usuários, vacinas e outras configurações.
                </p>
              </div>
              <Card className="hover-lift bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Gerenciamento</CardTitle>
                  <CardDescription>Dados cadastrados no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserList />
                </CardContent>
              </Card>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
