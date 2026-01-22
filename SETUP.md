# Web Buddies - Quick Setup Guide

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up MongoDB**
   - Install MongoDB locally OR use MongoDB Atlas
   - Update `MONGODB_URI` in `.env.local`

3. **Initialize database**
   ```bash
   npm run init-db
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/admin/login
   - Credentials: admin@webbuddies.com / Admin@123

## 🔧 Environment Variables

Update `.env.local` with your values:

```env
# Database (Required)
MONGODB_URI=mongodb://localhost:27017/webbuddies
MONGODB_DB=webbuddies

# Authentication (Required)
JWT_SECRET=your-super-secret-jwt-key-web-buddies-2024
ADMIN_EMAIL=admin@webbuddies.com
ADMIN_PASSWORD=Admin@123

# Email (Optional - for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
GOOGLE_SITE_VERIFICATION=your-verification-code

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Web Buddies

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📱 Features Available

### Frontend
- ✅ Modern responsive design
- ✅ Dark/Light mode toggle
- ✅ SEO optimized pages
- ✅ Contact form
- ✅ Projects showcase
- ✅ Services pages

### Admin Panel
- ✅ Secure login
- ✅ Dashboard overview
- ✅ Project management (CRUD)
- ✅ Contact management
- ✅ User management

### API Endpoints
- ✅ `/api/auth/*` - Authentication
- ✅ `/api/contact` - Contact form
- ✅ `/api/projects` - Projects CRUD
- ✅ `/api/services` - Services CRUD

## 🎯 Next Steps

1. **Customize branding**
   - Update company info in admin panel
   - Replace logo/favicon in `public/`
   - Modify colors in CSS

2. **Add content**
   - Add real projects via admin panel
   - Update services information
   - Add team photos and bios

3. **Configure email**
   - Set up SMTP credentials
   - Test contact form

4. **Set up analytics**
   - Create Google Analytics account
   - Add tracking ID to environment

5. **Deploy**
   - Deploy to Vercel/Netlify
   - Set up production database
   - Configure domain

## 🔍 Troubleshooting

**Database connection issues:**
- Check MongoDB is running
- Verify connection string
- Check network access (for Atlas)

**Admin login not working:**
- Run `npm run init-db` again
- Check JWT_SECRET is set
- Clear browser cookies

**Contact form not sending emails:**
- Verify SMTP credentials
- Check spam folder
- Enable "Less secure apps" for Gmail

## 📞 Support

Need help? Check the main README.md or create an issue in the repository.

---

**Happy coding! 🚀**