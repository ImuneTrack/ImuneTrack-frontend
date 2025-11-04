"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Calendar } from "lucide-react"

interface Vaccine {
  id: string
  name: string
  status: "completed" | "scheduled" | "pending"
  date: string
  nextDose?: string
}

const vaccines: Vaccine[] = [
  {
    id: "1",
    name: "Hepatite B",
    status: "completed",
    date: "15/01/2024",
  },
  {
    id: "2",
    name: "Tríplice Viral (Sarampo, Caxumba, Rubéola)",
    status: "completed",
    date: "20/02/2024",
  },
  {
    id: "3",
    name: "Febre Amarela",
    status: "completed",
    date: "10/03/2024",
  },
  {
    id: "4",
    name: "dT (Dupla Adulto)",
    status: "scheduled",
    date: "15/05/2025",
    nextDose: "Reforço programado",
  },
  {
    id: "5",
    name: "Influenza (Gripe)",
    status: "scheduled",
    date: "20/05/2025",
    nextDose: "Dose anual",
  },
]

export function VaccineList() {
  return (
    <div className="space-y-4">
      {vaccines.map((vaccine) => (
        <div
          key={vaccine.id}
          className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
        >
          <div className="mt-0.5">
            {vaccine.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-accent" />
            ) : vaccine.status === "scheduled" ? (
              <Clock className="h-5 w-5 text-primary" />
            ) : (
              <Calendar className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium leading-tight text-sm">{vaccine.name}</h4>
              <Badge
                variant={vaccine.status === "completed" ? "secondary" : "default"}
                className={
                  vaccine.status === "completed"
                    ? "bg-accent/10 text-accent hover:bg-accent/20"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }
              >
                {vaccine.status === "completed" ? "Aplicada" : "Agendada"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{vaccine.date}</p>
            {vaccine.nextDose && <p className="text-xs text-primary">{vaccine.nextDose}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
