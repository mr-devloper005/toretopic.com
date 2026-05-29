'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, LogOut, Menu, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const siteName = globalContent.site.name
  const navVars = {
    '--editable-nav-bg': '#f34f93',
    '--editable-nav-text': '#ffffff',
    '--editable-nav-active': '#ffffff',
    '--editable-nav-active-text': '#111111',
    '--editable-cta-bg': '#111111',
    '--editable-cta-text': '#ffffff',
    '--editable-search-bg': '#ffffff',
    '--editable-border': 'rgba(17,17,17,0.10)',
    '--editable-container': '1120px',
  } as CSSProperties
  const navItems = useMemo(() => globalContent.nav.primaryLinks, [])

  return (
    <header style={navVars} className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_1px_0_rgba(0,0,0,0.05)]">
      <nav className="mx-auto flex min-h-[56px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-white shadow-sm">
            <img src="/favicon.png?v=20260413" alt={siteName} className="h-7 w-7 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block max-w-[180px] truncate text-lg font-black tracking-tight">{siteName}</span>
            <span className="hidden max-w-[180px] truncate text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 sm:block">{globalContent.nav?.tagline || SITE_CONFIG.tagline}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="relative flex w-full max-w-sm items-center rounded-md bg-[var(--editable-search-bg)] px-3 py-2 text-[#111] shadow-sm">
            <Search className="h-4 w-4 opacity-50" />
            <input name="q" type="search" placeholder="Search articles" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-current/45" />
          </label>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'hover:bg-white/15'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <span className="hidden max-w-[150px] truncate rounded-md bg-white/15 px-3 py-2 text-sm font-black sm:inline-flex">{session.name}</span>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-md bg-[var(--editable-cta-bg)] px-3 py-2 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><LogOut className="h-4 w-4" /> Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-black hover:bg-white/15 sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-md bg-[var(--editable-cta-bg)] px-3 py-2 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><UserPlus className="h-4 w-4" /> Sign up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-md bg-white p-2 text-[#111] lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/15 bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-md bg-[var(--editable-search-bg)] px-3 py-2 text-[#111]">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search articles" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md bg-white px-4 py-3 text-sm font-black text-[#111]">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-md bg-[#111] px-4 py-3 text-left text-sm font-black text-white">Logout {session.name}</button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-md bg-white px-4 py-3 text-center text-sm font-black text-[#111]">Login</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-md bg-[#111] px-4 py-3 text-center text-sm font-black text-white">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
