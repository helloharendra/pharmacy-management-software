import {
  BarChart3, CalendarClock, ClipboardList, FileText, LayoutDashboard, Pill, Receipt, Settings, Truck, Users,
} from 'lucide-react'

export const app = {
  name: 'MediStock',
  tagline: 'Pharmacy Management',
  logo: Pill,
  user: { name: 'Dr. Sameer Khan', role: 'Pharmacist · Main Store' },
  searchPlaceholder: 'Search medicine, salt, batch…',
}

// Items with `to` are implemented in this demo; others are locked (full version).
export const nav = [
  {
    title: 'Pharmacy',
    items: [
      { label: 'Dashboard', to: '/', icon: LayoutDashboard },
      { label: 'Medicine Billing', to: '/billing', icon: Receipt },
      { label: 'Expiry Tracker', to: '/expiry', icon: CalendarClock, badge: '5' },
    ],
  },
  {
    title: 'Stock',
    items: [
      { label: 'Medicine Inventory', icon: Pill },
      { label: 'Purchase Entry', icon: ClipboardList },
      { label: 'Suppliers & Distributors', icon: Truck },
      { label: 'Prescriptions', icon: FileText },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Customers & Credit', icon: Users },
      { label: 'GST & Sales Reports', icon: BarChart3 },
      { label: 'Settings', icon: Settings },
    ],
  },
]
