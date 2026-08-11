import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

export const visualPresets = {
  'editorial-paper': {
    label: 'Warm Directory',
    mood: 'playful editorial directory',
    fontDirection: 'serif headlines with clean readable body',
    colors: {
      background: '#f5e1c8',
      foreground: '#3d1a1a',
      muted: '#6b4444',
      primary: '#8b2131',
      accent: '#8b2131',
      surface: '#ffffff',
    },
    shape: 'soft cards with maroon borders and warm tones',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'premium, restrained, polished',
    fontDirection: 'high-contrast display headings with spacious tracking',
    colors: {
      background: '#0f1110',
      foreground: '#f6ead8',
      muted: '#b8aa94',
      primary: '#d7b56d',
      accent: '#7f1d1d',
      surface: '#181a17',
    },
    shape: 'large dark panels, gold hairlines, generous negative space',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'bold, raw, memorable',
    fontDirection: 'condensed headings, mono labels, hard rhythm',
    colors: {
      background: '#f2f0e8',
      foreground: '#111111',
      muted: '#55524a',
      primary: '#111111',
      accent: '#ff4d00',
      surface: '#ffffff',
    },
    shape: 'sharp edges, thick borders, offset blocks',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'soft editorial, trustworthy',
    fontDirection: 'humanist sans with crisp article captions',
    colors: {
      background: '#f5e1c8',
      foreground: '#3d1a1a',
      muted: '#6b4444',
      primary: '#8b2131',
      accent: '#8b2131',
      surface: '#ffffff',
    },
    shape: 'rounded cards, natural spacing, calm texture',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'clean, fast, useful',
    fontDirection: 'modern sans with crisp mono data accents',
    colors: {
      background: '#f5e1c8',
      foreground: '#3d1a1a',
      muted: '#6b4444',
      primary: '#8b2131',
      accent: '#8b2131',
      surface: '#ffffff',
    },
    shape: 'clean grids, pill filters, sharp information hierarchy',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'playful, local, energetic',
    fontDirection: 'chunky headings with friendly body type',
    colors: {
      background: '#f5e1c8',
      foreground: '#3d1a1a',
      muted: '#6b4444',
      primary: '#8b2131',
      accent: '#8b2131',
      surface: '#ffffff',
    },
    shape: 'stickers, tabs, framed modules, playful dividers',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'cinematic, image-led, immersive',
    fontDirection: 'minimal sans with oversized display moments',
    colors: {
      background: '#f5e1c8',
      foreground: '#3d1a1a',
      muted: '#6b4444',
      primary: '#8b2131',
      accent: '#8b2131',
      surface: '#ffffff',
    },
    shape: 'warm cards, large media, soft overlays',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset:
    slot4BrandConfig.productKind === 'visual'
      ? 'visual-gallery'
      : slot4BrandConfig.productKind === 'editorial'
        ? 'editorial-paper'
        : slot4BrandConfig.productKind === 'directory'
          ? 'tech-directory'
          : 'organic-journal',
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.375rem',
    xl: '0.5rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-500',
    cardHover: 'transition duration-200 hover:-translate-y-0.5 hover:shadow-lg',
    softHover: 'transition duration-200 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-bold uppercase tracking-[0.14em]',
    heroTitle: 'text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl',
    sectionTitle: 'text-2xl font-bold tracking-tight sm:text-3xl',
    body: 'text-base leading-7',
    caption: 'text-xs font-medium uppercase tracking-[0.14em]',
  },
  surfaces: {
    glass: 'border border-[rgba(139,33,49,0.12)] bg-white/80 backdrop-blur-lg',
    paper: 'border border-[rgba(139,33,49,0.12)] bg-white shadow-[0_4px_20px_rgba(61,26,26,0.06)]',
    quiet: 'border border-[rgba(139,33,49,0.10)] bg-[var(--slot4-cream)]',
    dark: 'border border-white/10 bg-[#3d1a1a] shadow-[0_8px_30px_rgba(61,26,26,0.18)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-10 sm:py-12 lg:py-14',
    cardGrid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
