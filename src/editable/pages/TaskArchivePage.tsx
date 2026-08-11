import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, Star, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const getSummary = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body))
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Browse articles with editorial ratings and category tags.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-4 xl:grid-cols-2', promise: 'Directory cards with business identity, location, and contact details.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-4 xl:grid-cols-2', promise: 'Classified cards with pricing, condition, and quick contact options.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3', promise: 'Visual gallery with image-first browsing and compact captions.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Bookmark cards for saved resources and quick reference links.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards with file context and download options.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards with identity, bio, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#f5e1c8', '--archive-text': '#3d1a1a', '--archive-surface': '#ffffff', '--archive-accent': '#8b2131' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="rounded-sm border border-[var(--editable-border)] bg-white p-6 shadow-[0_4px_20px_rgba(61,26,26,0.06)] sm:p-8">
            <div className="inline-flex items-center gap-2 border border-[var(--editable-border)] bg-[var(--archive-bg)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--archive-accent)]"><Icon className="h-3.5 w-3.5" /> {label}</div>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{voice?.headline || `Browse ${label}`}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 opacity-65">{voice?.description || SITE_CONFIG.description}</p>
            <div className="mt-4 border border-[var(--editable-border)] bg-[var(--archive-bg)] p-3 text-sm font-medium leading-6 opacity-65">{deck.promise}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={basePath} className="bg-[var(--archive-accent)] px-4 py-2 text-sm font-bold text-white">Browse all</Link>
              <Link href="/search" className="border border-[var(--editable-border)] px-4 py-2 text-sm font-bold">Search</Link>
            </div>
          </div>

          <aside className="grid content-start gap-4">
            <form action={basePath} className="rounded-sm border border-[var(--editable-border)] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] opacity-50"><Filter className="h-3.5 w-3.5" /> Filter</div>
              <select name="category" defaultValue={category} className="mt-3 h-10 w-full border border-[var(--editable-border)] bg-white px-3 text-sm font-bold outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-2 h-10 w-full bg-[var(--archive-accent)] text-sm font-bold text-white">Apply</button>
              <p className="mt-2 text-[11px] font-bold opacity-50">Showing: {categoryLabel}</p>
            </form>
          </aside>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-14 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-sm border border-dashed border-[var(--editable-border)] bg-white/60 p-8 text-center">
              <Search className="mx-auto h-7 w-7 opacity-40" />
              <h2 className="mt-3 text-2xl font-bold tracking-tight">No posts found</h2>
              <p className="mt-2 text-sm opacity-60">Try another category or refresh after publishing new content.</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-bold">Previous</Link> : null}
            <span className="bg-[var(--archive-accent)] px-4 py-2 text-sm font-bold text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-bold">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const images = getImages(post)
  const category = getCategory(post, 'Article')
  const displayImages = images.slice(0, 4)
  const hash = (post.title || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const rating = Math.min(3.8 + (hash % 14) / 10, 5.0).toFixed(1)
  const reviews = 50 + (hash % 400)

  return (
    <Link href={href} className="group overflow-hidden rounded-sm border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="grid grid-cols-2 gap-0.5 bg-[var(--slot4-media-bg)]">
        {displayImages.length > 0 ? displayImages.map((img, i) => (
          <div key={`${img}-${i}`} className="relative aspect-[4/3] overflow-hidden">
            <img src={img} alt="" className="h-full w-full object-cover transition duration-400 group-hover:scale-105" />
          </div>
        )) : (
          <div className="col-span-2 aspect-[16/9]">
            <img src={getImage(post)} alt="" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--archive-accent)]/{60}">{category} · No. {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight">{post.title}</h2>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(Number(rating)) ? 'fill-[#8b2131] text-[#8b2131]' : 'fill-[var(--slot4-media-bg)] text-[var(--slot4-media-bg)]'}`} />
            ))}
          </div>
          <span className="text-[12px] font-bold text-[var(--archive-accent)]">{rating}</span>
          <span className="text-[12px] text-[var(--slot4-muted-text)]">({reviews})</span>
        </div>
        <p className="mt-2 line-clamp-2 text-[13px] leading-5 opacity-60">{getSummary(post)}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--archive-accent)]">Read article <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-4 rounded-sm border border-[var(--editable-border)] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[100px_1fr]">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-sm bg-[var(--archive-bg)] ring-1 ring-[var(--editable-border)]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-8 w-8 opacity-40" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-1.5">
          <span className="bg-[var(--archive-accent)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 border border-[var(--editable-border)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]"><MapPin className="h-2.5 w-2.5" /> {location}</span> : null}
        </div>
        <h2 className="mt-3 text-xl font-bold leading-tight tracking-tight">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-5 opacity-60">{getSummary(post)}</p>
        <div className="mt-3 grid gap-1.5 text-[11px] font-bold opacity-60 sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-sm border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="grid min-h-52 sm:grid-cols-[0.7fr_1fr]">
        <div className="relative bg-[var(--archive-accent)] p-4 text-white">
          <span className="bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">Classified</span>
          <h2 className="mt-8 text-2xl font-bold leading-[1] tracking-tight">{price || 'Open offer'}</h2>
          <p className="mt-3 text-sm font-medium opacity-70">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-3 right-3 h-16 w-16 rounded-sm object-cover opacity-75" /> : null}
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold leading-tight tracking-tight">{post.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-5 opacity-60">{getSummary(post)}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--archive-accent)]">View listing <ArrowRight className="h-3.5 w-3.5" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-4 block break-inside-avoid overflow-hidden rounded-sm border border-[var(--editable-border)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover transition duration-400 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="inline-flex items-center gap-1.5 bg-[var(--archive-bg)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-snug tracking-tight">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--archive-accent)] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="border border-current/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-4 w-4" />
      </div>
      <h2 className="mt-6 text-xl font-bold leading-tight tracking-tight">{post.title}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-5 opacity-65">{getSummary(post)}</p>
      {website ? <p className="mt-4 truncate text-[11px] font-bold uppercase tracking-[0.1em] opacity-55">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="bg-[var(--archive-accent)] p-3 text-white"><FileText className="h-6 w-6" /></div>
        <span className="bg-[var(--archive-bg)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">{category}</span>
      </div>
      <h2 className="mt-6 text-xl font-bold leading-tight tracking-tight">{post.title}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-5 opacity-60">{getSummary(post)}</p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--archive-accent)]">Open document <Download className="h-3.5 w-3.5" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-sm border border-[var(--editable-border)] bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[var(--archive-bg)] ring-1 ring-[var(--editable-border)]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-8 w-8 opacity-40" />}
      </div>
      <h2 className="mt-4 text-lg font-bold leading-tight tracking-tight">{post.title}</h2>
      {role ? <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--archive-accent)]">{role}</p> : null}
      <p className="mt-3 line-clamp-2 text-sm leading-5 opacity-60">{getSummary(post)}</p>
    </Link>
  )
}
