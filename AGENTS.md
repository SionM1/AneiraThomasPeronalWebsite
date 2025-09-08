# AGENTS.md - Development Guidelines

## Commands
- **Development**: `npm run dev` or `yarn dev` 
- **Build**: `npm run build` or `yarn build`
- **Lint**: `npm run lint` (auto-fixes issues in app/, components/, layouts/, scripts/)
- **Start**: `npm run serve` (production server)
- **Analyze**: `npm run analyze` (bundle analysis)

## Architecture
- **Framework**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Content**: Contentlayer for MDX blog posts and author pages from `data/` directory
- **Structure**: `app/` (pages), `components/` (UI), `layouts/` (page layouts), `data/` (content/config)
- **Styling**: Tailwind CSS with custom theme, dark/light mode support
- **Search**: Built-in search with kbar, generates search index automatically

## Code Style
- **Imports**: Use `@/` path aliases (`@/components/*`, `@/data/*`, `@/layouts/*`)
- **Components**: Functional components with TypeScript, PascalCase naming
- **Styling**: Tailwind classes, responsive-first design patterns
- **Formatting**: Prettier (no semicolons, single quotes, 100 char width, 2-space tabs)
- **Files**: Use `.tsx` for React components, `.ts` for utilities
- **Props**: No prop-types (disabled), TypeScript interfaces preferred

## Content
- **Blog posts**: MDX files in `data/blog/` with frontmatter (title, date, tags, summary, etc.)
- **Authors**: MDX files in `data/authors/` 
- **Configuration**: `data/siteMetadata.js` for site config, `data/headerNavLinks.ts` for navigation
- **Static assets**: Place in `public/` directory
