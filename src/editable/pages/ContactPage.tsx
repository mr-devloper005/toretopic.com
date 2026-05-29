'use client'

import { FileText, Mail, MessageSquareText, PenLine } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: PenLine, title: 'Article pitches', body: 'Send essay ideas, explainers, guides, interviews, and editorial angles that fit an article-first publication.' },
  { icon: FileText, title: 'Corrections and updates', body: 'Point us to article details that need refinement, context, attribution, or clearer wording.' },
  { icon: MessageSquareText, title: 'Reader questions', body: 'Ask about topics, categories, publication direction, or how to find the right article in the archive.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-gray)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">{pagesContent.contact.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
              <div className="mt-8 grid gap-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className="rounded-lg border border-[var(--editable-border)] bg-white p-5">
                    <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                    <h2 className="mt-3 text-xl font-black tracking-tight">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[var(--editable-border)] bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.08)] sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--slot4-accent)] text-white"><Mail className="h-5 w-5" /></div>
              <h2 className="mt-5 text-2xl font-black tracking-tight">{pagesContent.contact.formTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">Share enough context for the editorial team to understand the article, issue, or question.</p>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
