import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, RotateCcw } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'
import './VerifyEmail.css'

export default function VerifyEmail() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resent, setResent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...code]
    next[i] = val
    setCode(next)
    if (val && i < 5) document.getElementById(`code-${i + 1}`)?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      document.getElementById(`code-${i - 1}`)?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setCode(pasted.split(''))
      document.getElementById('code-5')?.focus()
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length < 6) { setError('Digite o código completo.'); return }
    setLoading(true)
    setError('')
    // TODO: POST /api/auth/verify-email { code: fullCode }
    await new Promise(r => setTimeout(r, 1000))
    navigate('/dashboard')
  }

  const handleResend = async () => {
    // TODO: POST /api/auth/resend-verification
    setResent(true)
    setTimeout(() => setResent(false), 30000)
  }

  return (
    <div className="auth-page">
      <div className="auth-card animate-in verify-card">
        <div className="verify-icon">
          <Mail size={28} strokeWidth={1.5} />
        </div>
        <div className="auth-header">
          <h1>Verifique seu e-mail</h1>
          <p>Enviamos um código de 6 dígitos para<br /><strong>{user?.email || 'seu e-mail'}</strong></p>
        </div>
        <form onSubmit={handleVerify} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="code-inputs" onPaste={handlePaste}>
            {code.map((val, i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`code-input ${val ? 'filled' : ''}`}
                value={val}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                autoFocus={i === 0}
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading || code.join('').length < 6}>
            {loading
              ? <span className="spinner" style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block' }} />
              : <><span>Verificar</span><ArrowRight size={15} /></>}
          </button>
        </form>
        <div className="verify-resend">
          {resent
            ? <p className="auth-success" style={{ textAlign: 'center' }}>Código reenviado!</p>
            : <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={handleResend}>
                <RotateCcw size={14} /> Reenviar código
              </button>}
        </div>
        <p className="auth-footer">
          <Link to="/login" className="auth-link">← Voltar ao login</Link>
        </p>
      </div>
    </div>
  )
}
