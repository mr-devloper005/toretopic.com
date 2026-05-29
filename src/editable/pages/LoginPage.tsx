import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Search, ShieldCheck } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Log in to personalize your local article reading session.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Reader access</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">Welcome back to your article desk.</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">Sign in to keep the navigation personal while you browse latest articles, search the archive, and return to stories that matter.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: BookOpen, label: 'Continue reading' },
                { icon: Search, label: 'Search faster' },
                { icon: ShieldCheck, label: 'Local demo auth' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-4">
                  <Icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <p className="mt-3 text-sm font-black">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 shadow-[0_18px_50px_rgba(17,17,17,0.08)] sm:p-8">
            <h2 className="text-2xl font-black tracking-tight">Login</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">Write your email and password to access your personalized article reading experience.</p>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">New reader? <Link href="/signup" className="font-black text-[var(--slot4-page-text)] underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
