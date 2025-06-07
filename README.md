# Summary Automates - Premium Masterclass Platform

A luxury, tech-driven educational platform offering elite masterclasses for young entrepreneurs aged 16-25, featuring immersive learning experiences and cutting-edge mentorship opportunities.

## 🚀 Quick Start

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the Netlify dev server which includes both the frontend and serverless functions.

3. After building, start the production server locally:
   ```bash
   npm run start
   ```

### Deployment

1. Connect your repository to Netlify
2. Configure the following build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x

### Environment Variables

No environment variables are required for basic functionality.

## 🌟 Features

### Premium Learning Experience
- **Elite Access (R249)**: 3-hour transformation intensive with personalized blueprint
- **Legacy Tier (R1000)**: Ultimate dominance package with private 1-on-1 consultation
- Exclusive platinum resource vault and VIP mentorship sessions
- AI-powered business domination tactics

### Universal Payment Gateway
- **Dual Payment Options**: Card payment and bank transfer support
- **Multi-Plan Support**: Seamless switching between Elite and Legacy tiers
- **Secure Processing**: Industry-standard encryption and security measures
- **Instant WhatsApp Integration**: Automatic enrollment confirmation

### Mobile-First Design
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Fast Loading**: Performance-optimized with reduced animations on mobile
- **Touch-Friendly**: Intuitive interface designed for touch interactions
- **Accessible**: Clear typography and proper contrast ratios

### Real-Time Features
- **Live Countdown**: Real-time timer to masterclass start (June 15, 2025 at 2 PM GMT)
- **Dynamic Animations**: Smooth, luxury animations with Framer Motion
- **Interactive Elements**: Hover effects and micro-interactions

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Wouter** for client-side routing
- **TanStack Query** for state management
- **React Hook Form** with Zod validation

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Passport.js** for authentication
- **Express Session** for session management

### UI Components
- **Radix UI** primitives
- **Shadcn/ui** component library
- **Lucide React** for icons
- **Custom luxury components**

## 📱 Contact & Support

### WhatsApp Support
- **Primary**: +27 68 483 9679
- **Additional Support**: +91 9373395733

### Email Support
- **General Inquiries**: summaryautomations@gmail.com

## 🗓 Masterclass Schedule

**Date**: June 15, 2025  
**Time**: 2:00 PM GMT  
**Duration**: 3 hours (Elite) / Extended (Legacy)  
**Location**: Virtual Platform  

## 💳 Payment Information

### Elite Access - R249
- 3-hour elite transformation intensive
- Personalized empire-building blueprint
- Luxury landing page mastery workshop
- AI-powered business domination tactics
- Exclusive platinum resource vault
- VIP follow-up mentorship session

### Legacy Tier - R1000
- Private 1-on-1 empire consultation
- Bespoke business architecture design
- Exclusive titan networking sanctuary
- Priority access to future masterminds
- Lifetime premium mentorship portal
- Custom success acceleration program

### Payment Methods
1. **Card Payment**: Instant processing with secure encryption
2. **Bank Transfer**: Direct transfer to Summary Automates (Pty) Ltd
   - Bank: Standard Bank
   - Branch Code: 051001
   - Swift Code: SBZAZAJJ

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd summary-automates
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Database
   DATABASE_URL=your_postgresql_url
   
   # Session
   SESSION_SECRET=your_session_secret
   ```

4. **Initialize database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## 📂 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── App.tsx         # Main application component
├── server/                 # Express backend
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema definitions
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run the production server
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio
- `npm run type-check` - Run TypeScript type checking

## 🌟 Key Features

### Authentication & Security
- Session-based authentication with Passport.js
- Secure password hashing with bcrypt
- CSRF protection and secure headers
- Input validation with Zod schemas

### Database Operations
- Type-safe queries with Drizzle ORM
- Automatic migrations with schema changes
- Connection pooling for performance
- Proper error handling and logging

### User Experience
- Smooth page transitions
- Loading states for all async operations
- Toast notifications for user feedback
- Responsive design for all screen sizes

### Performance Optimizations
- Code splitting with dynamic imports
- Optimized images and assets
- Minimized bundle size
- Fast loading animations

## 🚀 Deployment

The application is ready for deployment on Replit with automatic:
- SSL certificate management
- Domain configuration
- Health checks and monitoring
- Automatic scaling

### Environment Variables for Production
```bash
NODE_ENV=production
DATABASE_URL=your_production_database_url
SESSION_SECRET=your_secure_session_secret
```

## 📈 Analytics & Monitoring

### Performance Metrics
- Real-time user engagement tracking
- Payment conversion analytics
- Mobile vs desktop usage statistics
- Geographic user distribution

### Error Tracking
- Comprehensive error logging
- Real-time error notifications
- Performance monitoring
- Uptime tracking

## 🔒 Security Features

- **Data Encryption**: All sensitive data encrypted in transit and at rest
- **Input Sanitization**: XSS and injection attack prevention
- **Rate Limiting**: API endpoint protection
- **Secure Sessions**: HTTP-only cookies with CSRF protection

## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Business Information

**Company**: Summary Automates (Pty) Ltd  
**Registration**: South African Private Company  
**Business Focus**: Entrepreneurship education and mentorship  
**Target Audience**: Young entrepreneurs aged 16-25  

## 📋 Terms & Conditions

- All sales final after WhatsApp confirmation
- Masterclass access provided within 30 minutes of payment verification
- Full refund available if masterclass doesn't meet expectations
- Terms and conditions apply to all transactions

## 🎯 Future Enhancements

### Planned Features
- Advanced analytics dashboard
- Multi-language support
- Mobile app development
- Integration with learning management systems
- Advanced mentorship matching algorithms

### Technology Roadmap
- Progressive Web App (PWA) capabilities
- Real-time chat functionality
- Video conferencing integration
- AI-powered personalization
- Blockchain-based certificates

---

**© 2025 Summary Automates T&C apply. All rights reserved.**

For technical support or business inquiries, contact us via WhatsApp or email.