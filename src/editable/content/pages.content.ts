import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Articles, essays, and useful reading',
      description: 'Explore thoughtful articles, editorial picks, topical guides, and search-friendly reading collections.',
      openGraphTitle: 'Articles, essays, and useful reading',
      openGraphDescription: 'Discover article-led stories and guides through a calmer magazine-inspired reading experience.',
      keywords: ['article site', 'editorial articles', 'reading platform', 'content discovery'],
    },
    hero: {
      badge: 'Fresh articles daily',
      title: ['Read sharper articles', 'without the clutter.'],
      description: 'A focused editorial home for essays, explainers, interviews, opinion pieces, and practical guides that are easy to browse and pleasant to read.',
      primaryCta: { label: 'Read latest articles', href: '/article' },
      secondaryCta: { label: 'Search the archive', href: '/search' },
      searchPlaceholder: 'Search articles, topics, authors, and guides',
      focusLabel: 'Editorial focus',
      featureCardBadge: 'cover story',
      featureCardTitle: 'A magazine-style cover story supported by clean article sections.',
      featureCardDescription: 'Recent articles lead the page, while secondary stories keep the layout balanced and readable.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and returning to the right article quickly.',
      paragraphs: [
        'This site treats articles as the center of the experience: readable headlines, balanced excerpts, useful metadata, and a page rhythm that supports browsing.',
        'The layout borrows from clean magazine systems without becoming stretched or crowded, so every page has a normal reading width and a clear next step.',
        'Whether someone starts from the homepage, search, or an article detail page, they can keep discovering related writing without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Article-first homepage with a cover story, editor picks, and recent reads.',
        'Normal width containers that avoid stretched text and oversized grids.',
        'Reusable cards designed for headlines, excerpts, categories, and images.',
        'Clear login, signup, about, contact, search, and article detail flows.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'Search archive', href: '/search' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Find the article worth reading next.',
      description: 'Move from cover stories to latest posts, editor picks, and searchable article collections through one consistent visual system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Editorial', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the publication',
    title: 'A calmer, clearer way to read articles online.',
    description: `${slot4BrandConfig.siteName} is an article-first publication shaped for readers who want strong headlines, useful context, and a clean path into the next story.`,
    paragraphs: [
      'We publish and organize articles so visitors can scan quickly, open confidently, and settle into a comfortable reading flow once a story earns their attention.',
      'The experience is intentionally restrained: fewer distractions, stronger hierarchy, and page widths that respect how people actually read.',
      'Our goal is simple: make every homepage section, archive result, and article detail page feel like part of the same thoughtful editorial system.',
    ],
    values: [
      {
        title: 'Reader-first pacing',
        description: 'We prioritize readable headlines, clean summaries, and generous spacing so articles feel calm instead of crowded.',
      },
      {
        title: 'Editorial discovery',
        description: 'Latest reads, featured stories, related articles, and search all work together so visitors can keep exploring naturally.',
      },
      {
        title: 'Useful presentation',
        description: 'The design keeps the publication polished while still making categories, dates, summaries, and calls to action easy to understand.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Pitch an article, suggest a topic, or ask the editorial desk a question.',
    description: 'Use this page for article submissions, corrections, partnership notes, author inquiries, and topic ideas that could become useful reading for the audience.',
    formTitle: 'Write to the editorial desk',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
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
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
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
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
