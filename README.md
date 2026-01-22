# Web Buddies - Professional Web Development Agency

A fully dynamic, modern, and SEO-optimized portfolio website for a digital agency. Built with Next.js, MongoDB, and modern web technologies.

## 🚀 Features

### Frontend
- **Modern Design**: Clean, professional UI with dark/light mode
- **Fully Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Meta tags, structured data, sitemap, robots.txt
- **Performance**: 90+ Lighthouse scores, optimized images, lazy loading
- **Animations**: Smooth Framer Motion animations
- **Accessibility**: WCAG compliant, keyboard navigation

### Backend & Database
- **Dynamic Content**: All content managed through MongoDB
- **Admin Panel**: Secure admin dashboard for content management
- **Contact System**: Lead capture with email notifications
- **Authentication**: JWT-based admin authentication
- **API Routes**: RESTful API for all operations

### SEO & Analytics
- **Google Analytics**: GA4 integration
- **Google Search Console**: Verification and sitemap
- **Structured Data**: Schema.org markup for better search results
- **Meta Tags**: Dynamic meta tags for all pages
- **Open Graph**: Social media sharing optimization

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Email**: Nodemailer
- **Deployment**: Vercel (recommended)
- **Image Optimization**: Cloudinary

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-buddies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.local` and update the values:
   ```bash
   cp .env.local .env.local
   ```

   Required environment variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/webbuddies
   MONGODB_DB=webbuddies
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key
   ADMIN_EMAIL=admin@webbuddies.com
   ADMIN_PASSWORD=Admin@123
   
   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   
   # Google Analytics
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://webbuddies.com
   NEXT_PUBLIC_SITE_NAME=Web Buddies
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Initialize the database**
   ```bash
   npm run init-db
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin/login

## 🔐 Admin Access

Default admin credentials:
- **Email**: admin@webbuddies.com
- **Password**: Admin@123

## 📁 Project Structure

```
web-buddies/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── projects/          # Projects pages
│   └── ...
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── navbar.tsx        # Navigation
│   └── footer.tsx        # Footer
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication
│   ├── db-schemas.ts     # Database schemas
│   ├── db-utils.ts       # Database utilities
│   ├── email.ts          # Email service
│   └── seo.ts            # SEO utilities
└── public/               # Static assets
```

## 🎯 Key Features

### Dynamic Content Management
- Projects portfolio with categories and filtering
- Services with detailed descriptions
- Contact form with lead management
- SEO settings for all pages

### Admin Dashboard
- Secure authentication
- Project management (CRUD operations)
- Service management
- Contact/lead management
- User management
- SEO settings

### SEO Optimization
- Dynamic meta tags
- Structured data (Schema.org)
- XML sitemap generation
- Robots.txt
- Open Graph tags
- Twitter cards
- Google Analytics integration

### Performance
- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting
- Lazy loading
- Caching strategies

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

The application can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Heroku

## 📊 SEO Setup

1. **Google Analytics**
   - Create GA4 property
   - Add tracking ID to `NEXT_PUBLIC_GA_ID`

2. **Google Search Console**
   - Verify domain ownership
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

3. **Social Media**
   - Update Open Graph images
   - Test with Facebook Debugger
   - Test with Twitter Card Validator

## 🔧 Customization

### Branding
- Update company info in `lib/init-db.ts`
- Replace logo and favicon in `public/`
- Modify colors in `tailwind.config.js`

### Content
- Add/edit projects through admin panel
- Update services through admin panel
- Modify static content in page components

### Styling
- Customize Tailwind CSS configuration
- Modify component styles
- Add custom CSS if needed

## 📝 Content Management

### Adding Projects
1. Login to admin panel
2. Navigate to Projects
3. Click "Add Project"
4. Fill in details, upload images
5. Set SEO metadata
6. Publish

### Managing Services
1. Access Services in admin panel
2. Add/edit service details
3. Set pricing and features
4. Update SEO settings

### Handling Contacts
1. View all inquiries in Contacts
2. Update status (new, contacted, etc.)
3. Email notifications sent automatically
4. Export data if needed

## 🔒 Security

- JWT authentication for admin access
- Password hashing with bcryptjs
- Input validation with Zod
- CSRF protection
- Rate limiting (recommended for production)
- Environment variable protection

## 📈 Analytics & Monitoring

- Google Analytics 4 integration
- Contact form conversion tracking
- Performance monitoring
- Error tracking (add Sentry for production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: hello@webbuddies.com
- Documentation: Check the code comments
- Issues: Create a GitHub issue

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- All the open-source contributors

---

**Built with ❤️ by Web Buddies**