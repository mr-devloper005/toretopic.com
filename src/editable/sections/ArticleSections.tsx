import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, postHref, getEditableCategory } from '@/editable/cards/PostCards'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-8 sm:pt-10`}>
        <div className="rounded-sm border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] p-6 text-[var(--slot4-dark-text)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--slot4-accent-soft)]">{voice.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{voice.headline}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">{voice.description}</p>
          <form action={basePath} className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
            <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 border border-white/15 bg-white px-4 py-2.5 text-sm font-bold text-[var(--slot4-page-text)] outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-bold text-white">Filter</button>
          </form>
        </div>
      </section>

      <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        {posts.length ? (
          <div className="grid gap-4">
            {posts.map((post, index) => <ArticleListCard key={post.id} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />)}
          </div>
        ) : (
          <div className="rounded-sm border border-[var(--editable-border)] bg-white p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">No articles found</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">Try another category or return to all articles.</p>
          </div>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {pagination.hasPrevPage ? <Link href={pageHref(page - 1)} className="border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-bold">Previous</Link> : null}
          <span className="bg-[var(--slot4-accent)] px-4 py-2 text-sm font-bold text-white">Page {page} of {pagination.totalPages || 1}</span>
          {pagination.hasNextPage ? <Link href={pageHref(page + 1)} className="border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-bold">Next</Link> : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug: _slug, post }: { slug: string; post: SitePost | null }) {
  const category = post ? getEditableCategory(post) : 'Article'
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-8 sm:pt-10`}>
        <div className="rounded-sm border border-[var(--editable-border)] bg-white p-5 shadow-[0_4px_20px_rgba(61,26,26,0.06)] sm:p-8">
          <Link href="/article" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)]"><ArrowLeft className="h-4 w-4" /> Back to Article</Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[var(--slot4-muted-text)]">{category}</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{post?.title || pagesContent.detailPages.article.fallbackTitle}</h1>
          {post?.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 border border-[var(--editable-border)] px-3 py-1 text-[11px] font-bold text-[var(--slot4-muted-text)]">◇ {tag}</span>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
