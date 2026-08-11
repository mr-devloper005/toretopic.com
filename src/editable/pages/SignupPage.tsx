import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div className="rounded-sm border border-white/10 bg-white/[0.06] p-5 shadow-lg sm:p-7">
            <h1 className="text-2xl font-bold tracking-tight">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-4 text-sm text-white/60">Already have an account? <Link href="/login" className="font-bold text-white hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/60">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
