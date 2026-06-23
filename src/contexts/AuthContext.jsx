import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with real API call — GET /api/auth/me
    const saved = localStorage.getItem('visao_user')
    if (saved) setUser(JSON.parse(saved))
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // TODO: Replace with real API call — POST /api/auth/login
    // const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    // const data = await res.json()
    const mockUser = { id: 1, name: 'Usuário Demo', email, avatar: null, role: 'user' }
    setUser(mockUser)
    localStorage.setItem('visao_user', JSON.stringify(mockUser))
    return mockUser
  }

  const register = async (name, email, password) => {
    // TODO: Replace with real API call — POST /api/auth/register
    const mockUser = { id: 1, name, email, avatar: null, role: 'user' }
    setUser(mockUser)
    localStorage.setItem('visao_user', JSON.stringify(mockUser))
    return mockUser
  }

  const logout = () => {
    // TODO: Replace with real API call — POST /api/auth/logout
    setUser(null)
    localStorage.removeItem('visao_user')
  }

  const updateUser = (data) => {
    const updated = { ...user, ...data }
    setUser(updated)
    localStorage.setItem('visao_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
