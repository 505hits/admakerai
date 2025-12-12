# AdMaker AI

A modern AI-powered platform for creating UGC (User-Generated Content) videos with AI actors and automated video generation.

## 🚀 Features

- **AI Video Generation**: Create professional UGC videos using AI actors
- **Script Editor**: Write or generate scripts with AI assistance
- **Actor Management**: Create and manage custom AI actors with reference photos
- **Multiple Video Durations**: Choose from 30s, 60s, or 90s video lengths
- **Credit System**: Flexible pricing based on video duration
- **User Dashboard**: Manage your videos, actors, and account
- **Authentication**: Secure login and signup system
- **Payment Integration**: Integrated payment system for credits

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **UI Components**: React
- **Deployment**: Vercel-ready

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/505hits/admakerai.git
cd admakerai
```

2. Navigate to the Next.js app:
```bash
cd admaker
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
admakerai/
├── admaker/              # Next.js application
│   ├── app/             # App router pages
│   │   ├── dashboard/   # Dashboard page
│   │   ├── login/       # Authentication pages
│   │   ├── payment/     # Payment page
│   │   └── profile/     # User profile
│   ├── components/      # React components
│   └── public/          # Static assets
├── index.html           # Landing page
├── styles.css           # Landing page styles
└── script.js            # Landing page scripts
```

## 🚀 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com):

```bash
npm run build
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features Overview

### Dashboard
- Script editor with AI assistance
- Actor selection by category
- Video duration options with credit costs
- Modern, dark-themed UI

### Actor Management
- Create custom AI actors
- Upload reference photos
- Define actor characteristics and actions
- Manage actor library

### Payment System
- Credit-based pricing
- Secure payment processing
- Flexible credit packages

## 📄 License

All rights reserved.

## 👤 Author

505hits

---

Built with ❤️ using Next.js and AI
