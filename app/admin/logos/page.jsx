import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogosManager from '@/components/admin/LogosManager'

export const dynamic = 'force-dynamic'

export default async function AdminLogosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: isAdmin } = await supabase.rpc('is_admin')

  const { data: logos, error } = await supabase
    .from('logos')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  return (
    <LogosManager
      isAdmin={Boolean(isAdmin)}
      initialLogos={logos ?? []}
      loadError={error?.message}
    />
  )
}
