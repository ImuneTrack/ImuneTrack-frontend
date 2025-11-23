"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { authService } from "@/services/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Por favor, insira um email válido")
      setIsLoading(false)
      return
    }

    try {
      const usuario = await authService.login(email, password)

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: usuario.id,
          name: usuario.nome,
          email: usuario.email,
          isAdmin: usuario.is_admin
        })
      )

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      })

      router.push("/dashboard")
    } catch (err: any) {
      const errorMessage = err.message || "Email ou senha incorretos. Tente novamente."
      setError(errorMessage)

      toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-r from-green-50 via-white to-[#45B88D]/20 
      p-4 font-sans">
      
      <div className="w-full max-w-md space-y-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para início
        </Link>

        <Card className="rounded-2xl shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <Image 
                src="/logo.png" 
                alt="Imunetrack Logo" 
                width={100} 
                height={100} 
                priority
                className="rounded-full shadow-lg border-4 border-[#45B88D]/30"
              />
            </div>

            <CardTitle className="text-2xl font-bold pt-2">
              Entrar na sua conta
            </CardTitle>

            <CardDescription className="text-sm text-gray-500">
              Digite seu email e senha para acessar o dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-100 border border-red-300">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 
                bg-[#45B88D] 
                hover:bg-[#1C7F8C] 
                text-white font-semibold 
                transition-all duration-200 
                shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-sm text-center text-gray-500">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-[#45B88D] hover:text-[#1C7F8C] font-medium">
              Criar conta
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Toaster />
    </div>
  )
}
