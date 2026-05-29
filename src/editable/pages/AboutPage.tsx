import { BookOpen, Layers3, SearchCheck } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { globalContent } from '@/editable/content/global.content'

const icons = [BookOpen, SearchCheck, Layers3]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <article>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">{pagesContent.about.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
              <div className="mt-8 grid gap-5 text-base leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <aside className="rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Publication promise</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight">{globalContent.site.name} keeps reading focused.</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">Every page is shaped around article discovery, from the homepage cover story to archive cards and detail pages.</p>
            </aside>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pagesContent.about.values.map((value, index) => {
              const Icon = icons[index] || BookOpen
              return (
                <div key={value.title} className="rounded-lg border border-[var(--editable-border)] bg-white p-6 shadow-[0_12px_34px_rgba(17,17,17,0.06)]">
                  <Icon className="h-6 w-6 text-[var(--slot4-accent)]" />
                  <h2 className="mt-5 text-xl font-black tracking-tight">{value.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
