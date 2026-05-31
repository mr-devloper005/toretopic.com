import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, Newspaper, PenLine } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { globalContent } from '@/editable/content/global.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Create a local reader profile for this article publication.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-gray)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-8">
          <div className="rounded-lg border border-[var(--editable-border)] bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.08)] sm:p-8">
            <h1 className="text-2xl font-black tracking-tight">Create reader profile</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">Fill out the form below to create a reader profile for this article publication.</p>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">Already registered? <Link href="/login" className="font-black text-[var(--slot4-page-text)] underline-offset-4 hover:underline">Login</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{globalContent.site.name}</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">Join the publication as a reader.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">Create a lightweight profile for browsing article sections, returning to the archive, and testing the logged-in reading state without backend changes.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Newspaper, label: 'Latest articles' },
                { icon: Bookmark, label: 'Saved reading mood' },
                { icon: PenLine, label: 'Editorial contact' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-lg border border-[var(--editable-border)] bg-white p-4">
                  <Icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <p className="mt-3 text-sm font-black">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
