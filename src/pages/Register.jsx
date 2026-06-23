import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('As senhas não coincidem.'); return }
    if (form.password.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/verify-email')
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card animate-in">
        <div className="auth-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          <span>Visão</span>
        </div>
        <div className="auth-header">
          <h1>Criar sua conta</h1>
          <p>Comece a organizar suas tarefas hoje</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label className="label">Nome completo</label>
            <input type="text" className="input-field" placeholder="Seu nome" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required autoFocus />
          </div>
          <div className="form-group">
            <label className="label">E-mail</label>
            <input type="email" className="input-field" placeholder="seu@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label className="label">Senha</label>
            <div className="input-with-icon">
              <input type={showPass ? 'text' : 'password'} className="input-field" placeholder="Mínimo 6 caracteres" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
              <button type="button" className="input-icon-btn" onClick={() => setShowPass(p => !p)}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="label">Confirmar senha</label>
            <input type="password" className="input-field" placeholder="Repita a senha" value={form.confirm} onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? <span className="spinner" style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block' }} /> : 'Criar conta'}
          </button>
        </form>
        <p className="auth-footer">
          Já tem uma conta? <Link to="/login" className="auth-link">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
