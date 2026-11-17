import { Link } from 'react-router-dom'
import { AlertOctagon, IndianRupee, Pill, Receipt, ShieldPlus } from 'lucide-react'
import { Badge, Card, Hero, HeroStat, StatCard, inr } from '../components/ui'
import { DonutChart, TrendChart } from '../components/Charts'
import { categoryMix, expiring, salesTrend } from '../data'

export default function Dashboard() {
  return (
    <>
      <Hero
        eyebrow="MediStock · Main store"
        title="Safe, compliant and always in stock 💊"
        subtitle="Batch-wise inventory, expiry alerts and GST billing for your medical store."
        side={<div className="grid grid-cols-2 gap-3"><HeroStat label="Today's sales" value="₹62.4K" /><HeroStat label="Bills" value="184" /></div>}
      >
        <Link to="/billing" className="btn bg-white text-brand-700 hover:bg-brand-50"><Receipt className="h-4 w-4" /> New bill</Link>
      </Hero>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Sales (MTD)" value="₹8.12L" delta="9.4%" icon={IndianRupee} />
        <StatCard label="Medicines in stock" value="2,846" icon={Pill} tone="sky" />
        <StatCard label="Expiring in 90 days" value="5 batches" icon={AlertOctagon} tone="rose" hint="Return to supplier" />
        <StatCard label="Rx compliance" value="100%" icon={ShieldPlus} tone="violet" hint="Schedule H logged" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card title="Daily sales" subtitle="₹ thousand, last 7 days" className="xl:col-span-2">
          <TrendChart data={salesTrend} series={[{ key: 'sales', name: 'Sales' }]} format={(v) => `₹${v}k`} />
        </Card>
        <Card title="Sales mix"><DonutChart data={categoryMix} centerValue="54%" centerLabel="Prescription" /></Card>
      </div>
      <Card title="Expiry alerts" subtitle="Batches expiring soonest" className="mt-6" action={<Link to="/expiry" className="text-sm font-semibold text-brand-600">View all</Link>}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[...expiring].sort((a, b) => a.days - b.days).slice(0, 3).map((e) => (
            <div key={e.batch} className="rounded-xl border border-slate-100 p-4 transition hover:border-rose-200 hover:bg-rose-50/40">
              <div className="flex items-start justify-between"><p className="font-semibold text-slate-800">{e.name}</p><Badge tone={e.days < 30 ? 'red' : 'amber'}>{e.days} days</Badge></div>
              <p className="mt-1 text-xs text-slate-400">Batch {e.batch} · Exp {e.expiry}</p>
              <p className="mt-3 text-sm text-slate-500">{e.qty} units · <b className="text-slate-800">{inr(e.value)}</b> at risk</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
