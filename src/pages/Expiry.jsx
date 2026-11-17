import { useState } from 'react'
import { PackageX, Undo2 } from 'lucide-react'
import { Badge, Card, DataTable, PageHeader, Segmented, StatCard, inr } from '../components/ui'
import { useContact } from '../components/ContactModal'
import { expiring } from '../data'

const windows = { '30 days': 30, '60 days': 60, '90 days': 90, 'All': 999 }

export default function Expiry() {
  const { openContact } = useContact()
  const [w, setW] = useState('All')
  const rows = expiring.filter((e) => e.days <= windows[w]).sort((a, b) => a.days - b.days)
  const value = rows.reduce((s, r) => s + r.value, 0)

  return (
    <>
      <PageHeader title="Expiry tracker" subtitle="Never sell an expired medicine. Return near-expiry stock on time." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Batches in window" value={rows.length} icon={PackageX} tone="rose" />
        <StatCard label="Stock value at risk" value={inr(value)} icon={PackageX} tone="amber" />
        <StatCard label="Recovered via returns (YTD)" value="₹1.48L" icon={Undo2} tone="emerald" />
      </div>
      <Card className="mt-6" bodyClass="" title="Near-expiry batches" action={<Segmented options={Object.keys(windows)} value={w} onChange={setW} />}>
        <DataTable
          rows={rows}
          columns={[
            { key: 'name', label: 'Medicine', render: (r) => <span className="font-semibold text-slate-800">{r.name}</span> },
            { key: 'batch', label: 'Batch' },
            { key: 'expiry', label: 'Expiry date' },
            { key: 'days', label: 'Expires in', render: (r) => <Badge tone={r.days < 30 ? 'red' : r.days < 60 ? 'amber' : 'blue'}>{r.days} days</Badge> },
            { key: 'qty', label: 'Qty' },
            { key: 'supplier', label: 'Supplier' },
            { key: 'value', label: 'Value', align: 'right', render: (r) => <span className="font-semibold text-slate-800">{inr(r.value)}</span> },
            { key: 'a', label: '', align: 'right', render: () => <button onClick={() => openContact('Purchase Returns to Supplier')} className="btn-ghost px-3 py-1.5 text-xs"><Undo2 className="h-3.5 w-3.5" /> Return</button> },
          ]}
        />
      </Card>
    </>
  )
}
