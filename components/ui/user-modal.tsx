"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Save, X } from "lucide-react"

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  user?: { name: string; email: string; password?: string }
}

export function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        password: user?.password || "",
      })
    }
  }, [user, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, ...formData }
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
    onClose()
  }

  const fields = [
    { name: "name", label: "Nome Completo", icon: User, type: "text", placeholder: "João Silva" },
    { name: "email", label: "Email", icon: Mail, type: "email", placeholder: "joao@email.com" },
    { name: "password", label: "Senha", icon: Lock, type: "password", placeholder: "••••••••" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Meu Perfil</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {fields.map((field) => {
            const Icon = field.icon
            return (
              <div key={field.name} className="space-y-1">
                <Label htmlFor={field.name} className="flex items-center gap-2 text-gray-700 font-medium">
                  <Icon className="h-4 w-4 text-teal-600" />
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-all"
                />
              </div>
            )
          })}

          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleSave}
              className="flex-1 h-12 bg-gradient-to-r from-[#45B88D] to-[#3DA87F] text-white font-semibold hover:opacity-90 transition-all"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 border-gray-300 hover:bg-gray-50 transition-all"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
