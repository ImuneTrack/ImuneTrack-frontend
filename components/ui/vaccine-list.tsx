"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Calendar, Loader2, Syringe, Plus } from "lucide-react"
import { historicoService, type HistoricoVacinal } from "@/services/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface VaccineListProps {
  usuarioId: number;
  onRefresh?: () => void;
}

export function VaccineList({ usuarioId, onRefresh }: VaccineListProps) {
  const [vacinas, setVacinas] = useState<HistoricoVacinal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [vacinaSelecionada, setVacinaSelecionada] = useState<HistoricoVacinal | null>(null)
  const [aplicada, setAplicada] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchVacinas = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await historicoService.listarPorUsuario(usuarioId)
        setVacinas(data)
      } catch (err) {
        console.error('Erro ao buscar vacinas:', err)
        setError('Erro ao carregar vacinas. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    if (usuarioId) {
      fetchVacinas()
    }
  }, [usuarioId])

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aplicada':
        return { label: 'Aplicada', variant: 'secondary' as const, className: 'bg-accent/10 text-accent hover:bg-accent/20' }
      case 'pendente':
        return { label: 'Pendente', variant: 'default' as const, className: 'bg-primary/10 text-primary hover:bg-primary/20' }
      case 'atrasada':
        return { label: 'Atrasada', variant: 'destructive' as const, className: '' }
      case 'cancelada':
        return { label: 'Cancelada', variant: 'outline' as const, className: '' }
      default:
        return { label: status, variant: 'default' as const, className: '' }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aplicada':
        return <CheckCircle2 className="h-5 w-5 text-accent" />
      case 'pendente':
        return <Clock className="h-5 w-5 text-primary" />
      case 'atrasada':
        return <Calendar className="h-5 w-5 text-destructive" />
      default:
        return <Calendar className="h-5 w-5 text-muted-foreground" />
    }
  }

  const handleMarcarAplicada = async () => {
    if (!vacinaSelecionada) return
    try {
      setSaving(true)

      const payload = {
        data_aplicacao: new Date().toISOString().split("T")[0],
        lote: "N/A",
        local_aplicacao: "N/A",
        profissional: "N/A"
      }

      await historicoService.marcarComoAplicada(usuarioId, vacinaSelecionada.id, payload)

      setVacinas((prev: HistoricoVacinal[]) =>
        prev.map((v) =>
          v.id === vacinaSelecionada.id
            ? { ...v, status: "aplicada", data_aplicacao: payload.data_aplicacao }
            : v
        )
      )

      setVacinaSelecionada(null)
      setAplicada(false)
      onRefresh?.()
    } catch (error: any) {
      console.error("Erro ao atualizar vacina:", error.response?.data || error)
      alert("Erro ao marcar como aplicada: " + JSON.stringify(error.response?.data))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando vacinas...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        {error}
      </div>
    )
  }

  if (vacinas.length === 0) {
    return (
      <div className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 overflow-hidden">
        {/* Círculos decorativos de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative max-w-md mx-auto text-center space-y-6">
          {/* Ícone principal */}
          <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg animate-float">
            <Syringe className="h-12 w-12 text-white" />
          </div>

          {/* Texto */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">Nenhuma vacina registrada</h3>
            <p className="text-white/80 text-lg">
              Comece sua jornada de proteção agendando sua primeira vacina
            </p>
          </div>

          {/* Ação */}
          <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
            Agendar primeira vacina
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {vacinas.map((vacina, index) => {
          const statusInfo = getStatusBadge(vacina.status)
          const displayDate = vacina.data_aplicacao || vacina.data_prevista

          return (
            <div
              key={vacina.id}
              onClick={() => vacina.status === "pendente" && setVacinaSelecionada(vacina)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 bg-card transition-all duration-300 hover-lift ${
                vacina.status === "pendente" ? "cursor-pointer hover:border-blue-300 hover:shadow-lg" : ""
              } animate-slide-in-left`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mt-0.5">
                {getStatusIcon(vacina.status)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium leading-tight text-base">
                      {vacina.vacina_nome} - Dose {vacina.numero_dose}
                    </h4>
                    {displayDate && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {vacina.data_aplicacao ? 'Aplicada em' : 'Prevista para'}: {formatDate(displayDate)}
                      </p>
                    )}
                    {vacina.local_aplicacao && (
                      <p className="text-sm text-muted-foreground">
                        Local: {vacina.local_aplicacao}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={statusInfo.variant}
                    className={`${statusInfo.className} transition-all`}
                  >
                    {statusInfo.label}
                  </Badge>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de Marcar como Aplicada */}
      <Dialog open={!!vacinaSelecionada} onOpenChange={() => setVacinaSelecionada(null)}>
        <DialogContent className="animate-modal-in">
          {vacinaSelecionada && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{vacinaSelecionada.vacina_nome}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-gray-900">
                    <strong>Dose {vacinaSelecionada.numero_dose}</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Prevista para {formatDate(vacinaSelecionada.data_prevista)}
                  </p>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => setAplicada(!aplicada)}>
                  <div className={`w-6 h-6 border-2 rounded-lg transition-all ${
                    aplicada ? "bg-blue-600 border-blue-600 scale-110" : "border-gray-300"
                  }`}>
                    {aplicada && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                  <label className="text-sm font-medium cursor-pointer flex-1">
                    Confirmar que esta dose foi aplicada
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setVacinaSelecionada(null)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleMarcarAplicada}
                  disabled={!aplicada || saving}
                  className="hover-scale"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Salvando...
                    </>
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}