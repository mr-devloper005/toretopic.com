import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)
const envSiteName = process.env.NEXT_PUBLIC_SITE_NAME || process.env.NEXT_PUBLIC_BRAND_NAME
const envTagline = process.env.NEXT_PUBLIC_SITE_TAGLINE
const envDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN
const envBaseUrl = process.env.NEXT_PUBLIC_SITE_URL

export const slot4BrandConfig = {
  siteName: envSiteName || siteIdentity.name,
  tagline: envTagline || siteIdentity.tagline,
  domain: envDomain || siteIdentity.domain,
  baseUrl: envBaseUrl || siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents:
    productKind === 'visual'
      ? { primary: '#8df0c8', surface: '#07101f' }
      : productKind === 'editorial'
        ? { primary: '#241711', surface: '#fbf6ee' }
        : productKind === 'directory'
          ? { primary: '#0f172a', surface: '#f8fbff' }
          : { primary: '#5b2b3b', surface: '#f7f1ea' },
} as const
