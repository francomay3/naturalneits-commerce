# Naturalneits Commerce

A modern, high-performance ecommerce storefront built with Next.js 15, React 19, and Shopify. This project showcases cutting-edge web technologies with a focus on performance, user experience, and developer experience.

![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![Shopify](https://img.shields.io/badge/Shopify-API-green)

## ✨ Features

### 🛍️ Ecommerce Functionality

- **Product Catalog**: Browse products with responsive grid layout
- **Product Details**: Rich product pages with image carousels, variant selection, and detailed descriptions
- **Shopping Cart**: Persistent cart with optimistic updates and real-time quantity management
- **Checkout Integration**: Seamless Shopify checkout flow
- **Product Variants**: Support for multiple product options (size, color, etc.)
- **Related Products**: AI-powered product recommendations

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Mantine UI**: Beautiful, accessible components
- **Image Carousel**: Interactive product image galleries with zoom functionality
- **Smooth Animations**: Headroom effects, transitions, and micro-interactions
- **Typography**: Custom Google Fonts (Karla & Gilda Display) for optimal readability

### ⚡ Performance & SEO

- **Server-Side Rendering**: Fast initial page loads with Next.js App Router
- **Optimistic Updates**: Instant UI feedback with React 19's `useOptimistic`
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **SEO Optimized**: Meta tags, structured data, and sitemap generation
- **TypeScript**: Full type safety throughout the application

### 🔧 Developer Experience

- **Modern Stack**: Next.js 15, React 19, TypeScript 5.8
- **State Management**: React Context with optimistic updates
- **Code Quality**: ESLint, Prettier, and TypeScript strict mode
- **Development Tools**: Turbopack for fast development builds

## 🏗️ Architecture

### Core Technologies

- **Frontend**: Next.js 15 with App Router
- **UI Framework**: Mantine v8 with custom theming
- **Ecommerce**: Shopify Storefront API
- **State Management**: React Context + Server Actions
- **Type Safety**: TypeScript throughout

### Key Components

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with product grid
│   ├── product/[handle]/   # Dynamic product pages
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable UI components
│   ├── Cart/             # Shopping cart functionality
│   ├── Header/           # Navigation and branding
│   ├── product/          # Product-related components
│   └── ui/               # Base UI components
├── contexts/             # React Context providers
│   ├── CartContext.tsx   # Shopping cart state
│   └── ProductContext.tsx # Product selection state
├── lib/                  # Utilities and configurations
│   ├── shopify/          # Shopify API integration
│   └── utils.ts          # Helper functions
└── actions/              # Server Actions for mutations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Shopify store with Storefront API access

### Environment Variables

Create a `.env.local` file with your Shopify credentials:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_REVALIDATION_SECRET=your-revalidation-secret
SITE_NAME=Your Store Name
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/francomay3/naturalneits-commerce.git
   cd naturalneits-commerce
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Shopify credentials
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
pnpm prettier     # Format code with Prettier
pnpm test         # Run tests (currently prettier check)
```

## 🛠️ Development

### Project Structure

#### Pages & Routing

- **Homepage** (`app/page.tsx`): Product catalog with grid layout
- **Product Pages** (`app/product/[handle]/page.tsx`): Dynamic product detail pages
- **Static Pages**: About, Contact pages

#### Components

- **AppShellWrapper**: Main layout with header, navbar, and cart sidebar
- **ProductCard**: Individual product display with add-to-cart functionality
- **ImageCarousel**: Product image gallery with zoom and modal view
- **Cart Components**: Shopping cart with item management
- **VariantSelector**: Product option selection (size, color, etc.)

#### State Management

- **CartContext**: Manages shopping cart state with optimistic updates
- **ProductContext**: Handles product variant selection and URL state
- **Server Actions**: Handle cart mutations and checkout redirects

### Key Features Implementation

#### Shopping Cart

- Persistent cart using Shopify's cart API
- Optimistic updates for instant UI feedback
- Real-time quantity management
- Checkout integration with Shopify

#### Product Management

- Dynamic product pages with SEO optimization
- Image carousels with zoom functionality
- Variant selection with URL state management
- Related products recommendations

#### Performance Optimizations

- Server-side rendering for fast initial loads
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Turbopack for faster development builds

## 🎨 Customization

### Theming

The app uses CSS custom properties for theming. Key variables:

```css
--brand-color: #your-brand-color;
--secondary-color: #your-secondary-color;
--background-color: #your-background-color;
--border-radius: 8px;
```

### Styling

- **Mantine**: Primary UI component library
- ** Components**: Custom styling with SSR support
- **CSS Variables**: Consistent theming across components

### Adding New Features

1. Create components in `components/` directory
2. Add pages in `app/` directory (App Router)
3. Update types in `lib/shopify/types.ts`
4. Add GraphQL queries in `lib/shopify/queries/`

## 📦 Dependencies

### Core Dependencies

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with new features
- **Mantine v8**: UI component library
- **Shopify Storefront API**: Ecommerce backend

### Development Dependencies

- **TypeScript 5.8**: Type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Turbopack**: Fast development builds

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [license.md](license.md) file for details.

## 👨‍💻 Developer

**Franco May** - Full Stack Developer

- [LinkedIn](https://www.linkedin.com/in/francomay/)
- [GitHub](https://github.com/francomay3/)

## 🙏 Acknowledgments

- Built with [Next.js Commerce](https://github.com/vercel/commerce) template
- UI components from [Mantine](https://mantine.dev/)
- Ecommerce powered by [Shopify](https://shopify.com/)
- Icons from [Tabler Icons](https://tabler-icons.io/)

---

Made with ❤️ by Franco May
