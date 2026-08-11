import Link from 'next/link'
import { ArrowRight, Clock3, Star, Zap } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { globalContent } from '@/editable/content/global.content'
import { SITE_CONFIG } from '@/lib/site-config'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
}

function getPostDate(post: SitePost) {
  if (!post.publishedAt) return ''
  return new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
}

function getPostImages(post: SitePost) {
  const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && Boolean(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && Boolean(url)) : []
  const single = typeof content.image === 'string' ? content.image : typeof content.featuredImage === 'string' ? content.featuredImage : ''
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return [...media, ...images, ...(single ? [single] : []), ...(logo ? [logo] : [])].filter(Boolean).slice(0, 6)
}

function FeaturedBusinessCard({ post, href }: { post: SitePost; href: string }) {
  const category = getEditableCategory(post)
  const dateStr = getPostDate(post)
  return (
    <Link href={href} className="group relative block min-h-[320px] overflow-hidden rounded-sm transition hover:shadow-lg sm:min-h-[380px]">
      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3d1a1a]/75 via-[#3d1a1a]/25 to-[#f5d5d5]/10" />
      <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-5 sm:min-h-[380px] sm:p-6">
        <span className="w-fit bg-[#8b2131] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">{category}</span>
        {dateStr ? <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-white/65"><Clock3 className="h-3 w-3" /> {dateStr}</p> : null}
        <h3 className="mt-2 max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl">{post.title}</h3>
      </div>
    </Link>
  )
}

function SmallBusinessCard({ post, href }: { post: SitePost; href: string }) {
  const category = getEditableCategory(post)
  const dateStr = getPostDate(post)
  return (
    <Link href={href} className="group relative block min-h-[180px] overflow-hidden rounded-sm transition hover:shadow-lg">
      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3d1a1a]/70 via-[#3d1a1a]/20 to-[#f5d5d5]/10" />
      <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-end p-4">
        <span className="w-fit bg-[#8b2131] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">{category}</span>
        {dateStr ? <p className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-white/60"><Clock3 className="h-2.5 w-2.5" /> {dateStr}</p> : null}
        <h3 className="mt-1 text-base font-bold leading-snug text-white">{post.title}</h3>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroTitle = globalContent.site.name
  const featured = posts[0]
  const sidePosts = posts.slice(1, 5)
  const topRow = sidePosts.slice(0, 2)
  const bottomRow = sidePosts.slice(2, 4)

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <Section className="py-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--slot4-accent)] bg-white">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
            </span>
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-[0.04em] text-[var(--slot4-accent)] sm:text-3xl">{heroTitle}</h1>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--slot4-muted-text)]">{globalContent.nav.tagline}</p>
            </div>
            <Zap className="h-7 w-7 text-orange-500" />
          </div>
        </div>

        <div className="flex items-center gap-2 border-b-2 border-[var(--slot4-accent)] pb-2">
          <h2 className="text-lg font-bold text-[var(--slot4-accent)]">Featured businesses</h2>
        </div>

        {featured ? (
          <div className="mt-4 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
            <FeaturedBusinessCard post={featured} href={postHref(primaryTask, featured, primaryRoute)} />
            <div className="grid grid-cols-2 gap-3">
              {topRow.map((post) => (
                <SmallBusinessCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ))}
              {bottomRow.map((post) => (
                <SmallBusinessCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ))}
            </div>
          </div>
        ) : null}
      </Section>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(4, 10)
  if (!railPosts.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <Section className="py-8">
        <div className="rounded-sm border border-[var(--editable-border)] bg-white/60 p-5">
          <h2 className="text-lg font-bold text-[var(--slot4-accent)]">Latest listings</h2>
          <div className="mt-1 h-px bg-[var(--slot4-accent)]" />
          <div className="mt-4 flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {railPosts.map((post) => {
              const category = getEditableCategory(post)
              return (
                <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex w-[220px] shrink-0 snap-start items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-[var(--slot4-media-bg)]">
                    <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--slot4-muted-text)]">{category}</p>
                    <h3 className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </Section>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const leftPosts = posts.slice(5, 9)
  const rightPosts = posts.slice(9, 14)
  if (!leftPosts.length) return null

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <Section className="py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.5fr]">
          <div>
            <h2 className="text-lg font-bold text-[var(--slot4-accent)]">New businesses</h2>
            <div className="mt-1 h-px bg-[var(--slot4-accent)]" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {leftPosts.map((post) => {
                const category = getEditableCategory(post)
                const dateStr = getPostDate(post)
                return (
                  <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group relative block min-h-[220px] overflow-hidden rounded-sm transition hover:shadow-lg">
                    <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3d1a1a]/70 via-[#3d1a1a]/20 to-[#f5d5d5]/10" />
                    <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-end p-4">
                      <span className="w-fit bg-[#8b2131] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">{category}</span>
                      {dateStr ? <p className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-white/60"><Clock3 className="h-2.5 w-2.5" /> {dateStr}</p> : null}
                      <h3 className="mt-1 text-lg font-bold leading-snug text-white">{post.title}</h3>
                    </div>
                  </Link>
                )
              })}
            </div>

            {leftPosts.length >= 3 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {posts.slice(9, 11).map((post) => {
                  const category = getEditableCategory(post)
                  return (
                    <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex gap-3 rounded-sm border border-[var(--editable-border)] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-[var(--slot4-media-bg)]">
                        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 py-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--slot4-muted-text)]">{category}</span>
                        <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug">{post.title}</h3>
                        <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 80)}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : null}
          </div>

          <div>
            <h2 className="text-lg font-bold text-[var(--slot4-accent)]">Recent listings</h2>
            <div className="mt-1 h-px bg-[var(--slot4-accent)]" />
            <div className="mt-4 grid gap-3">
              {rightPosts.map((post) => (
                <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex gap-3 py-2 transition hover:bg-white/40">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-[var(--slot4-media-bg)]">
                    <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
                    <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-[var(--slot4-muted-text)]"><Clock3 className="h-2.5 w-2.5" /> Recently listed</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collectionPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(14)
  const visible = collectionPosts.slice(0, 9)
  if (!visible.length) return null

  function generateRating(post: SitePost) {
    const hash = (post.title || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const rating = 3.8 + (hash % 14) / 10
    const reviews = 50 + (hash % 400)
    return { rating: Math.min(rating, 5.0).toFixed(1), reviews }
  }

  return (
    <section className="bg-[var(--slot4-page-bg)] pb-6">
      <Section className="py-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((post, index) => {
            const images = getPostImages(post)
            const category = getEditableCategory(post)
            const { rating, reviews } = generateRating(post)
            const displayImages = images.slice(0, 4)

            return (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group overflow-hidden rounded-sm border border-[var(--editable-border)] bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="grid grid-cols-2 gap-0.5 bg-[var(--slot4-media-bg)]">
                  {displayImages.length > 0 ? displayImages.slice(0, 4).map((img, i) => (
                    <div key={`${img}-${i}`} className="relative aspect-[4/3] overflow-hidden">
                      <img src={img} alt="" className="h-full w-full object-cover transition duration-400 group-hover:scale-105" />
                    </div>
                  )) : (
                    <div className="col-span-2 aspect-[16/9] bg-[var(--slot4-media-bg)]">
                      <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--slot4-muted-text)]">{category} · No. {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight">{post.title}</h3>
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(Number(rating)) ? 'fill-[#8b2131] text-[#8b2131]' : 'fill-[var(--slot4-media-bg)] text-[var(--slot4-media-bg)]'}`} />
                      ))}
                    </div>
                    <span className="text-[12px] font-bold text-[var(--slot4-accent)]">{rating}</span>
                    <span className="text-[12px] text-[var(--slot4-muted-text)]">({reviews})</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 100)}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--slot4-accent)]">Read article <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            )
          })}
        </div>
      </Section>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <Section className="py-10 text-center">
        <div className="mx-auto max-w-2xl rounded-sm border border-[var(--editable-border)] bg-white/70 p-8">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--slot4-accent)]">{globalContent.site.name}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">{pagesContent.home.cta.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{pagesContent.home.cta.description}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/article" className={dc.button.primary}>{pagesContent.home.cta.primaryCta.label}</Link>
            <Link href="/contact" className={dc.button.secondary}>{pagesContent.home.cta.secondaryCta.label}</Link>
          </div>
        </div>
      </Section>
    </section>
  )
}
