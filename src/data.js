// Sample data for the UI demo. The complete project uses live APIs + database.
export const medicines = [
  { id: 1, name: 'Paracetamol 650mg', salt: 'Paracetamol', pack: 'Strip of 15', mrp: 32, batch: 'PCM2411', expiry: 'Aug 2027', stock: 420, rx: false },
  { id: 2, name: 'Azithromycin 500mg', salt: 'Azithromycin', pack: 'Strip of 3', mrp: 119, batch: 'AZT0925', expiry: 'Feb 2027', stock: 64, rx: true },
  { id: 3, name: 'Pantoprazole 40mg', salt: 'Pantoprazole', pack: 'Strip of 15', mrp: 155, batch: 'PAN1124', expiry: 'Jan 2027', stock: 210, rx: true },
  { id: 4, name: 'Cetirizine 10mg', salt: 'Cetirizine', pack: 'Strip of 10', mrp: 22, batch: 'CTZ0826', expiry: 'Jun 2028', stock: 380, rx: false },
  { id: 5, name: 'Metformin 500mg', salt: 'Metformin', pack: 'Strip of 20', mrp: 48, batch: 'MET0325', expiry: 'Dec 2026', stock: 150, rx: true },
  { id: 6, name: 'Vitamin D3 60K', salt: 'Cholecalciferol', pack: 'Strip of 4', mrp: 128, batch: 'VD31026', expiry: 'Oct 2027', stock: 92, rx: false },
  { id: 7, name: 'Amoxicillin 500mg', salt: 'Amoxicillin', pack: 'Strip of 10', mrp: 98, batch: 'AMX0126', expiry: 'Jan 2027', stock: 45, rx: true },
  { id: 8, name: 'ORS Sachet', salt: 'Electrolytes', pack: 'Sachet 21g', mrp: 21, batch: 'ORS0727', expiry: 'Jul 2027', stock: 600, rx: false },
]

export const salesTrend = [
  { label: '11 Nov', sales: 38 }, { label: '12 Nov', sales: 42 }, { label: '13 Nov', sales: 36 }, { label: '14 Nov', sales: 51 },
  { label: '15 Nov', sales: 58 }, { label: '16 Nov', sales: 47 }, { label: '17 Nov', sales: 62 },
]

export const categoryMix = [
  { name: 'Prescription', value: 54 }, { name: 'OTC', value: 26 }, { name: 'Wellness', value: 12 }, { name: 'Devices', value: 8 },
]

export const expiring = [
  { id: 1, name: 'Metformin 500mg', batch: 'MET0325', expiry: '31 Dec 2026', days: 44, qty: 150, value: 7200, supplier: 'Apollo Distributors' },
  { id: 2, name: 'Amoxicillin 500mg', batch: 'AMX0126', expiry: '31 Jan 2027', days: 75, qty: 45, value: 4410, supplier: 'MedPlus Wholesale' },
  { id: 3, name: 'Azithromycin 500mg', batch: 'AZT0925', expiry: '28 Feb 2027', days: 103, qty: 64, value: 7616, supplier: 'Apollo Distributors' },
  { id: 4, name: 'Cough Syrup 100ml', batch: 'CSY1125', expiry: '30 Nov 2026', days: 13, qty: 28, value: 3080, supplier: 'Sun Pharma Agency' },
  { id: 5, name: 'Insulin Glargine', batch: 'INS1225', expiry: '15 Dec 2026', days: 28, qty: 12, value: 10680, supplier: 'Lifeline Pharma' },
]
