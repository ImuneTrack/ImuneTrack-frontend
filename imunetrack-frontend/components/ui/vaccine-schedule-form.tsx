"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, AlertCircle } from "lucide-react"

interface VaccineFormData {
  vaccine: string
  date: string
  location: string
  notes: string
}

interface VaccineScheduleFormProps {
  onSchedule?: (data: VaccineFormData) => void
}

const availableVaccines = [
  "Hepatite B",
  "Tríplice Viral (Sarampo, Caxumba, Rubéola)",
  "Febre Amarela",
  "dT (Dupla Adulto)",
  "Influenza (Gripe)",
  "COVID-19",
  "Pneumocócica",
  "Herpes Zóster",
  "Meningocócica",
  "HPV",
]

export function VaccineScheduleForm({ onSchedule }: VaccineScheduleFormProps) {
  const [formData, setFormData] = useState<VaccineFormData>({
    vaccine: "",
    date: "",
    location: "",
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.vaccine || !formData.date || !formData.location) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    console.log("[v0] Vaccine scheduled:", formData)
    setSubmitted(true)
    onSchedule?.(formData)

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ vaccine: "", date: "", location: "", notes: "" })
      setSubmitted(false)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Agendar Nova Vacina
        </CardTitle>
        <CardDescription>Preencha os dados abaixo para agendar uma vacina</CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/10 border border-accent">
            <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-accent">Vacina agendada com sucesso!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Você receberá uma confirmação no seu email. Não perca a data!
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Vaccine Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Selecione a Vacina <span className="text-destructive">*</span>
              </label>
              <select
                name="vaccine"
                value={formData.vaccine}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">-- Escolha uma vacina --</option>
                {availableVaccines.map((vaccine) => (
                  <option key={vaccine} value={vaccine}>
                    {vaccine}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Data do Agendamento <span className="text-destructive">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Location Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Local do Agendamento <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Ex: Clínica XYZ, Posto de Saúde, etc..."
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium mb-2 block">Observações (Opcional)</label>
              <textarea
                name="notes"
                placeholder="Adicione qualquer informação importante..."
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full gap-2">
              <Calendar className="h-4 w-4" />
              Confirmar Agendamento
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
