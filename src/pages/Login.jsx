import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye as EyeIcon, EyeOff, Eye } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError('E-mail ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card animate-in">
        <div className="auth-logo">
          <EyeIcon size={24} strokeWidth={1.5} />
          <span>Visão</span>
        </div>
        <div className="auth-header">
          <h1>Bem-vindo de volta</h1>
          <p>Entre na sua conta para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label className="label">E-mail</label>
            <input
              type="email"
              className="input-field"
              placeholder="seu@email.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <div className="label-row">
              <label className="label">Senha</label>
              <Link to="/forgot-password" className="auth-link-sm">Esqueceu a senha?</Link>
            </div>
            <div className="input-with-icon">
              <input
                type={showPass ? 'text' : 'password'}
                className="input-field"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                required
              />
              <button type="button" className="input-icon-btn" onClick={() => setShowPass(p => !p)}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? <span className="spinner" style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block' }} /> : 'Entrar'}
          </button>
        </form>
        <p className="auth-footer">
          Não tem uma conta? <Link to="/register" className="auth-link">Registre-se</Link>
        </p>
      </div>
    </div>
  )
}
