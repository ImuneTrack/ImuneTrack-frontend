import axios from 'axios'

// Configure a URL base da API
// Ajuste esta URL para o endereço do seu backend FastAPI
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Cria instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Tipos
export interface User {
  id: string
  email: string
  name: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface Vaccine {
  id: string
  name: string
  status: 'completed' | 'scheduled' | 'pending'
  date: string
  nextDose?: string
  description?: string
}

// Autenticação
export const authService = {
  async login(data: LoginData) {
    const response = await api.post('/auth/login', data)
    const { token, user } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    return { token, user }
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data)
    const { token, user } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    return { token, user }
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },
}

// Vacinas
export const vaccineService = {
  async getAll(): Promise<Vaccine[]> {
    const response = await api.get('/vaccines')
    return response.data
  },

  async getById(id: string): Promise<Vaccine> {
    const response = await api.get(`/vaccines/${id}`)
    return response.data
  },

  async create(vaccine: Partial<Vaccine>): Promise<Vaccine> {
    const response = await api.post('/vaccines', vaccine)
    return response.data
  },

  async update(id: string, vaccine: Partial<Vaccine>): Promise<Vaccine> {
    const response = await api.put(`/vaccines/${id}`, vaccine)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/vaccines/${id}`)
  },
}

// Estatísticas
export const statsService = {
  async getDashboard() {
    const response = await api.get('/stats/dashboard')
    return response.data
  },
}

export default api