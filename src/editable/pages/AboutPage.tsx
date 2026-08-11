import { BookOpen, Layers3, SearchCheck } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { globalContent } from '@/editable/content/global.content'

const icons = [BookOpen, SearchCheck, Layers3]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <article>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{pagesContent.about.title}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
              <div className="mt-6 grid gap-4 text-sm leading-7 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <aside className="rounded-sm border border-[var(--editable-border)] bg-white p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">Our promise</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight">{globalContent.site.name} keeps discovery simple.</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--slot4-muted-text)]">Every page is designed around helping you find the right business, article, or service — quickly and confidently.</p>
            </aside>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pagesContent.about.values.map((value, index) => {
              const Icon = icons[index] || BookOpen
              return (
                <div key={value.title} className="rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-[0_4px_20px_rgba(61,26,26,0.06)]">
                  <Icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <h2 className="mt-4 text-lg font-bold tracking-tight">{value.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
