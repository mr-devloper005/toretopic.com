import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-50">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-4 max-w-lg text-sm leading-6 opacity-65">{pagesContent.auth.login.description}</p>
          </div>
          <div className="rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-[0_4px_20px_rgba(61,26,26,0.08)] sm:p-7">
            <h2 className="text-xl font-bold tracking-tight">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-4 text-sm opacity-65">New here? <Link href="/signup" className="font-bold text-[var(--slot4-accent)] hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
