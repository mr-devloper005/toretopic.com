import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Discover Businesses, Products & Services',
      description: 'Explore featured businesses, read insightful articles, and discover services through our curated directory platform.',
      openGraphTitle: 'Discover Businesses, Products & Services',
      openGraphDescription: 'Your trusted platform for business discovery, insightful articles, and service listings.',
      keywords: ['business directory', 'service discovery', 'featured businesses', 'articles'],
    },
    hero: {
      badge: 'Featured businesses',
      title: ['Discover businesses,', 'products & services.'],
      description: 'Browse our curated collection of featured businesses, read insightful articles, and find the services you need — all in one place.',
      primaryCta: { label: 'Browse articles', href: '/article' },
      secondaryCta: { label: 'Search directory', href: '/search' },
      searchPlaceholder: 'Search businesses, products or services',
      focusLabel: 'Directory spotlight',
      featureCardBadge: 'featured',
      featureCardTitle: 'Connecting you with trusted businesses and quality content.',
      featureCardDescription: 'Our curated directory highlights businesses worth knowing about, paired with editorial content that adds real value.',
    },
    intro: {
      badge: 'About the platform',
      title: 'A discovery platform built for business owners and curious readers alike.',
      paragraphs: [
        'We bring together businesses, services, and editorial content in a single, easy-to-browse platform designed for discovery.',
        'Every listing is presented with care — clear descriptions, useful details, and a layout that makes browsing feel natural.',
        'Whether you arrive from search, the homepage, or a shared link, the experience stays consistent and helpful.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Featured business spotlights with rich details and images.',
        'Latest listings rail for quick browsing of new additions.',
        'Editorial articles with star ratings and category labels.',
        'Clean search, filtering, and category-based discovery.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'Search directory', href: '/search' },
    },
    cta: {
      badge: 'Get started',
      title: 'Ready to explore what we have to offer?',
      description: 'From featured businesses to in-depth articles, find everything you need through our organized directory and editorial sections.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About us',
    title: 'A platform for discovery, connection, and insight.',
    description: `${slot4BrandConfig.siteName} is a curated platform that brings together business listings, editorial articles, and service discovery in one clean, browsable experience.`,
    paragraphs: [
      'We believe that finding the right business or reading a useful article should feel effortless. Our platform is designed with that principle at its core.',
      'Every listing and article is presented with attention to detail — clear layouts, useful metadata, and a browsing experience that respects your time.',
      'Our goal is to be the place you come back to when you need to discover something new or revisit something trusted.',
    ],
    values: [
      {
        title: 'Curated Discovery',
        description: 'We carefully organize businesses and content so you can find what matters without wading through noise.',
      },
      {
        title: 'Quality First',
        description: 'Every listing and article meets our standards for clarity, usefulness, and presentation before it goes live.',
      },
      {
        title: 'Built for Browsing',
        description: 'The layout, navigation, and search features are designed to make exploration feel natural and rewarding.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Get in touch with our team.',
    description: 'Have a question, suggestion, or business inquiry? We would love to hear from you. Use the form to reach out directly.',
    formTitle: 'Send us a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search businesses, articles, products, and services across the platform.',
    },
    hero: {
      badge: 'Search directory',
      title: 'Find what you are looking for.',
      description: 'Use keywords, categories, and content types to discover businesses, articles, and services from every section of the platform.',
      placeholder: 'Search businesses, products or services',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the platform.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to access the publishing workspace and create posts for the active sections of this platform.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login to your account.',
      badge: 'Member access',
      title: 'Welcome back.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your account.',
      badge: 'Join us',
      title: 'Create your account.',
      description: 'Sign up to access the publishing workspace, save details, and submit content through the platform.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
