"use client"

import { useEffect, useState } from "react"
import { usuarioService, vacinaService, Usuario, Vacina } from "@/services/api"
import { Button } from "@/components/ui/button"

export function AdminPanel() {
  const [userList, setUserList] = useState<Usuario[]>([])
  const [vacinaList, setVacinaList] = useState<Vacina[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingVacinas, setLoadingVacinas] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ================= USERS =================
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoadingUsers(true)
        const data = await usuarioService.listarTodos()
        setUserList(data)
      } catch (err) {
        console.error(err)
        setError("Erro ao buscar usuários")
      } finally {
        setLoadingUsers(false)
      }
    }

    fetchUsers()
  }, [])

  const toggleAdmin = async (user: Usuario) => {
    try {
      const updated = await usuarioService.atualizar(user.id, {
        is_admin: !user.is_admin,
      })
      setUserList((prev) =>
        prev.map((u) => (u.id === user.id ? updated : u))
      )
    } catch (err) {
      console.error(err)
      setError("Erro ao atualizar usuário")
    }
  }

  const deleteUser = async (userId: number) => {
    try {
      await usuarioService.deletar(userId)
      setUserList((prev) => prev.filter((u) => u.id !== userId))
    } catch (err) {
      console.error(err)
      setError("Erro ao deletar usuário")
    }
  }

  // ================= VACINAS =================
  useEffect(() => {
    async function fetchVacinas() {
      try {
        setLoadingVacinas(true)
        const data = await vacinaService.listarTodas()
        setVacinaList(data)
      } catch (err) {
        console.error(err)
        setError("Erro ao buscar vacinas")
      } finally {
        setLoadingVacinas(false)
      }
    }

    fetchVacinas()
  }, [])

  const deleteVacina = async (vacinaId: number) => {
    try {
      await vacinaService.deletar(vacinaId)
      setVacinaList((prev) => prev.filter((v) => v.id !== vacinaId))
    } catch (err) {
      console.error(err)
      setError("Erro ao deletar vacina")
    }
  }

  const criarVacina = async () => {
    const nome = prompt("Nome da vacina:")
    const dosesStr = prompt("Número de doses:")
    if (!nome || !dosesStr) return
    const doses = parseInt(dosesStr, 10)
    try {
      const nova = await vacinaService.criar({ nome, doses })
      setVacinaList((prev) => [...prev, nova])
    } catch (err) {
      console.error(err)
      setError("Erro ao criar vacina")
    }
  }

  if (loadingUsers || loadingVacinas) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            {user.nome} ({user.email}) - Admin: {user.is_admin ? "Sim" : "Não"}
            <Button onClick={() => toggleAdmin(user)}>Alterar Admin</Button>
            <Button onClick={() => deleteUser(user.id)}>Deletar</Button>
          </li>
        ))}
      </ul>

      <h2 className="mt-6">Lista de Vacinas</h2>
      <Button onClick={criarVacina} className="mb-2">Adicionar Vacina</Button>
      <ul>
        {vacinaList.map((vacina) => (
          <li key={vacina.id}>
            {vacina.nome} - Doses: {vacina.doses}
            <Button onClick={() => deleteVacina(vacina.id)}>Deletar</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
