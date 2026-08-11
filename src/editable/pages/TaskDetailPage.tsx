import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, CheckCircle2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Tag, UserRound, Send } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'

const linkifyMarkdown = (value: string) => value
  .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) => linkifyMarkdown(value)
  .replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})

const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const summaryText = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || '')
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const detailVars = { '--detail-bg': '#f5e1c8', '--detail-text': '#3d1a1a', '--detail-surface': '#ffffff', '--detail-accent': '#8b2131' } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[var(--detail-bg)] text-[var(--detail-text)]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--detail-accent)]">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related: _related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  const category = categoryOf(post, 'Article')
  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <article className="min-w-0">
        <BackLink task="article" />
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--detail-muted,#6b4444)]">{category}</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
        <p className="mt-2 text-sm text-[var(--detail-muted,#6b4444)]">By {SITE_CONFIG.name}</p>

        {post.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 border border-[var(--editable-border)] px-3 py-1 text-[11px] font-bold text-[var(--detail-muted,#6b4444)]">◇ {tag}</span>
            ))}
          </div>
        ) : null}

        {images.length > 0 ? (
          <div className="mt-6 overflow-hidden rounded-sm border border-[var(--editable-border)]">
            <div className={`grid gap-0.5 bg-[var(--slot4-media-bg)] ${images.length >= 4 ? 'grid-cols-2' : images.length >= 2 ? 'grid-cols-2' : ''}`}>
              {images.slice(0, 4).map((img, i) => (
                <div key={`${img}-${i}`} className={`relative overflow-hidden ${images.length === 1 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <BodyContent post={post} />

        <div className="mt-10 border-t border-[var(--editable-border)] pt-6">
          <EditableComments slug={post.slug} comments={comments} />
        </div>
      </article>
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <BackLink task="listing" />
      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <article className="rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-[0_4px_20px_rgba(61,26,26,0.06)] sm:p-7">
          <div className="grid gap-5 sm:grid-cols-[120px_1fr]">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-sm bg-[var(--detail-bg)] ring-1 ring-[var(--editable-border)]">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-10 w-10 opacity-35" />}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--detail-accent)]">Business listing</p>
              <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 opacity-65">{summaryText(post)}</p>
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-4">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-12">
      <aside className="rounded-sm border border-[var(--editable-border)] bg-[var(--detail-accent)] p-6 text-white shadow-lg lg:sticky lg:top-20 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.14em] opacity-55">Classified notice</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
        <div className="mt-6 grid gap-2">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {phone ? <a href={`tel:${phone}`} className="bg-white px-4 py-2 text-sm font-bold text-[var(--detail-accent)]">Call now</a> : null}
          {email ? <a href={`mailto:${email}`} className="border border-white/25 px-4 py-2 text-sm font-bold">Email</a> : null}
        </div>
      </aside>
      <article className="rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-[0_4px_20px_rgba(61,26,26,0.06)] sm:p-7">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <BackLink task="image" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="rounded-sm border border-[var(--editable-border)] bg-white p-5 lg:sticky lg:top-20 lg:self-start">
          <div className="inline-flex items-center gap-1.5 bg-[var(--detail-accent)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white"><Camera className="h-3.5 w-3.5" /> Image story</div>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm leading-6 opacity-65">{summaryText(post)}</p>
          <BodyContent post={post} compact />
        </aside>
        <div className="columns-1 gap-4 space-y-4 md:columns-2">
          {(images.length ? images : ['/placeholder.svg?height=900&width=1200']).map((image, index) => (
            <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden rounded-sm border border-[var(--editable-border)] bg-white shadow-sm">
              <img src={image} alt="" className="w-full object-cover" />
              {index === 0 ? <figcaption className="p-4 text-sm font-medium opacity-60">Featured visual from this image post.</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-8"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:py-12">
      <article className="rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-[0_4px_20px_rgba(61,26,26,0.06)] sm:p-8">
        <BackLink task="sbm" />
        <div className="mt-8 flex h-16 w-16 items-center justify-center bg-[var(--detail-accent)] text-white"><Bookmark className="h-7 w-7" /></div>
        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 opacity-65">{summaryText(post)}</p>
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 bg-[var(--detail-accent)] px-4 py-2 text-sm font-bold text-white">Open saved resource <ExternalLink className="h-3.5 w-3.5" /></Link> : null}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" post={post} related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:py-12">
      <article className="rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-[0_4px_20px_rgba(61,26,26,0.06)] sm:p-7">
        <BackLink task="pdf" />
        <div className="mt-6 grid gap-5 sm:grid-cols-[100px_1fr]">
          <div className="flex h-24 w-24 items-center justify-center bg-[var(--detail-accent)] text-white"><FileText className="h-10 w-10" /></div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--detail-accent)]">PDF resource</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        {fileUrl ? (
          <div className="mt-6 overflow-hidden border border-[var(--editable-border)] bg-[var(--detail-bg)]">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--editable-border)] bg-white p-3">
              <span className="text-sm font-bold">Document preview</span>
              <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-[var(--detail-accent)] px-3 py-1.5 text-[11px] font-bold text-white">Download <Download className="h-3.5 w-3.5" /></Link>
            </div>
            <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[78vh] w-full" />
          </div>
        ) : null}
      </article>
      <RelatedPanel task="pdf" post={post} related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:px-8 lg:py-12">
      <aside className="rounded-sm border border-[var(--editable-border)] bg-white p-6 text-center shadow-[0_4px_20px_rgba(61,26,26,0.06)] lg:sticky lg:top-20 lg:self-start">
        <BackLink task="profile" />
        <div className="mx-auto mt-8 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-[var(--detail-bg)] ring-1 ring-[var(--editable-border)]">
          {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-12 w-12 opacity-40" />}
        </div>
        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight">{post.title}</h1>
        {role ? <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--detail-accent)]">{role}</p> : null}
        <ContactAction website={website} email={email} />
      </aside>
      <article className="rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-sm sm:p-8">
        <BodyContent post={post} />
        <ImageStrip images={images.slice(1)} label="Profile gallery" />
        <RelatedPanel task="profile" post={post} related={related} />
      </article>
    </section>
  )
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  return <div className={`article-content mt-6 max-w-none ${compact ? 'text-sm leading-7' : 'text-base leading-8'} opacity-75`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-6 grid gap-2 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="border border-[var(--editable-border)] bg-[var(--detail-bg)] p-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] opacity-50"><Icon className="h-3.5 w-3.5" /> {label}</div>
          <p className="mt-1.5 break-words text-sm font-bold leading-5 opacity-75">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--detail-accent)]">{label}</p>
      <div className={`mt-3 grid gap-2 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] rounded-sm object-cover ring-1 ring-[var(--editable-border)]" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-sm border border-[var(--editable-border)] bg-white shadow-sm">
      <div className="flex items-center gap-1.5 p-3 text-sm font-bold"><MapPin className="h-3.5 w-3.5" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-72 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-4 rounded-sm border border-[var(--editable-border)] bg-white p-4 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-50">Quick actions</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-[var(--detail-accent)] px-3 py-2 text-sm font-bold text-white">Website <ExternalLink className="h-3.5 w-3.5" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-1.5 border border-[var(--editable-border)] px-3 py-2 text-sm font-bold"><Phone className="h-3.5 w-3.5" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 border border-[var(--editable-border)] px-3 py-2 text-sm font-bold"><Mail className="h-3.5 w-3.5" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-3 border border-white/15 bg-white/10 px-3 py-2.5 text-sm"><span className="font-bold uppercase tracking-[0.1em] opacity-55">{label}</span><span className="font-bold">{value}</span></div>
}

function RelatedPanel({ task, post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-4">
      {!compact ? (
        <div className="rounded-sm border border-[var(--editable-border)] bg-white/70 p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-50">About this post</p>
          <div className="mt-3 grid gap-2 text-sm font-medium opacity-70">
            <p className="inline-flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Site: {SITE_CONFIG.name}</p>
            {post.publishedAt ? <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p> : null}
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className="rounded-sm border border-[var(--editable-border)] bg-white/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold tracking-tight">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-[11px] font-bold uppercase tracking-[0.12em] opacity-50">View all</Link>
          </div>
          <div className="mt-4 grid gap-2">
            {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 border border-[var(--editable-border)] bg-white p-2.5 transition hover:-translate-y-0.5 hover:shadow-md">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-16 w-16 shrink-0 rounded-sm object-cover" /> : <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[var(--detail-bg)]"><FileText className="h-5 w-5 opacity-40" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug">{post.title}</h3>
        <p className="mt-1 line-clamp-1 text-[11px] leading-4 opacity-55">{summaryText(post)}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug: _slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-2">
      <div className="flex items-center gap-2 text-base font-bold text-[var(--detail-accent)]"><MessageCircle className="h-5 w-5" /> Comments ({comments.length})</div>
      <div className="mt-4 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="border border-[var(--editable-border)] bg-white p-4">
            <p className="text-sm font-bold">{comment.name}</p>
            <p className="mt-1.5 text-sm leading-6 opacity-65">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? (
          <div className="border border-[var(--editable-border)] bg-white p-5">
            <div className="grid gap-3">
              <input placeholder="Your name (optional)" className="border border-[var(--editable-border)] px-4 py-2.5 text-sm outline-none placeholder:opacity-45" />
              <textarea placeholder="Share your thoughts..." rows={3} className="border border-[var(--editable-border)] px-4 py-2.5 text-sm outline-none placeholder:opacity-45" />
              <button className="ml-auto inline-flex items-center gap-1.5 bg-[var(--detail-accent)] px-4 py-2 text-sm font-bold text-white opacity-70"><Send className="h-3.5 w-3.5" /> Post comment</button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
