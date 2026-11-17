import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Billing from './pages/Billing'
import Expiry from './pages/Expiry'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="billing" element={<Billing />} />
        <Route path="expiry" element={<Expiry />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
