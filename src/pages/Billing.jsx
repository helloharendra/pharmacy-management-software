import { useState } from 'react'
import { CheckCircle2, FileWarning, Minus, Plus, Printer, Search, Stethoscope, Trash2 } from 'lucide-react'
import { Badge, Card, PageHeader, inr } from '../components/ui'
import { useContact } from '../components/ContactModal'
import { medicines } from '../data'

const GST = 12

export default function Billing() {
  const { openContact } = useContact()
  const [q, setQ] = useState('')
  const [cart, setCart] = useState([{ ...medicines[0], qty: 2 }, { ...medicines[2], qty: 1 }])
  const [patient, setPatient] = useState('Ramesh Gupta')
  const [doctor, setDoctor] = useState('Dr. A. Verma')
  const [saved, setSaved] = useState(false)

  const results = q ? medicines.filter((m) => `${m.name} ${m.salt}`.toLowerCase().includes(q.toLowerCase())) : []
  const add = (m) => { setCart((c) => (c.some((x) => x.id === m.id) ? c.map((x) => (x.id === m.id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...m, qty: 1 }])); setQ('') }
  const setQty = (id, d) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0))

  const total = cart.reduce((s, x) => s + x.mrp * x.qty, 0)
  const gst = (total * GST) / (100 + GST)
  const needsRx = cart.some((x) => x.rx)

  return (
    <>
      <PageHeader title="Medicine billing" subtitle="Search by brand or salt. Batch and expiry are picked automatically (FEFO)." />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="relative animate-fade-up">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type medicine or salt name… e.g. para, azith, vitamin" className="input rounded-2xl py-4 pl-12 text-base shadow-sm" />
            {results.length > 0 && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-scale-in">
                {results.map((m) => (
                  <button key={m.id} onClick={() => add(m)} className="flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-brand-50">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{m.name} {m.rx && <span className="ml-1 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-600">Rx</span>}</p>
                      <p className="text-xs text-slate-400">{m.salt} · {m.pack} · Batch {m.batch} · Exp {m.expiry}</p>
                    </div>
                    <span className="text-xs text-slate-500">{m.stock} in stock</span>
                    <span className="font-bold text-slate-900">{inr(m.mrp)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Card bodyClass="" title="Bill items" subtitle={`${cart.length} medicines`}>
            <div className="divide-y divide-slate-100">
              {cart.map((x) => (
                <div key={x.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><Stethoscope className="h-5 w-5" /></div>
                  <div className="min-w-[180px] flex-1">
                    <p className="font-semibold text-slate-800">{x.name} {x.rx && <Badge tone="red" dot={false}>Rx</Badge>}</p>
                    <p className="text-xs text-slate-400">Batch {x.batch} · Exp {x.expiry} · MRP {inr(x.mrp)}</p>
                  </div>
                  <div className="flex items-center rounded-lg ring-1 ring-slate-200">
                    <button onClick={() => setQty(x.id, -1)} className="p-2 text-slate-500">{x.qty === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}</button>
                    <span className="w-8 text-center font-semibold">{x.qty}</span>
                    <button onClick={() => setQty(x.id, 1)} className="p-2 text-slate-500"><Plus className="h-4 w-4" /></button>
                  </div>
                  <span className="w-20 text-right font-bold text-slate-900">{inr(x.mrp * x.qty)}</span>
                </div>
              ))}
              {!cart.length && <p className="py-12 text-center text-sm text-slate-400">Search a medicine to start billing</p>}
            </div>
          </Card>
        </div>

        <Card title="Patient & payment" className="h-fit xl:sticky xl:top-24">
          <div className="space-y-4">
            <div><label className="label">Patient name</label><input value={patient} onChange={(e) => setPatient(e.target.value)} className="input" /></div>
            <div><label className="label">Prescribing doctor</label><input value={doctor} onChange={(e) => setDoctor(e.target.value)} className="input" /></div>
            {needsRx && (
              <div className="flex gap-3 rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
                <FileWarning className="h-4 w-4 shrink-0" />
                <p>Bill contains prescription (Schedule H) medicines. Prescription details will be logged in the register.</p>
              </div>
            )}
            <div className="space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
              <div className="flex justify-between text-slate-500"><span>Items</span><span>{cart.reduce((s, x) => s + x.qty, 0)}</span></div>
              <div className="flex justify-between text-slate-500"><span>GST {GST}% (incl.)</span><span>{inr(gst.toFixed(2))}</span></div>
              <div className="flex items-end justify-between border-t border-dashed border-slate-200 pt-2"><span className="font-semibold">Net amount</span><span className="text-2xl font-extrabold text-slate-900">{inr(total)}</span></div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-2">
              <button onClick={() => openContact('Invoice Printing')} className="btn-ghost px-3"><Printer className="h-4 w-4" /></button>
              <button disabled={!cart.length} onClick={() => { setSaved(true); setTimeout(() => { setSaved(false); setCart([]) }, 1500) }} className="btn-primary py-3 disabled:opacity-50">
                {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved</> : 'Save & print bill'}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
