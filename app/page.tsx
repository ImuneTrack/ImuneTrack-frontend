"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Power, Shield, Calendar, Users, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  const [stats, setStats] = useState({ users: 0, vaccines: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const targetUsers = 1247
    const targetVaccines = 8932
    const duration = 2000
    const steps = 60
    const incrementUsers = targetUsers / steps
    const incrementVaccines = targetVaccines / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      if (step <= steps) {
        setStats({
          users: Math.floor(incrementUsers * step),
          vaccines: Math.floor(incrementVaccines * step)
        })
      } else {
        clearInterval(timer)
        setStats({ users: targetUsers, vaccines: targetVaccines })
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-0">
            <div className="relative">
              <Image src="/logo.png" alt="Imunetrack" width={80} height={80} priority />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 bg-clip-text text-transparent">
              Imunetrack
            </h1>
          </div>
          <Link href="/login">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-transparent hover-scale border-teal-600 text-teal-700 hover:bg-teal-50 -mt-8"
            >
              <Power className="h-4 w-4" />
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-700 
              bg-teal-100 text-teal-700 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Mais de {stats.users.toLocaleString()} pessoas já confiam em nós</span>
          </div>

          {/* Título */}
          <h2 
            className={`text-5xl md:text-6xl font-bold leading-tight transition-all duration-700 delay-100 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            Mantenha sua{" "}
            <span className="bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 bg-clip-text text-transparent animate-gradient">
              saúde em dia
            </span>{" "}
            com o calendário de vacinação
          </h2>

          {/* Subtítulo */}
          <p 
            className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            Acompanhe todas as vacinas necessárias para cada fase da vida. Receba lembretes e mantenha seu histórico sempre atualizado.
          </p>

          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center pt-4 transition-all duration-700 delay-300 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <Link href="/cadastro">
              <Button 
                size="lg" 
                className="group relative overflow-hidden hover-scale w-full sm:w-auto 
                bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 text-white border-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Começar agora
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent hover-scale w-full sm:w-auto border-teal-600 text-teal-700 hover:bg-teal-50"
            >
              Saiba mais
            </Button>
          </div>

          {/* Stats */}
          <div 
            className={`grid grid-cols-2 gap-8 max-w-md mx-auto pt-12 transition-all duration-700 delay-400 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">
                {stats.users.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Usuários ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.vaccines.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Vacinas registradas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: "Calendário Personalizado", desc: "Acompanhe suas vacinas com lembretes automáticos", color: "teal" },
              { icon: Users, title: "Para Toda Família", desc: "Gerencie a vacinação de todos os membros da família", color: "green" },
              { icon: CheckCircle2, title: "Histórico Completo", desc: "Mantenha registro de todas as vacinas aplicadas", color: "blue" }
            ].map((feature, i) => (
              <Card
                key={i}
                className="group hover-lift hover:border-transparent 
                  bg-gradient-to-br from-white to-gray-50 
                  hover:from-teal-50 hover:to-blue-50 
                  transition-all duration-300"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 
                    flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                  </div>
                  <CardTitle className="group-hover:text-teal-700 transition-colors">{feature.title}</CardTitle>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calendário por Idade */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-teal-700">
            Calendário de Vacinação por Faixa Etária
          </h3>

          <div className="space-y-6">

            {/* 0-2 anos */}
            <Card className="hover-lift transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-teal-700">0-2 anos</span>
                  <span className="text-sm font-normal text-muted-foreground">(Bebês e Primeira Infância)</span>
                </CardTitle>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>BCG</strong> - Ao nascer (dose única)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Hepatite B</strong> - Ao nascer, 2, 4 e 6 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Pentavalente</strong> - 2, 4 e 6 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Poliomielite</strong> - 2, 4, 6 e 15 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Rotavírus</strong> - 2 e 4 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Pneumocócica</strong> - 2, 4 e 12 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Meningocócica C</strong> - 3, 5 e 12 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Tríplice Viral</strong> - 12 meses</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* 4-6 anos */}
            <Card className="hover-lift transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-teal-700">4-6 anos</span>
                  <span className="text-sm font-normal text-muted-foreground">(Pré-escolar)</span>
                </CardTitle>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>DTP (Tríplice Bacteriana)</strong> - Reforço aos 4 anos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Tríplice Viral</strong> - Segunda dose aos 4 anos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Varicela</strong> - Segunda dose aos 4 anos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span><strong>Poliomielite</strong> - Reforço aos 4 anos</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* 9-14 anos */}
            <Card className="hover-lift transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-teal-700">9-14 anos</span>
                  <span className="text-sm font-normal text-muted-foreground">(Adolescentes)</span>
                </CardTitle>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                    <span><strong>HPV</strong> - 2 doses (meninas e meninos)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                    <span><strong>Meningocócica ACWY</strong> - Dose única aos 11–12 anos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                    <span><strong>dTpa</strong> - Reforço</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* 20-59 anos */}
            <Card className="hover-lift transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-teal-700">20-59 anos</span>
                  <span className="text-sm font-normal text-muted-foreground">(Adultos)</span>
                </CardTitle>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>dT (Dupla Adulto)</strong> - Reforço a cada 10 anos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Tríplice Viral</strong> - Até 49 anos, se não vacinado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Hepatite B</strong> - 3 doses, se não vacinado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Febre Amarela</strong> - Dose única (áreas de risco)</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* 60+ anos */}
            <Card className="hover-lift transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-teal-700">60+ anos</span>
                  <span className="text-sm font-normal text-muted-foreground">(Idosos)</span>
                </CardTitle>
              </CardHeader>
              <div className="px-6 pb-6">
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Influenza</strong> - Anual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Pneumocócica 23</strong> - Dose única</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>dT (Dupla Adulto)</strong> - Reforço a cada 10 anos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Herpes Zóster</strong> - A partir de 50 anos (recomendada)</span>
                  </li>
                </ul>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-green-500 via-teal-600 to-blue-500 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="container mx-auto px-4 text-center space-y-6 relative z-10">
          <h3 className="text-3xl font-bold text-balance">Pronto para cuidar da sua saúde?</h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto text-pretty leading-relaxed">
            Crie sua conta gratuitamente e comece a acompanhar seu calendário de vacinação hoje mesmo.
          </p>
          <Link href="/cadastro">
            <Button size="lg" variant="secondary" className="mt-4 hover-scale shadow-lg bg-white text-teal-700">
              Criar conta grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Imunetrack. Todos os direitos reservados.</p>
          <p className="mt-2">
            As informações sobre vacinas são baseadas no Calendário Nacional de Vacinação do Ministério da Saúde.
          </p>
        </div>
      </footer>
    </div>
  )
}
