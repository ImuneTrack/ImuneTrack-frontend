"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Palette, User } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  user?: { name: string; email: string }
  currentTheme?: "light" | "dark" | "auto"
  onThemeChange?: (theme: "light" | "dark" | "auto") => void
  currentFontSize?: "sm" | "base" | "lg"
  onFontSizeChange?: (size: "sm" | "base" | "lg") => void
  initialTab?: "appearance"
}

export function SettingsModal({
  isOpen,
  onClose,
  user,
  currentTheme = "auto",
  currentFontSize = "base",
  onThemeChange,
  onFontSizeChange,
  initialTab = "appearance",
}: SettingsModalProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto")
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base")
  const [activeTab, setActiveTab] = useState<"appearance">("appearance")
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  })

  useEffect(() => {
    if (isOpen) setActiveTab(initialTab)
  }, [isOpen, initialTab])

  const applyFontSize = (size: "sm" | "base" | "lg") => {
    document.documentElement.classList.remove("font-sm", "font-base", "font-lg")
    document.documentElement.classList.add(`font-${size}`)
  }

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize") as "sm" | "base" | "lg"
    if (savedFontSize) {
      setFontSize(savedFontSize)
      applyFontSize(savedFontSize)
    }
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "auto"
    if (savedTheme) {
      setTheme(savedTheme)
      handleThemeChange(savedTheme)
    }
  }, [])

  const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    if (newTheme === "dark") document.documentElement.classList.add("dark")
    else if (newTheme === "light") document.documentElement.classList.remove("dark")
    else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", isDark)
    }
    onThemeChange?.(newTheme)
  }

  const handleFontChange = (size: "sm" | "base" | "lg") => {
    setFontSize(size)
    localStorage.setItem("fontSize", size)
    applyFontSize(size)
    onFontSizeChange?.(size)
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleProfileSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-background/90 backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Configurações</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
          <TabsList className="grid grid-cols-1 w-full rounded-xl bg-white/10 dark:bg-black/20 p-1">
            <TabsTrigger
              value="appearance"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#45B88D] data-[state=active]:to-[#3DA87F] data-[state=active]:text-white"
            >
              <Palette className="h-4 w-4 mr-1" /> Aparência
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-4 mt-4">
            {/* Tema */}
            <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border-white/20 dark:border-neutral-700/30 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Tema</CardTitle>
                <CardDescription>Escolha como o app será exibido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["light", "dark", "auto"].map(mode => (
                  <Label key={mode} className="flex gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={mode}
                      checked={theme === mode}
                      onChange={() => handleThemeChange(mode as any)}
                    />
                    <span className="capitalize">{mode}</span>
                  </Label>
                ))}
              </CardContent>
            </Card>

            {/* Tamanho da Fonte */}
            <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border-white/20 dark:border-neutral-700/30 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Tamanho da Fonte</CardTitle>
                <CardDescription>Defina o tamanho do texto</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                {["sm", "base", "lg"].map(size => (
                  <Button
                    key={size}
                    size="sm"
                    onClick={() => handleFontChange(size as any)}
                    className={`w-10 h-10 flex items-center justify-center font-bold
                      ${
                        fontSize === size
                          ? "bg-gradient-to-r from-[#45B88D] to-[#3DA87F] text-white"
                          : "bg-white/80 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      } transition-all duration-200`}
                  >
                    A
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botão salvar */}
        <div className="mt-4 flex justify-end">
          <Button onClick={handleProfileSave} className="bg-[#45B88D] hover:bg-[#3DA87F] text-white">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
