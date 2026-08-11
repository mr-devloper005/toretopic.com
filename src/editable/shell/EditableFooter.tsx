'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#3d1a1a', '--editable-footer-text': '#faf3ec' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer style={footerVars} className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
            <span className="text-base font-bold uppercase tracking-[0.06em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 opacity-65">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#f5d5d5]">Explore</h3>
          <div className="mt-3 grid gap-1.5">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="text-sm font-medium opacity-70 transition hover:opacity-100">
                {task.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#f5d5d5]">Site</h3>
          <div className="mt-3 grid gap-1.5">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium opacity-70 transition hover:opacity-100">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-medium opacity-70 transition hover:opacity-100">Logout</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs font-medium opacity-50">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
