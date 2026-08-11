import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing published here yet',
  description = 'Fresh posts will appear here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-sm border border-[var(--editable-border)] bg-white/70 p-7 text-center', className)}>
      <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[var(--slot4-accent)] text-white">
        <SearchX className="h-5 w-5" />
      </div>
      <h2 className="mt-4 text-xl font-bold tracking-tight">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 opacity-60">{description}</p>
      <Link href={actionHref} className="mt-5 inline-flex items-center gap-1.5 border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-bold transition hover:bg-[var(--slot4-accent)] hover:text-white">
        {actionLabel}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically. The page layout stays ready even when the feed is empty.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and our team will review it shortly."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
