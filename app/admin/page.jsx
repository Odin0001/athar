import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: isAdmin } = await supabase.rpc('is_admin')

  const { data: caseStudies, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <AdminDashboard
      userEmail={user.email}
      isAdmin={Boolean(isAdmin)}
      initialCaseStudies={caseStudies ?? []}
      loadError={error?.message}
    />
  )
}
