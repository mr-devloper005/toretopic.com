import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search, Star } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const isUrl = (v: string) => v.startsWith('/') || /^https?:\/\//i.test(v)
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => stripHtml(post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || '')

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const imgs = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const single = typeof content.image === 'string' && isUrl(content.image) ? [content.image] : []
  const logo = typeof content.logo === 'string' && isUrl(content.logo) ? [content.logo] : []
  return [...media, ...imgs, ...single, ...logo].slice(0, 4)
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const images = getImages(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const category = compactRaw(getContent(post).category) || post.tags?.[0] || taskLabel
  const hash = (post.title || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const rating = Math.min(3.8 + (hash % 14) / 10, 5.0).toFixed(1)
  const reviews = 50 + (hash % 400)

  return (
    <Link href={href} className="group overflow-hidden rounded-sm border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="grid grid-cols-2 gap-0.5 bg-[var(--slot4-media-bg)]">
        {images.length > 0 ? images.slice(0, 4).map((img, i) => (
          <div key={`${img}-${i}`} className="relative aspect-[4/3] overflow-hidden">
            <img src={img} alt="" className="h-full w-full object-cover transition duration-400 group-hover:scale-105" />
          </div>
        )) : (
          <div className="col-span-2 aspect-[16/9]">
            <img src={getImage(post) || '/placeholder.svg?height=400&width=600'} alt="" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--slot4-muted-text)]">{category} · No. {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight">{post.title}</h2>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(Number(rating)) ? 'fill-[#8b2131] text-[#8b2131]' : 'fill-[var(--slot4-media-bg)] text-[var(--slot4-media-bg)]'}`} />
            ))}
          </div>
          <span className="text-[12px] font-bold text-[var(--slot4-accent)]">{rating}</span>
          <span className="text-[12px] text-[var(--slot4-muted-text)]">({reviews})</span>
        </div>
        {summary ? <p className="mt-2 line-clamp-2 text-[13px] leading-5 opacity-60">{summary}</p> : null}
        <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--slot4-accent)]">Read article <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-6 rounded-sm border border-[var(--editable-border)] bg-white/70 p-5 shadow-[0_4px_20px_rgba(61,26,26,0.06)] md:grid-cols-[0.8fr_1.2fr] lg:p-7">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-50">{pagesContent.search.hero.badge}</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-3 max-w-md text-sm leading-6 opacity-65">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="self-end rounded-sm border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] p-4">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-2 border border-[var(--editable-border)] bg-white px-3 py-2.5">
                <Search className="h-4 w-4 opacity-40" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-current/35" />
              </label>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <label className="flex items-center gap-2 border border-[var(--editable-border)] bg-white px-3 py-2.5">
                  <Filter className="h-3.5 w-3.5 opacity-40" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-current/35" />
                </label>
                <select name="task" defaultValue={task} className="border border-[var(--editable-border)] bg-white px-3 py-2.5 text-sm font-bold outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-2 h-10 w-full bg-[var(--slot4-accent)] text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:opacity-90" type="submit">Search</button>
            </form>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-45">{results.length} results</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/article" className="inline-flex items-center gap-1.5 border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-bold">Browse latest <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>

          {results.length ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-6 rounded-sm border border-dashed border-[var(--editable-border)] bg-white/60 p-8 text-center">
              <p className="text-xl font-bold tracking-tight">No matching posts found.</p>
              <p className="mt-2 text-sm opacity-55">Try a different keyword, content type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
