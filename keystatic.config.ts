import { config, collection, singleton, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'SionM1',
      name: 'AneiraThomasPeronalWebsite',
    },
  },

  ui: {
    brand: {
      name: 'Aneira Thomas — Admin',
    },
  },

  collections: {
    // ─── Artworks ────────────────────────────────────────────────────────────
    artworks: collection({
      label: 'Artworks',
      slugField: 'title',
      path: 'data/artworks/*',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'Name of the artwork',
          },
        }),
        medium: fields.text({
          label: 'Medium',
          description: 'e.g. Distemper and oil paint on canvas',
        }),
        size: fields.text({
          label: 'Size',
          description: 'e.g. 51x66cm',
        }),
        image: fields.image({
          label: 'Image',
          directory: 'public/static/images/artwork-uploads',
          publicPath: '/static/images/artwork-uploads/',
          validation: { isRequired: false },
        }),
        year: fields.number({
          label: 'Year',
          validation: { isRequired: false },
        }),
        available: fields.checkbox({
          label: 'Available for purchase',
          defaultValue: false,
        }),
        dateAdded: fields.date({
          label: 'Date Added',
          description:
            'Set to today when adding a new artwork — controls display order (newest first)',
          validation: { isRequired: false },
        }),
      },
    }),

    // ─── Exhibitions ──────────────────────────────────────────────────────────
    exhibitions: collection({
      label: 'Exhibitions & Awards',
      slugField: 'title',
      path: 'data/exhibitions/*',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
        }),
        venue: fields.text({
          label: 'Venue',
          description: 'Leave blank for awards',
          validation: { isRequired: false },
        }),
        date: fields.text({
          label: 'Date',
          description: 'e.g. 11th–15th July 2025 or just 2024',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: false },
        }),
        image: fields.image({
          label: 'Poster / Image',
          directory: 'public/static/images/exhibition-uploads',
          publicPath: '/static/images/exhibition-uploads/',
          validation: { isRequired: false },
        }),
        link: fields.url({
          label: 'Link (optional)',
          validation: { isRequired: false },
        }),
        order: fields.number({
          label: 'Display Order',
          description: 'Lower number = shown first. Set to 1 for newest.',
          defaultValue: 99,
        }),
      },
    }),

    // ─── Blog posts ───────────────────────────────────────────────────────────
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'data/blog/**',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
        }),
        date: fields.date({
          label: 'Date',
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        draft: fields.checkbox({
          label: 'Draft (hidden on live site)',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),
  },

  singletons: {
    // ─── About page ───────────────────────────────────────────────────────────
    about: singleton({
      label: 'About Page',
      path: 'data/about/content',
      format: { data: 'json' },
      schema: {
        row1_p1: fields.text({ label: 'Section 1 — Paragraph 1', multiline: true }),
        row1_p2: fields.text({ label: 'Section 1 — Paragraph 2', multiline: true }),
        row1_image: fields.image({
          label: 'Section 1 — Image',
          directory: 'public/static/images/about',
          publicPath: '/static/images/about/',
        }),
        row2_p1: fields.text({ label: 'Section 2 — Paragraph 1', multiline: true }),
        row2_p2: fields.text({ label: 'Section 2 — Paragraph 2', multiline: true }),
        row2_image: fields.image({
          label: 'Section 2 — Image',
          directory: 'public/static/images/about',
          publicPath: '/static/images/about/',
        }),
        row3_p1: fields.text({ label: 'Section 3 — Paragraph 1', multiline: true }),
        row3_p2: fields.text({ label: 'Section 3 — Paragraph 2', multiline: true }),
        row3_image: fields.image({
          label: 'Section 3 — Image',
          directory: 'public/static/images/about',
          publicPath: '/static/images/about/',
        }),
      },
    }),

    // ─── Contact page ─────────────────────────────────────────────────────────
    contact: singleton({
      label: 'Contact Page',
      path: 'data/contact/content',
      format: { data: 'json' },
      schema: {
        email: fields.text({ label: 'Email Address' }),
        location: fields.text({ label: 'Location' }),
        responseTime: fields.text({
          label: 'Response Time',
          description: 'e.g. Usually within 24-48 hours',
        }),
        introText: fields.text({ label: 'Intro Text', multiline: true }),
      },
    }),

    // ─── Author / About ───────────────────────────────────────────────────────
    author: singleton({
      label: 'Author Profile (Blog)',
      path: 'data/authors/default',
      format: { contentField: 'bio' },
      entryLayout: 'content',
      schema: {
        name: fields.text({ label: 'Name' }),
        occupation: fields.text({ label: 'Occupation' }),
        company: fields.text({ label: 'Company / Studio' }),
        email: fields.text({ label: 'Email' }),
        linkedin: fields.url({ label: 'LinkedIn URL', validation: { isRequired: false } }),
        avatar: fields.text({
          label: 'Avatar image path',
          description: 'e.g. /static/images/aneira-avatar.jpg',
        }),
        bio: fields.markdoc({
          label: 'Bio (full about page content)',
        }),
      },
    }),
  },
})
