"use client"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Home, History, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onSettingsOpen: () => void
  isAdmin?: boolean
}

export function Sidebar({ activeTab, onTabChange, onSettingsOpen, isAdmin }: SidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      id: "schedule",
      label: "Agendar Vacina",
      icon: Plus,
    },
    {
      id: "history",
      label: "Histórico",
      icon: History,
    },
    // Aba de gerenciamento de vacinas só para admins
    ...(isAdmin ? [{
      id: "manage-vaccines",
      label: "Gerenciar Vacinas",
      icon: Plus, // você pode trocar por outro ícone, tipo Calendar ou Shield
    }] : []),
  ]

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="font-bold text-lg">Imunetrack</h2>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                activeTab === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent/5 hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <Button className="w-full gap-2 bg-transparent" variant="outline" onClick={onSettingsOpen}>
          <Settings className="h-4 w-4" />
          Configurações
        </Button>
      </div>
    </aside>
  )
}
