import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowRight,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  CreditCard,
  Database,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Lock,
  PlugZap,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'AI Feature', icon: Bot },
  { label: 'Stripe Billing', icon: CreditCard },
  { label: 'Admin', icon: Users },
  { label: 'API Health', icon: Activity },
]

const revenue = [
  { month: 'Jan', mrr: 4200 },
  { month: 'Feb', mrr: 5300 },
  { month: 'Mar', mrr: 6800 },
  { month: 'Apr', mrr: 7900 },
  { month: 'May', mrr: 9800 },
  { month: 'Jun', mrr: 12400 },
]

const usage = [
  { name: 'OpenAI', calls: 18200 },
  { name: 'REST API', calls: 28100 },
  { name: 'Webhooks', calls: 7400 },
  { name: 'Auth', calls: 12600 },
]

const members = [
  { name: 'Ava Patel', email: 'ava@launchops.ai', plan: 'Pro', status: 'Active', usage: '72%' },
  { name: 'Noah Chen', email: 'noah@launchops.ai', plan: 'Starter', status: 'Trial', usage: '31%' },
  { name: 'Mia Torres', email: 'mia@launchops.ai', plan: 'Scale', status: 'Active', usage: '84%' },
  { name: 'Leo Martin', email: 'leo@launchops.ai', plan: 'Pro', status: 'Past due', usage: '66%' },
]

const aiOutputs = {
  onboarding: [
    'Segment trial users by signup source, target role, and first action completed.',
    'Send a 3-step onboarding sequence tied to activation: invite team, connect billing, run first AI workflow.',
    'Create an admin alert when Pro trials cross 80% token usage before day 5.',
  ],
  retention: [
    'Detect accounts with falling weekly AI runs and trigger a customer-success task.',
    'Offer annual-plan prompts only after two successful generated exports.',
    'Surface churn-risk users in Admin with last login, plan, usage trend, and failed webhook count.',
  ],
}

type IconType = typeof Activity

function MetricCard({ label, value, delta, icon: Icon }: { label: string; value: string; delta: string; icon: IconType }) {
  return (
    <section className="metric-card" aria-label={label}>
      <div className="metric-icon"><Icon size={18} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{delta}</small>
    </section>
  )
}

export default function App() {
  const [activePrompt, setActivePrompt] = useState<'onboarding' | 'retention'>('onboarding')
  const [generatedAt, setGeneratedAt] = useState('just now')
  const [selectedPlan, setSelectedPlan] = useState('Pro Plan')
  const output = useMemo(() => aiOutputs[activePrompt], [activePrompt])

  function regenerate() {
    setGeneratedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    setActivePrompt((current) => (current === 'onboarding' ? 'retention' : 'onboarding'))
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Sparkles size={20} /></div>
          <div>
            <strong>LaunchOps AI</strong>
            <span>SaaS MVP demo</span>
          </div>
        </div>

        <nav aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button className={label === 'Dashboard' ? 'nav-item active' : 'nav-item'} key={label}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="stack-card">
          <span>Preferred stack</span>
          <strong>React, Node.js, MongoDB, Stripe, OpenAI</strong>
          <p>Modular services, webhook-first billing, OAuth-ready auth, and deployable MVP architecture.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>MVP Control Room</h1>
            <p>Interactive SaaS shell covering auth, billing, AI workflow, admin, API, and database readiness.</p>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button"><KeyRound size={16} /> OAuth ready</button>
            <button className="primary-button">Deploy path <ArrowRight size={16} /></button>
          </div>
        </header>

        <section className="metrics-grid">
          <MetricCard label="Monthly revenue" value="$12.4K" delta="+26% from last month" icon={CircleDollarSign} />
          <MetricCard label="AI generations" value="18.2K" delta="OpenAI usage tracked" icon={Bot} />
          <MetricCard label="Active users" value="232" delta="4 role groups modeled" icon={Users} />
          <MetricCard label="API uptime" value="99.98%" delta="Webhook queue healthy" icon={Gauge} />
        </section>

        <section className="content-grid">
          <section className="panel ai-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">AI Feature</span>
                <h2>{activePrompt === 'onboarding' ? 'Generate onboarding sequence' : 'Generate retention plan'}</h2>
              </div>
              <button className="icon-button" onClick={regenerate} aria-label="Regenerate AI output">
                <RefreshCw size={17} />
              </button>
            </div>
            <div className="prompt-tabs">
              <button className={activePrompt === 'onboarding' ? 'selected' : ''} onClick={() => setActivePrompt('onboarding')}>Onboarding</button>
              <button className={activePrompt === 'retention' ? 'selected' : ''} onClick={() => setActivePrompt('retention')}>Retention</button>
            </div>
            <div className="ai-output">
              {output.map((line) => (
                <div className="ai-line" key={line}>
                  <CheckCircle2 size={17} />
                  <p>{line}</p>
                </div>
              ))}
            </div>
            <footer className="panel-footer">Generated {generatedAt} using simulated OpenAI response handling</footer>
          </section>

          <section className="panel billing-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">Stripe Billing</span>
                <h2>{selectedPlan}</h2>
              </div>
              <span className="status-pill good">Webhook synced</span>
            </div>
            <div className="plan-toggle" role="group" aria-label="Plan selector">
              {['Starter', 'Pro Plan', 'Scale'].map((plan) => (
                <button className={selectedPlan === plan ? 'selected' : ''} onClick={() => setSelectedPlan(plan)} key={plan}>
                  {plan}
                </button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="mrr" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0f766e" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e6eaef" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={48} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="mrr" stroke="#0f766e" fill="url(#mrr)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </section>

          <section className="panel admin-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">Admin</span>
                <h2>Users and subscriptions</h2>
              </div>
              <span className="status-pill">4 records</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.email}>
                      <td><strong>{member.name}</strong><span>{member.email}</span></td>
                      <td>{member.plan}</td>
                      <td><span className={`row-status ${member.status.toLowerCase().replace(' ', '-')}`}>{member.status}</span></td>
                      <td>{member.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel api-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">API Health</span>
                <h2>Production-ready path</h2>
              </div>
              <span className="status-pill good">Ready</span>
            </div>
            <div className="service-list">
              <div><Lock size={18} /><strong>Auth</strong><span>Email + OAuth sessions</span></div>
              <div><Database size={18} /><strong>MongoDB</strong><span>Users, plans, usage, audit logs</span></div>
              <div><PlugZap size={18} /><strong>REST API</strong><span>Rate limited routes + webhooks</span></div>
              <div><ShieldCheck size={18} /><strong>Security</strong><span>Roles, input validation, logs</span></div>
            </div>
            <ResponsiveContainer width="100%" height={154}>
              <BarChart data={usage}>
                <CartesianGrid stroke="#e6eaef" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="calls" fill="#f59e0b" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </section>

        <section className="delivery-band">
          <Workflow size={20} />
          <div>
            <strong>Estimated MVP delivery: 4 to 6 weeks</strong>
            <p>Week 1 architecture/auth, week 2 dashboard/API, week 3 Stripe/webhooks, week 4 OpenAI feature/admin, then QA, docs, deployment, and scaling pass.</p>
          </div>
        </section>
      </section>
    </main>
  )
}
