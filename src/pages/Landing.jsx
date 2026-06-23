import { Link } from 'react-router-dom'
import { Eye, CheckCircle2, Zap, Shield, ArrowRight, CheckCheck } from 'lucide-react'
import './Landing.css'

const FEATURES = [
  { icon: CheckCheck, title: 'Tarefas organizadas', desc: 'Crie, organize e acompanhe todas as suas tarefas em um só lugar com listas personalizadas.' },
  { icon: Zap, title: 'Alta performance', desc: 'Interface rápida e responsiva que funciona perfeitamente em qualquer dispositivo.' },
  { icon: Shield, title: 'Seus dados seguros', desc: 'Autenticação robusta e dados protegidos com as melhores práticas de segurança.' },
]

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-logo">
          <Eye size={22} strokeWidth={1.5} />
          <span>Visão</span>
        </div>
        <div className="landing-header-actions">
          <Link to="/login" className="btn btn-ghost">Entrar</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Começar grátis</Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-badge">
          <span className="badge badge-purple">✦ Gestão de tarefas</span>
        </div>
        <h1 className="hero-title">
          Clareza total sobre<br />
          <span className="hero-gradient">o que importa.</span>
        </h1>
        <p className="hero-subtitle">
          Organize suas tarefas, acompanhe seu progresso e entregue mais — tudo com a simplicidade que você merece.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary btn-lg">
            Criar conta gratuita <ArrowRight size={16} />
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg">
            Já tenho uma conta
          </Link>
        </div>
        <div className="hero-stats">
          {[['100%', 'Visual'], ['0', 'Distrações'], ['∞', 'Listas']].map(([n, l]) => (
            <div key={l} className="hero-stat">
              <span className="hero-stat-num">{n}</span>
              <span className="hero-stat-label">{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon"><Icon size={20} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner">
          <h2>Pronto para ter clareza?</h2>
          <p>Comece agora mesmo. Sem cartão de crédito.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Criar minha conta <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-logo">
          <Eye size={16} strokeWidth={1.5} />
          <span>Visão</span>
        </div>
        <p className="footer-copy">© 2026 Visão. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
