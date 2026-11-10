'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const links = [
  { href: '/admin', label: 'Case Studies' },
  { href: '/admin/logos', label: 'Logos' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/admin/login') return null

  const handleLogout = async () => {
    await createClient().auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <nav className="border-b border-white/15 bg-gray-900/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                pathname === link.href ? 'bg-mint-leaf text-prussian-blue' : 'hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10">
            View site
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/30 px-4 py-2 text-sm hover:bg-white/10 cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}
