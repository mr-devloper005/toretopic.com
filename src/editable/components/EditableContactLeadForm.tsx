'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EditableContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data?.message || 'Unable to send your message.')
      setStatus('success')
      setMessage(data?.message || 'Thanks. Your message has been received.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your message.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full min-w-0 rounded-lg border border-[var(--editable-border)] bg-white/90 p-4 shadow-[0_12px_34px_rgba(17,17,17,0.06)] backdrop-blur sm:p-5">
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" placeholder="Your name" required />
        <Field name="email" type="email" label="Email address" placeholder="you@example.com" required />
      </div>
      <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2">
        <Field name="phone" label="Phone number" placeholder="Optional" />
        <Field name="subject" label="Subject" placeholder="How can we help?" />
      </div>
      <label className="mt-4 grid min-w-0 gap-2 text-sm font-black opacity-75">
        Message
        <textarea name="message" required rows={6} placeholder="Tell us what you need help with..." className="w-full min-w-0 resize-y rounded-md border border-[var(--editable-border)] bg-white px-4 py-3 text-base font-medium outline-none transition focus:border-[var(--slot4-accent)]" />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {message ? (
        <div className={`mt-5 flex items-start gap-3 rounded-md px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
          {status === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
          <span>{message}</span>
        </div>
      ) : null}
      <button type="submit" disabled={status === 'submitting'} className="mt-6 inline-flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-md bg-[#111] px-6 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send message
      </button>
    </form>
  )
}

function Field({ name, label, type = 'text', placeholder, required = false }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-black opacity-75">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} className="h-12 w-full min-w-0 rounded-md border border-[var(--editable-border)] bg-white px-4 text-base font-medium outline-none transition focus:border-[var(--slot4-accent)]" />
    </label>
  )
}
