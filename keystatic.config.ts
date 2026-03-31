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
        imagePath: fields.text({
          label: 'Image Path',
          description:
            'Path to the image in /public, e.g. /static/images/Website%20gallery/My%20Painting.jpeg',
        }),
        year: fields.number({
          label: 'Year',
          validation: { isRequired: false },
        }),
        price: fields.text({
          label: 'Price',
          description: 'e.g. £1,200 — leave blank if not for sale',
          validation: { isRequired: false },
        }),
        available: fields.checkbox({
          label: 'Available for purchase',
          defaultValue: false,
        }),
        dateAdded: fields.text({
          label: 'Date Added',
          description: 'ISO date e.g. 2025-03-30 — controls display order (newest first)',
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
    // ─── Author / About ───────────────────────────────────────────────────────
    author: singleton({
      label: 'About / Author Profile',
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
