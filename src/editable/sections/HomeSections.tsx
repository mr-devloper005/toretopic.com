import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { globalContent } from '@/editable/content/global.content'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
}

function ArticleMeta({ post, label }: { post?: SitePost; label?: string }) {
  return (
    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
      {label || getEditableCategory(post)} <span className="text-black/30">/</span> Editorial
    </p>
  )
}

function CoverStory({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden rounded-lg border border-[var(--editable-border)] bg-white shadow-[0_18px_55px_rgba(17,17,17,0.08)]">
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="mx-auto -mt-12 w-[86%] max-w-3xl rounded-lg bg-white px-5 py-6 text-center shadow-[0_14px_35px_rgba(17,17,17,0.08)] sm:px-8">
          <ArticleMeta post={post} label="Cover story" />
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">{post.title}</h2>
          <p className="mx-auto mt-4 line-clamp-2 max-w-2xl text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 170)}</p>
        </div>
      </article>
    </Link>
  )
}

function FeatureColumnCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block">
      <article className="grid gap-4 border-b border-[var(--editable-border)] pb-5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div>
          <ArticleMeta post={post} />
          <h3 className="mt-2 line-clamp-2 text-lg font-black leading-snug tracking-tight">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 100)}</p>
        </div>
      </article>
    </Link>
  )
}

function CompactStory({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid grid-cols-[86px_minmax(0,1fr)] gap-4 rounded-lg border border-[var(--editable-border)] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(17,17,17,0.08)]">
      <div className="relative aspect-square overflow-hidden rounded-md bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]">Read {String(index + 1).padStart(2, '0')}</p>
        <h3 className="mt-2 line-clamp-2 text-sm font-black leading-snug">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 76)}</p>
      </div>
    </Link>
  )
}

function StandardArticleCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden rounded-lg border border-[var(--editable-border)] bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(17,17,17,0.10)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <ArticleMeta post={post} />
          <h3 className="mt-3 line-clamp-2 text-xl font-black leading-tight tracking-tight">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 145)}</p>
        </div>
      </article>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ')
  const cover = posts[0]
  const sideStories = posts.slice(1, 4)

  return (
    <section className="bg-white">
      <Section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">{heroTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={primaryRoute} className={dc.button.primary}>{pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/search" className={dc.button.secondary}>{pagesContent.home.hero.secondaryCta.label}</Link>
          </div>
        </div>

        {cover ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
            <CoverStory post={cover} href={postHref(primaryTask, cover, primaryRoute)} />
            <aside className="grid content-start gap-5">
              <div className="rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Editor note</p>
                <h2 className="mt-3 text-xl font-black tracking-tight">{pagesContent.home.hero.featureCardTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.featureCardDescription}</p>
              </div>
              {sideStories.map((post) => <FeatureColumnCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
            </aside>
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
    <section className="border-y border-[var(--editable-border)] bg-[var(--slot4-warm)]">
      <Section className="py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Latest desk</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">New articles to read now</h2>
          </div>
          <Link href={primaryRoute} className="hidden rounded-md border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-black sm:inline-flex">View all</Link>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {railPosts.map((post, index) => <CompactStory key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </Section>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(10, 16)
  if (!featured.length) return null
  return (
    <section className="bg-white">
      <Section className="py-12 sm:py-14">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Editor's picks</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Articles with staying power</h2>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((post) => <StandardArticleCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>
      </Section>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collectionPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(16)
  const visible = collectionPosts.slice(0, 8)
  if (!visible.length) return null

  return (
    <section className="bg-[var(--slot4-gray)]">
      <Section className="grid gap-9 py-12 sm:py-14 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Article archive</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Search by idea, topic, or headline.</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">The archive keeps the whole publication easy to scan without making the page feel stretched.</p>
          <form action="/search" className="mt-6 flex rounded-lg border border-[var(--editable-border)] bg-white p-2 shadow-sm">
            <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
            <button className="inline-flex items-center gap-2 rounded-md bg-[#111] px-4 py-2 text-sm font-black text-white"><Search className="h-4 w-4" /> Search</button>
          </form>
        </aside>
        <div className="grid gap-5 sm:grid-cols-2">
          {visible.map((post) => <StandardArticleCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>
      </Section>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white">
      <Section className="py-14 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{globalContent.site.name}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">{pagesContent.home.cta.title}</h2>
          <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.cta.description}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/article" className={dc.button.primary}>{pagesContent.home.cta.primaryCta.label}</Link>
            <Link href="/contact" className={dc.button.secondary}>{pagesContent.home.cta.secondaryCta.label}</Link>
          </div>
        </div>
      </Section>
    </section>
  )
}
