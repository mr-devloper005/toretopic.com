import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#f7f7f8', '--editable-footer-text': '#111111' } as CSSProperties
  const exploreLinks = globalContent.footer.columns[0]?.links || []
  const siteLinks = globalContent.footer.columns[1]?.links || []
  const year = new Date().getFullYear()
  const siteName = globalContent.site.name

  return (
    <footer style={footerVars} className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-[var(--editable-border)] bg-white">
              <img src="/favicon.png?v=20260413" alt={siteName} className="h-8 w-8 object-contain" />
            </span>
            <span>
              <span className="block text-lg font-black tracking-tight">{siteName}</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] opacity-55">{globalContent.footer.tagline}</span>
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 opacity-70">{globalContent.footer.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.18em] opacity-55">Explore</h3>
          <div className="mt-4 grid gap-2">
            {exploreLinks.map((link) => (
              <Link key={`${link.label}-${link.href}`} href={link.href} className="inline-flex items-center gap-2 text-sm font-bold opacity-75 hover:opacity-100">
                {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.18em] opacity-55">Publication</h3>
          <div className="mt-4 grid gap-2">
            {siteLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-bold opacity-75 hover:opacity-100">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-4 py-5 text-center text-xs font-bold opacity-55">
        © {year} {siteName}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
