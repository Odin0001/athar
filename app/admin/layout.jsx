import AdminNav from '@/components/admin/AdminNav'

export const metadata = {
  title: 'Admin — Athar',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-prussian-blue text-white">
      <AdminNav />
      {children}
    </div>
  )
}
