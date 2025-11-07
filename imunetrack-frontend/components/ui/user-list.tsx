"use client"

import { useEffect, useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/services/api"

interface User {
  id: number
  nome: string
  email: string
  senha: string
  is_admin: boolean
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/usuarios/")
        setUsers(response.data)
      } catch (error) {
        console.error("Erro ao buscar usuários:", error)
      }
    }
    fetchUsers()
  }, [])

  const handleEdit = (user: User) => setEditingUser(user)
  const handleDelete = async (id: number) => {
    await api.delete(`/usuarios/${id}/`)
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  const handleSave = async () => {
    if (!editingUser) return
    await api.put(`/usuarios/${editingUser.id}/`, editingUser)
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? editingUser : u))
    )
    setEditingUser(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>

    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{user.nome}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => handleEdit(user)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => handleDelete(user.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p>Id: {user.id}</p>
            <p>{user.email}</p>
            <p className="text-sm text-muted-foreground">
              {user.is_admin ? "Administrador" : "Usuário comum"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>

      {/* Modal de Edição */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input
                value={editingUser?.nome || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser!, nome: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={editingUser?.email || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser!, email: e.target.value })
                }
              />
            </div>
            
            <div>
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="••••••••"
                onChange={(e) =>
                  setEditingUser({ ...editingUser!, senha: e.target.value })
                }
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editingUser?.is_admin|| false}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser!,
                    is_admin: e.target.checked,
                  })
                }
              />
              <Label>Administrador?</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
