'use client'

import { FileText, Mail, MessageSquareText, PenLine } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: PenLine, title: 'Business inquiries', body: 'Reach out about listing your business, partnership opportunities, or advertising.' },
  { icon: FileText, title: 'Content submissions', body: 'Submit article ideas, editorial pitches, or suggest updates to existing content.' },
  { icon: MessageSquareText, title: 'General questions', body: 'Ask about our platform, how discovery works, or anything else on your mind.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{pagesContent.contact.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
              <div className="mt-6 grid gap-3">
                {lanes.map((lane) => (
                  <div key={lane.title} className="rounded-sm border border-[var(--editable-border)] bg-white p-4">
                    <lane.icon className="h-4 w-4 text-[var(--slot4-accent)]" />
                    <h2 className="mt-2 text-lg font-bold tracking-tight">{lane.title}</h2>
                    <p className="mt-1.5 text-sm leading-6 text-[var(--slot4-muted-text)]">{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-[0_4px_20px_rgba(61,26,26,0.06)] sm:p-6">
              <div className="flex h-9 w-9 items-center justify-center bg-[var(--slot4-accent)] text-white"><Mail className="h-4 w-4" /></div>
              <h2 className="mt-4 text-xl font-bold tracking-tight">{pagesContent.contact.formTitle}</h2>
              <p className="mt-1.5 text-sm leading-5 text-[var(--slot4-muted-text)]">Share enough details for our team to understand your question or request.</p>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
