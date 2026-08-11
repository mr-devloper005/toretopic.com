import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Businesses, Products & Service Discovery',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Businesses, Products & Service Discovery',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'Articles', href: '/article' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse listings', href: '/' },
      secondary: { label: 'Contact us', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Your trusted discovery platform.',
    description: 'A curated directory for discovering businesses, reading insightful articles, and connecting with services that matter to you.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/article' },
          { label: 'Latest posts', href: '/article' },
          { label: 'Search', href: '/search' },
          { label: 'Contact us', href: '/contact' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Your go-to platform for business discovery.',
  },
  commonLabels: {
    readMore: 'Read article',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
