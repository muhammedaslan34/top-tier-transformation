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

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **i18next** - Internationalization framework
- **React i18next** - React bindings for i18next
- **Resend** - Email API service

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

# Step 4: Set up environment variables
# Copy .env.example to .env.local and add your Resend API key
# Get your API key from https://resend.com/api-keys
cp .env.example .env.local
# Then edit .env.local and add your RESEND_API_KEY

# Step 5: Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
RESEND_API_KEY=re_your_api_key_here
# Optional: Set recipient email for testing (defaults to your verified email)
# RESEND_RECIPIENT_EMAIL=your-verified-email@gmail.com
```

To get your Resend API key:
1. Sign up at https://resend.com
2. Go to API Keys section
3. Create a new API key
4. Copy the key and add it to `.env.local`

### Resend Testing Mode

**Important**: In Resend's testing mode, you can only send emails to your verified email address. The contact form will automatically send to your verified email (or the email set in `RESEND_RECIPIENT_EMAIL`).

**To send to other recipients (e.g., sales@tttech.com.sa):**
1. Verify your domain at https://resend.com/domains
2. Update the `from` address in `app/api/contact/route.ts` to use your verified domain
3. The form will then be able to send to any email address

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
app/
├── api/              # API routes
│   └── contact/      # Contact form email endpoint
├── about/            # About page
├── contact/          # Contact page
├── services/         # Services pages
└── layout.tsx        # Root layout
src/
├── components/        # React components
│   ├── layout/       # Header, Footer, etc.
│   ├── sections/     # Page sections (Hero, Services, etc.)
│   └── ui/           # shadcn-ui components
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

This creates an optimized production build in the `.next/` folder.

### Deploy Options

- **Vercel**: Connect your Git repository (automatically detects Next.js)
- **Netlify**: Connect your Git repository and configure Next.js
- **Any Node.js Hosting**: Run `npm run build` and `npm run start`

**Important**: Make sure to add your `RESEND_API_KEY` environment variable in your hosting platform's environment variables settings.

## License

© 2024 Top Tier Tech. All rights reserved.
