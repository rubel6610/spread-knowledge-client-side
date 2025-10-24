# Spread Knowledge - Client Side

[![Live Site](https://img.shields.io/badge/Live-Site-brightgreen)](https://knowledge-spread.netlify.app)
[![Server Side](https://img.shields.io/badge/Server-Repository-blue)](https://github.com/rubel6610/spread-knowledge-server-side)


## 📝 Project Overview

**Spread Knowledge** is a modern, feature-rich knowledge-sharing platform where users can create, explore, and manage articles across various categories. Built with React and powered by Firebase authentication, it offers a seamless experience for content creators and readers alike.

---

## 🔗 Important Links

- **Live Website**: [https://knowledge-spread.netlify.app](https://knowledge-spread.netlify.app)
- **Client Repository**: [https://github.com/rubel6610/spread-knowledge-client-side](https://github.com/rubel6610/spread-knowledge-client-side)
- **Server Repository**: [https://github.com/rubel6610/spread-knowledge-server-side](https://github.com/rubel6610/spread-knowledge-server-side)
- **Server URL**: [https://spread-knowledge-server.vercel.app](https://spread-knowledge-server.vercel.app)

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Firebase Authentication** - Email/Password and Google Sign-In
- **JWT Token System** - Secure API communication with automatic token refresh
- **Protected Routes** - Private routes for authenticated users only
- **Persistent Sessions** - Auto-login with localStorage

### 📝 Article Management
- **Create Articles** - Rich text editor with category and tag support
- **Edit & Delete** - Full CRUD operations for your own articles
- **Like System** - Express appreciation for quality content
- **Comment System** - Engage in discussions on articles
- **Category Filtering** - Browse by Technology, Education, Health, Business
- **Advanced Search** - Search by title, author, or content

### 💬 Real-time Chat
- **Socket.IO Integration** - Live messaging between users
- **Online Status** - See who's currently online
- **Typing Indicators** - Know when someone is composing a message
- **Conversation History** - Access past chat messages
- **Email Search** - Find and chat with any registered user

### 📊 Analytics Dashboard
- **Personal Analytics** - Track your article performance
- **Article Stats** - View total articles, likes, and comments
- **Category Distribution** - Visualize your content across categories
- **Recent Articles** - Quick access to your latest posts
- **Interactive Charts** - Pie charts and bar graphs powered by Recharts

### 🎨 UI/UX Excellence
- **Theme Toggle** - Seamless light/dark mode with persistence
- **Responsive Design** - Perfect on mobile, tablet, and desktop (sm, md, lg, xl)
- **Beautiful Animations** - Smooth transitions and hover effects
- **Card Layouts** - Consistent 4-column grid on large screens
- **NoDataFound Component** - Elegant empty states throughout the app
- **SweetAlert2 Notifications** - User-friendly feedback popups

### 🎯 Community Features
- **Top Contributors** - Leaderboard of most active writers
- **Editor's Choice** - Curated selection of quality articles
- **Platform Statistics** - Live stats showing total articles, users, and engagement
- **Featured Articles** - Highlighted content on the homepage

---

## 🛠️ Technologies Used

### Core Technologies
- **React 19.1.0** - Modern UI library
- **Vite 6.3.5** - Lightning-fast build tool
- **React Router 7.6.2** - Client-side routing

### Styling
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **DaisyUI 5.0.43** - Tailwind component library
- **React Icons 5.5.0** - Icon library

### State & Data Management
- **Axios 1.10.0** - HTTP client with interceptors
- **React Context API** - Global state management

### Authentication
- **Firebase 11.9.1** - Authentication provider
- **JWT Tokens** - Secure API authorization

### Real-time Features
- **Socket.IO Client 4.8.1** - WebSocket communication

### UI Enhancements
- **SweetAlert2 11.22.0** - Beautiful alert popups
- **React Toastify 11.0.5** - Toast notifications
- **Recharts 3.3.0** - Data visualization
- **React Responsive Carousel 3.2.23** - Image carousel
- **React Modal 3.16.3** - Modal dialogs

---

## 📦 NPM Packages

```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.10",
    "@tailwindcss/vite": "^4.1.10",
    "axios": "^1.10.0",
    "daisyui": "^5.0.43",
    "firebase": "^11.9.1",
    "postcss": "^8.5.6",
    "postcss-cli": "^11.0.1",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0",
    "react-modal": "^3.16.3",
    "react-responsive-carousel": "^3.2.23",
    "react-router": "^7.6.2",
    "react-toastify": "^11.0.5",
    "recharts": "^3.3.0",
    "socket.io-client": "^4.8.1",
    "sweetalert2": "^11.22.0",
    "tailwindcss": "^4.1.10"
  }
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project credentials

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/rubel6610/spread-knowledge-client-side.git
cd spread-knowledge-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env.local` file in the root directory:
```env
VITE_BASEURL=your_server_url
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id
```

4. **Run the development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

5. **Build for production**
```bash
npm run build
```

---

## 🗺️ Routing Structure

### Public Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with featured content |
| `/all-articles` | AllArticles | Browse all articles with search & filter |
| `/all-articles/:id` | ArticleDetails | View individual article with comments |
| `/category/:category` | Category | Articles filtered by category |
| `/about` | AboutUs | About the platform |
| `/login` | Login | User login page |
| `/register` | Register | User registration page |
| `*` | NotFound | Custom 404 page |

### Protected Routes (Require Authentication)
| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard` | UserDashboard | User dashboard with tabs |
| `/profile` | Profile | User profile management |
| `/my-articles` | MyArticles | Manage your articles |
| `/post-article` | PostArticle | Create new article |

### Dashboard Tabs
- **Analytics** - View your stats and charts
- **My Articles** - Manage your content
- **Post Article** - Create new articles
- **Chat** - Real-time messaging

---

## 📝 Project Structure

```
src/
├── api/
│   └── Myarticleapi.jsx          # Article API functions
├── Components/
│   ├── Analytics.jsx             # Analytics dashboard
│   ├── Banner.jsx                # Hero carousel
│   ├── Categories.jsx            # Category grid
│   ├── Chat.jsx                  # Real-time chat
│   ├── EditorChoice.jsx          # Editor picks
│   ├── FeaturedArticles.jsx      # Featured articles grid
│   ├── Features.jsx              # Platform features
│   ├── Footer.jsx                # Footer component
│   ├── Login.jsx                 # Login form
│   ├── Navbar.jsx                # Navigation bar
│   ├── Newsletter.jsx            # Newsletter signup
│   ├── NoDataFound.jsx           # Empty state component
│   ├── NotFound.jsx              # 404 page
│   ├── Register.jsx              # Registration form
│   ├── Stats.jsx                 # Platform statistics
│   ├── Testimonials.jsx          # User testimonials
│   └── TopContributors.jsx       # Leaderboard
├── Firebase/
│   └── Firebase.config.js        # Firebase configuration
├── Hooks/
│   ├── useAuth.jsx               # Authentication hook
│   ├── UseAxiosSecure.jsx        # Axios with JWT
│   └── useSocket.jsx             # Socket.IO hook
├── MainLayout/
│   └── Root.jsx                  # Root layout
├── Pages/
│   ├── AboutUs.jsx               # About page
│   ├── AllArticles.jsx           # Articles listing
│   ├── ArticleDetails.jsx        # Article view
│   ├── Category.jsx              # Category page
│   ├── Home.jsx                  # Homepage
│   ├── MyArticles.jsx            # User's articles
│   ├── PostArticle.jsx           # Create article
│   ├── Profile.jsx               # User profile
│   └── UserDashboard.jsx         # Dashboard
├── Provider/
│   ├── AuthProvider.jsx          # Auth context
│   └── SocketProvider.jsx        # Socket context
├── Router/
│   ├── PrivateRoutes.jsx         # Route protection
│   └── Routes.jsx                # Route definitions
├── index.css                    # Global styles
└── main.jsx                     # App entry point
```

---

## 🌈 Design Highlights

### Responsive Breakpoints
- **sm**: 640px - Mobile landscape
- **md**: 768px - Tablets
- **lg**: 1024px - Desktop
- **xl**: 1280px - Large desktop (4-column grid)

### Card Design
- **Fixed Height**: All cards maintain consistent 420px height
- **Image**: 192px (h-48) fixed height with object-cover
- **Title**: 2-line clamp for consistency
- **Description**: 1-line clamp on landing page cards
- **Hover Effects**: Scale, shadow, and translate animations

### Theme System
- Automatic localStorage persistence
- Smooth transitions between themes
- DaisyUI theme variables
- Custom dark mode optimization

---

## 🔒 Security Features

- **JWT Token Management** - Automatic token refresh and storage
- **Axios Interceptors** - Automatic token injection in requests
- **Protected Routes** - Client-side route guards
- **Email Verification** - Ensures users only access their data
- **Secure Environment Variables** - Sensitive data hidden from client

---

## 🌐 Deployment

The application is deployed on **Netlify** with continuous deployment from the main branch.

### Build Settings
```bash
Build Command: npm run build
Publish Directory: dist
```

### Environment Variables
Set all `VITE_*` variables in Netlify dashboard under Site Settings > Environment Variables.

---

## 👨‍💻 Author

**Rubel Hossain**
- GitHub: [@rubel6610](https://github.com/rubel6610)
- LinkedIn: [rubelhosen13](https://linkedin.com/in/rubelhosen13)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🚀 Future Enhancements

- [ ] Article bookmarking
- [ ] Push notifications
- [ ] Rich text editor (Quill/TinyMCE)
- [ ] Article drafts
- [ ] Social sharing
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)

---

## 👏 Acknowledgments

- **Tailwind CSS** for the amazing utility-first framework
- **DaisyUI** for beautiful pre-built components
- **Firebase** for seamless authentication
- **React Team** for the incredible library
- **Vercel & Netlify** for free hosting

---

**Built with ❤️ by Rubel Hossain**

**Happy Coding! 🚀**
