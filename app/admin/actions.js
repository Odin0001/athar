'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

async function isSignedIn() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return Boolean(user)
}

// Clears the cached public pages after the admin changes a case study
export async function revalidateCaseStudies(slugs = []) {
  if (!(await isSignedIn())) return

  revalidatePath('/case-studies')
  slugs.filter(Boolean).forEach((slug) => revalidatePath(`/case-studies/${slug}`))
}

// Clears the cached home page after the admin changes the logos
export async function revalidateLogos() {
  if (!(await isSignedIn())) return

  revalidatePath('/')
}
