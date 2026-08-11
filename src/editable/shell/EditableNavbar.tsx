'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, ChevronDown } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = {
    '--editable-nav-bg': '#f5e1c8',
    '--editable-nav-text': '#3d1a1a',
    '--editable-nav-accent': '#8b2131',
    '--editable-nav-active-bg': '#8b2131',
    '--editable-nav-active-text': '#ffffff',
    '--editable-cta-bg': '#8b2131',
    '--editable-cta-text': '#ffffff',
    '--editable-search-bg': '#ffffff',
    '--editable-border': 'rgba(139,33,49,0.18)',
    '--editable-container': '1240px',
  } as CSSProperties

  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  const mainLinks = [
    { label: 'Home', href: '/' },
    ...navItems.slice(0, 1),
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b-2 border-[var(--editable-nav-accent)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)]">
      <nav className="mx-auto flex h-[56px] w-full max-w-[var(--editable-container)] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          <span className="hidden text-sm font-bold uppercase tracking-[0.06em] text-[var(--editable-nav-accent)] sm:block">{SITE_CONFIG.name}</span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {mainLinks.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-[13px] font-bold transition ${active ? 'bg-[var(--editable-nav-active-bg)] text-[var(--editable-nav-active-text)]' : 'text-[var(--editable-nav-text)] hover:text-[var(--editable-nav-accent)]'}`}
              >
                {item.label}
              </Link>
            )
          })}
          {navItems.length > 1 ? (
            <div className="group relative">
              <button className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-bold text-[var(--editable-nav-text)] hover:text-[var(--editable-nav-accent)]">
                More <ChevronDown className="h-3 w-3" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 min-w-[160px] border border-[var(--editable-border)] bg-white py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                {navItems.slice(1).map((item) => (
                  <Link key={item.href} href={item.href} className="block px-4 py-2 text-[13px] font-bold hover:bg-[var(--editable-nav-accent)] hover:text-white">{item.label}</Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-end md:flex lg:max-w-sm">
          <label className="relative flex w-full items-center border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-1.5">
            <input name="q" type="search" placeholder="Search businesses, products or services" className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[var(--editable-nav-text)]/40" />
            <button type="submit" className="ml-2 flex h-6 w-6 items-center justify-center bg-[var(--editable-nav-accent)] text-white">
              <Search className="h-3.5 w-3.5" />
            </button>
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-1.5 px-3 py-1.5 text-[13px] font-bold text-[var(--editable-nav-text)] hover:text-[var(--editable-nav-accent)] sm:inline-flex"><PlusCircle className="h-3.5 w-3.5" /> Create</Link>
              <button type="button" onClick={logout} className="hidden items-center gap-1.5 px-3 py-1.5 text-[13px] font-bold text-[var(--editable-nav-text)] hover:text-[var(--editable-nav-accent)] sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-1.5 px-3 py-1.5 text-[13px] font-bold text-[var(--editable-nav-text)] hover:text-[var(--editable-nav-accent)] sm:inline-flex"><LogIn className="h-3.5 w-3.5" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-1.5 bg-[var(--editable-cta-bg)] px-4 py-1.5 text-[13px] font-bold text-[var(--editable-cta-text)] transition hover:opacity-90 sm:inline-flex"><UserPlus className="h-3.5 w-3.5" /> Sign up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((v) => !v)} className="flex h-8 w-8 items-center justify-center border border-[var(--editable-border)] bg-white lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-3 lg:hidden">
          <form action="/search" className="mb-3 flex border border-[var(--editable-border)] bg-white px-3 py-2">
            <Search className="mt-0.5 h-4 w-4 opacity-40" />
            <input name="q" type="search" placeholder="Search businesses, products or services" className="min-w-0 flex-1 bg-transparent px-2 text-[13px] outline-none" />
          </form>
          <div className="grid gap-1">
            {[...mainLinks, ...navItems.slice(1), ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-[var(--editable-border)] px-3 py-2.5 text-[13px] font-bold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
