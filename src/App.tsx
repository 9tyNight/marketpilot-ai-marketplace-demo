import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Database,
  Gauge,
  LayoutDashboard,
  Lock,
  MessageSquareText,
  PlugZap,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type IconType = typeof Activity
type MatchMode = 'speed' | 'quality'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'AI Match', icon: Bot },
  { label: 'Escrow', icon: CreditCard },
  { label: 'Providers', icon: Users },
  { label: 'API Health', icon: Activity },
]

const candidates = [
  { name: 'Northstar Studio', skills: 'Next.js, Nest.js, Stripe', score: 96, status: 'Verified' },
  { name: 'Atlas Automation', skills: 'AI APIs, PostgreSQL, AWS', score: 91, status: 'Interview' },
  { name: 'Vector Foundry', skills: 'React, payments, marketplace UX', score: 88, status: 'Shortlist' },
  { name: 'Blueforge Labs', skills: 'Node.js, webhooks, admin tools', score: 84, status: 'Review' },
]

const apiCalls = [
  { name: 'AI match', calls: 18400 },
  { name: 'Payments', calls: 9200 },
  { name: 'Jobs API', calls: 14600 },
  { name: 'Auth', calls: 11800 },
]

const aiPlans = {
  speed: [
    'Extract the job requirements, budget rules, and buyer constraints into structured marketplace data.',
    'Rank providers by skill overlap, verified delivery signals, payment readiness, and availability.',
    'Generate a buyer-facing shortlist with clear next actions and admin review notes.',
  ],
  quality: [
    'Normalize provider portfolios and past project notes before scoring the match.',
    'Flag missing verification, unclear scope, and payment-risk signals before contract creation.',
    'Create an auditable recommendation trail so admins can tune the AI scoring model.',
  ],
}

function MetricCard({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: IconType }) {
  return (
    <section className="metric-card" aria-label={label}>
      <div className="metric-icon"><Icon size={18} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </section>
  )
}

export default function App() {
  const [mode, setMode] = useState<MatchMode>('speed')
  const [generatedAt, setGeneratedAt] = useState('just now')
  const [escrowState, setEscrowState] = useState('Funded')
  const output = useMemo(() => aiPlans[mode], [mode])

  function regenerate() {
    setGeneratedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    setMode((current) => (current === 'speed' ? 'quality' : 'speed'))
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Sparkles size={20} /></div>
          <div>
            <strong>MarketPilot AI</strong>
            <span>Marketplace MVP demo</span>
          </div>
        </div>

        <nav aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button className={label === 'Overview' ? 'nav-item active' : 'nav-item'} key={label}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="stack-card">
          <span>Build target</span>
          <strong>Next.js, React, Nest.js, PostgreSQL, Stripe, AWS, AI APIs</strong>
          <p>Designed around marketplace intake, provider matching, payment flow, admin review, and deployable service boundaries.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>AI Marketplace Control Room</h1>
            <p>A focused MVP surface for marketplace intake, AI-powered provider matching, escrow/payment state, and backend readiness.</p>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button"><Lock size={16} /> Admin-safe</button>
            <button className="primary-button">Review flow <ArrowRight size={16} /></button>
          </div>
        </header>

        <section className="metrics-grid">
          <MetricCard label="Open jobs" value="42" note="12 ready for AI match" icon={BriefcaseBusiness} />
          <MetricCard label="Match accuracy" value="96%" note="Rules + AI scoring" icon={SearchCheck} />
          <MetricCard label="Escrow states" value="5" note="Draft to released" icon={CreditCard} />
          <MetricCard label="API uptime" value="99.98%" note="Webhook queue healthy" icon={Gauge} />
        </section>

        <section className="content-grid">
          <section className="panel ai-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">AI Match Assistant</span>
                <h2>{mode === 'speed' ? 'Fast shortlist generation' : 'Quality and risk review'}</h2>
              </div>
              <button className="icon-button" onClick={regenerate} aria-label="Regenerate AI output">
                <RefreshCw size={17} />
              </button>
            </div>
            <div className="prompt-tabs">
              <button className={mode === 'speed' ? 'selected' : ''} onClick={() => setMode('speed')}>Fast match</button>
              <button className={mode === 'quality' ? 'selected' : ''} onClick={() => setMode('quality')}>Risk review</button>
            </div>
            <div className="job-intake">
              <MessageSquareText size={18} />
              <p>Buyer asks for a full-stack MVP with marketplace profiles, AI matching, payments, admin review, and production deployment.</p>
            </div>
            <div className="ai-output">
              {output.map((line) => (
                <div className="ai-line" key={line}>
                  <CheckCircle2 size={17} />
                  <p>{line}</p>
                </div>
              ))}
            </div>
            <footer className="panel-footer">Generated {generatedAt} using simulated AI API response handling</footer>
          </section>

          <section className="panel escrow-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">Stripe-Style Escrow</span>
                <h2>{escrowState} contract</h2>
              </div>
              <span className="status-pill good">Webhook synced</span>
            </div>
            <div className="plan-toggle" role="group" aria-label="Escrow state selector">
              {['Draft', 'Funded', 'Released'].map((state) => (
                <button className={escrowState === state ? 'selected' : ''} onClick={() => setEscrowState(state)} key={state}>
                  {state}
                </button>
              ))}
            </div>
            <div className="escrow-steps">
              <div className="complete"><ClipboardCheck size={18} /><strong>Scope approved</strong><span>Milestone terms locked</span></div>
              <div className={escrowState !== 'Draft' ? 'complete' : ''}><CreditCard size={18} /><strong>Payment reserved</strong><span>Stripe event captured</span></div>
              <div className={escrowState === 'Released' ? 'complete' : ''}><ShieldCheck size={18} /><strong>Funds released</strong><span>Admin audit trail saved</span></div>
            </div>
          </section>

          <section className="panel provider-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">Provider Shortlist</span>
                <h2>Ranked marketplace matches</h2>
              </div>
              <span className="status-pill">4 records</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Relevant stack</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.name}>
                      <td><strong>{candidate.name}</strong><span>Marketplace partner</span></td>
                      <td>{candidate.skills}</td>
                      <td>{candidate.score}</td>
                      <td><span className={`row-status ${candidate.status.toLowerCase()}`}>{candidate.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel api-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">Backend Readiness</span>
                <h2>Production service map</h2>
              </div>
              <span className="status-pill good">Ready</span>
            </div>
            <div className="service-list">
              <div><Lock size={18} /><strong>Auth</strong><span>Role-based buyer, provider, admin access</span></div>
              <div><Database size={18} /><strong>PostgreSQL</strong><span>Jobs, profiles, contracts, audit events</span></div>
              <div><PlugZap size={18} /><strong>Nest.js API</strong><span>Validated routes, queues, webhooks</span></div>
              <div><Workflow size={18} /><strong>AWS deploy</strong><span>Environment config, logging, scaling path</span></div>
            </div>
            <ResponsiveContainer width="100%" height={154}>
              <BarChart data={apiCalls}>
                <CartesianGrid stroke="#e6eaef" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="calls" fill="#d97706" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </section>
      </section>
    </main>
  )
}
