import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f5e1c8',
  '--slot4-page-text': '#3d1a1a',
  '--slot4-panel-bg': '#f0d4b8',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#6b4444',
  '--slot4-soft-muted-text': '#8a6262',
  '--slot4-accent': '#8b2131',
  '--slot4-accent-fill': '#8b2131',
  '--slot4-accent-soft': '#f5d5d5',
  '--slot4-dark-bg': '#3d1a1a',
  '--slot4-dark-text': '#faf3ec',
  '--slot4-media-bg': '#eedcc8',
  '--slot4-cream': '#faf3ec',
  '--slot4-warm': '#f5e1c8',
  '--slot4-lavender': '#f5d5d5',
  '--slot4-gray': '#f0e4d4',
  '--slot4-body-gradient': 'linear-gradient(180deg, #f5e1c8 0%, #f0d4b8 50%, #eedcc8 100%)',
  '--editable-container': '1240px',
  '--editable-border': 'rgba(139,33,49,0.15)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[rgba(139,33,49,0.15)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_4px_20px_rgba(61,26,26,0.08)]',
  shadowStrong: 'shadow-[0_8px_30px_rgba(61,26,26,0.12)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(61,26,26,0.05),rgba(61,26,26,0.55))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-10 sm:py-12 lg:py-14',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start',
    rail: 'flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[150px] shrink-0 snap-start sm:w-[170px]',
  },
  type: {
    eyebrow: 'text-xs font-bold uppercase tracking-[0.12em]',
    heroTitle: 'text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]',
    sectionTitle: 'text-2xl font-bold tracking-tight sm:text-3xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-md ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-sm bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90`,
    secondary: `inline-flex items-center justify-center rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg} px-5 py-2.5 text-sm font-bold ${editablePalette.surfaceText} transition hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center rounded-sm bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90`,
  },
  media: {
    frame: `relative overflow-hidden rounded-md ${editablePalette.mediaBg}`,
    ratio: 'aspect-[3/2]',
  },
  motion: {
    lift: 'transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(61,26,26,0.12)]',
    fade: 'transition duration-200 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
