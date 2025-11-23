"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { authService } from "@/services/api"

export default function CadastroPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: string[] = []

    if (!name.trim()) newErrors.push("Nome é obrigatório")
    else if (name.trim().length < 3) newErrors.push("Nome deve ter pelo menos 3 caracteres")

    if (!email) newErrors.push("Email é obrigatório")
    else if (!email.includes("@") || !email.includes(".")) newErrors.push("Email inválido")

    if (!password) newErrors.push("Senha é obrigatória")
    else if (password.length < 6) newErrors.push("Senha deve ter no mínimo 6 caracteres")
    else if (password.length > 72) newErrors.push("Senha deve ter no máximo 72 caracteres")
    else {
      const hasLetter = /[a-zA-Z]/.test(password)
      const hasNumber = /[0-9]/.test(password)
      if (!hasLetter || !hasNumber) newErrors.push("Senha deve conter letras e números")
    }

    if (!confirmPassword) newErrors.push("Confirmação de senha é obrigatória")
    else if (password !== confirmPassword) newErrors.push("As senhas não coincidem")

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      await authService.register(name.trim(), email.toLowerCase(), password)
      toast({
        title: "Conta criada com sucesso!",
        description: "Redirecionando para o dashboard...",
      })
      setTimeout(() => router.push("/dashboard"), 1000)
    } catch (err: any) {
      console.error("Erro no cadastro:", err)
      let errorMessage = "Erro ao criar conta. Tente novamente."
      if (err.message && err.message.includes("já existe")) errorMessage = "Este email já está cadastrado. Tente fazer login."
      else if (err.message) errorMessage = err.message

      setErrors([errorMessage])
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearErrors = () => setErrors([])

  const getPasswordStrength = () => {
    if (!password) return null
    const strength = {
      weak: password.length < 6,
      medium: password.length >= 6 && password.length < 10,
      strong: password.length >= 10 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password),
    }
    if (strength.strong) return { label: "Forte", color: "bg-green-500" }
    if (strength.medium) return { label: "Média", color: "bg-yellow-400" }
    if (strength.weak) return { label: "Fraca", color: "bg-red-500" }
    return null
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-6 animate-slide-in-bottom">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-blue-100 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para início
        </Link>

        {/* CARD COM FUNDO BRANCO */}
        <Card className="rounded-2xl shadow-xl bg-white hover-lift animate-zoom-in">
          <CardHeader className="space-y-3 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Imunetrack"
                width={100}
                height={100}
                priority
                className="rounded-full shadow-lg"
              />
            </div>

            <CardTitle className="text-2xl font-bold text-teal-700">
              Criar sua conta
            </CardTitle>

            <CardDescription className="text-sm text-teal-700">
              Preencha os dados abaixo para começar a usar o Imunetrack
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {errors.length > 0 && (
                <div className="space-y-2">
                  {errors.map((errMsg, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-red-100 border border-red-200 animate-slide-in-left"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <p className="text-sm text-red-600">{errMsg}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* CAMPOS */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearErrors() }}
                  required
                  disabled={isLoading}
                  autoComplete="name"
                  className="focus:ring-2 focus:ring-teal-600 transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearErrors() }}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  className="focus:ring-2 focus:ring-teal-600 transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearErrors() }}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  minLength={6}
                  maxLength={72}
                  className="focus:ring-2 focus:ring-teal-600 transition-smooth"
                />

                {passwordStrength && (
                  <div className="h-2 w-full rounded-full bg-gray-200 mt-1">
                    <div
                      className={`h-2 rounded-full ${passwordStrength.color}`}
                      style={{
                        width:
                          passwordStrength.label === "Fraca"
                            ? "33%"
                            : passwordStrength.label === "Média"
                            ? "66%"
                            : "100%",
                      }}
                    />
                  </div>
                )}

                {passwordStrength && (
                  <p className="text-xs mt-1 text-teal-700">
                    Força da senha: {passwordStrength.label}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearErrors() }}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  minLength={6}
                  maxLength={72}
                  className="focus:ring-2 focus:ring-teal-600 transition-smooth"
                />

                {confirmPassword && password === confirmPassword && (
                  <div className="flex items-center gap-2 text-xs text-green-600 animate-bounce-in">
                    <CheckCircle2 className="h-3 w-3 text-blue-500" />
                    As senhas coincidem
                  </div>
                )}
              </div>

              {/* BOTÃO CRIAR CONTA - MAIS VISÍVEL */}
              <Button
                type="submit"
                className={`w-full h-12 rounded-xl text-white font-semibold
                  bg-gradient-to-r from-green-500 via-teal-600 to-blue-500
                  hover:scale-[1.02] transform-gpu transition-all duration-200
                  shadow-lg shadow-teal-600/30`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-sm text-center text-teal-700">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="inline-block font-medium bg-clip-text text-transparent
                bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 hover:underline"
            >
              Fazer login
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Toaster />
    </div>
  )
}
