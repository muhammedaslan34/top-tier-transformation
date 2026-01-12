# Top Tier Tech - Digital Transformation & Technology Consulting

A modern, bilingual (English/Arabic) website for Top Tier Tech, featuring digital transformation and technology consulting services.

## Features

- 🌐 **Bilingual Support**: Full English and Arabic translations with RTL layout support
- 📱 **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- 🎨 **Modern UI**: Built with shadcn-ui components and Tailwind CSS
- ⚡ **Fast Performance**: Built with Vite for optimal performance
- 🔄 **Smooth Animations**: Framer Motion for engaging user interactions

## Technologies

This project is built with:

- **Vite** - Next generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **React Router** - Client-side routing
- **shadcn-ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **i18next** - Internationalization framework
- **React i18next** - React bindings for i18next

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd top-tier-transformation

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/        # React components
│   ├── layout/       # Header, Footer, etc.
│   ├── sections/     # Page sections (Hero, Services, etc.)
│   └── ui/           # shadcn-ui components
├── pages/            # Page components
│   └── services/     # Service detail pages
├── i18n/            # Internationalization
│   ├── config.ts    # i18next configuration
│   └── locales/     # Translation files (en.json, ar.json)
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## Internationalization

The website supports two languages:
- **English (en)** - Default language
- **Arabic (ar)** - With full RTL support

Language preference is saved in localStorage and persists across sessions.

## Deployment

### Build for Production

```sh
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy Options

- **Vercel**: Connect your Git repository or upload the `dist` folder
- **Netlify**: Connect your Git repository or drag & drop the `dist` folder
- **GitHub Pages**: Deploy the `dist` folder to the `gh-pages` branch
- **Any Static Hosting**: Upload the contents of the `dist` folder

## License

© 2024 Top Tier Tech. All rights reserved.
