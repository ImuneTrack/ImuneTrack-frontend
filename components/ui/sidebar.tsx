"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Home, History, Settings, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserModal } from "@/components/ui/user-modal"
import Image from "next/image"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onSettingsOpen: () => void
  isAdmin?: boolean
  className?: string
  user?: { name: string; email: string; phone?: string; birthDate?: string }
}

export function Sidebar({ activeTab, onTabChange, onSettingsOpen, isAdmin, className, user }: SidebarProps) {
  const [isUserOpen, setIsUserOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "schedule", label: "Agendar Vacina", icon: Plus },
    { id: "history", label: "Histórico", icon: History },
  ]

  return (
    <aside className={cn("w-64 border-r bg-card/50 backdrop-blur-sm relative flex flex-col", className)}>
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Imunetrack" width={80} height={80} priority />
          <h2 className="font-bold text-lg">Imunetrack</h2>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="p-4 space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left hover-lift",
                activeTab === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          )
        })}

        {/* Admin Button */}
        {isAdmin && (
          <button
            onClick={() => onTabChange("admin")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left hover-lift",
              activeTab === "admin"
                ? "bg-primary/10 text-primary font-medium"
                : "text-red-500 hover:bg-accent/5 hover:text-foreground"
            )}
          >
            <Shield className="h-5 w-5" />
            <span>Área do Admin</span>
          </button>
        )}
      </nav>

      {/* Config Section */}
      <div className="p-4 border-t space-y-2">
        <Button
          className="w-full gap-2 bg-transparent hover-lift"
          variant="outline"
          onClick={onSettingsOpen}
        >
          <Settings className="h-4 w-4" />
          Configurações
        </Button>
      </div>

      {/* User Section */}
      <div className="p-4 pb-2 border-b">
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 cursor-pointer hover-lift"
          onClick={() => setIsUserOpen(true)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <p className="text-sm font-medium">Meu Perfil</p>
            <p className="text-xs text-gray-600">Ver detalhes</p>
          </div>
        </div>
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={isUserOpen}
        onClose={() => setIsUserOpen(false)}
        user={user}
      />
    </aside>
  )
}
