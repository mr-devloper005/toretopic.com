import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editablePalette as _pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label: _label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  const category = getEditableCategory(post)
  const dateStr = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) : ''
  return (
    <Link href={href} className="group relative block min-h-[280px] overflow-hidden rounded-sm transition hover:shadow-lg sm:min-h-[340px]">
      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3d1a1a]/80 via-[#3d1a1a]/30 to-transparent" />
      <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-5 sm:min-h-[340px]">
        <span className="w-fit bg-[#8b2131] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">{category}</span>
        {dateStr ? <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-white/70"><Clock3 className="h-3 w-3" /> {dateStr}</p> : null}
        <h3 className="mt-2 text-xl font-bold leading-tight text-white sm:text-2xl">{post.title}</h3>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  const category = getEditableCategory(post)
  return (
    <Link href={href} className="group block w-[170px] shrink-0 snap-start overflow-hidden transition hover:-translate-y-0.5 sm:w-[200px]">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-400 group-hover:scale-105" />
      </div>
      <div className="mt-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--slot4-accent)]">{category}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex gap-3 border-b border-[var(--editable-border)] py-3 transition hover:bg-white/50">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug">{post.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[var(--slot4-muted-text)]"><Clock3 className="h-3 w-3" /> Recently listed</p>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  const category = getEditableCategory(post)
  return (
    <Link href={href} className={`group grid min-w-0 gap-4 overflow-hidden rounded-sm border border-[var(--editable-border)] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[200px_minmax(0,1fr)]`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[160px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-400 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-[#8b2131] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white">{category}</span>
      </div>
      <div className="min-w-0 py-1">
        <h2 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight">{post.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 160)}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--slot4-accent)]">Read article <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  )
}
