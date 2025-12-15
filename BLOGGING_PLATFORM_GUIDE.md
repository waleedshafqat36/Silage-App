# KM Silage - Modern Blogging Platform with Admin Dashboard

## 🎯 Overview

This is a fully functional blogging platform built with Next.js, MongoDB, and NextAuth.js featuring:
- **Role-based authentication** (Admin & User)
- **Admin Dashboard** with comprehensive management tools
- **Blog Management** - Create, edit, publish, and delete blogs
- **User Management** - Manage user roles and permissions
- **Modern, Responsive UI** - Professional design with smooth animations
- **Real-time Statistics** - Dashboard with live metrics

---

## ✨ Features

### User Features
- ✅ User registration and login
- ✅ Browse published blogs
- ✅ Search blogs by title, author, or content
- ✅ View full blog articles with proper formatting
- ✅ Session persistence (30-day JWT tokens)
- ✅ Responsive design for all devices

### Admin Features
- ✅ **Dashboard Home** - Real-time statistics and metrics
- ✅ **Blog Management**
  - Create new blogs with title, content, excerpt, thumbnail
  - Edit existing blogs
  - Delete blogs permanently
  - Publish/Unpublish blogs
  - View blog statistics (views, creation date, author)
- ✅ **User Management**
  - View all registered users
  - Promote users to admin
  - Demote admins to regular users
  - Search and filter users
- ✅ Stats & Analytics page
- ✅ Sidebar navigation with role-based menu

### Navbar Behavior
- **For Regular Users**: Shows "Blogs" button (view published blogs)
- **For Admin Users**: Shows "Dashboard" button (access admin panel) + "Blogs" button
- **For All**: Logout functionality

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free cluster)
- npm or yarn package manager

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local` in the root directory with your MongoDB credentials:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bloggingDB?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-min-32-chars-change-for-production
NEXTAUTH_URL=http://localhost:3000
```

**To get your MONGO_URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string and replace `<username>`, `<password>`, and database name

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 📝 Creating Your First Admin Account

### Option 1: Sign Up as Regular User, Then Promote

1. Sign up at `http://localhost:3000/auth/signup` with your details
2. Open MongoDB Atlas and navigate to your `users` collection
3. Find your user document and change `role: "user"` to `role: "admin"`
4. Logout and login again - you'll see the Dashboard button

### Option 2: Insert Admin Directly via MongoDB

In MongoDB Atlas Console:
```javascript
db.users.insertOne({
  email: "admin@example.com",
  password: "$2a$12$[bcrypt_hash_here]",
  name: "Admin User",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

For bcrypt hash, use an online tool or generate via Node.js:
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your_password', 12);
```

---

## 🎨 Project Structure

```
Silage-App/
├── app/
│   ├── api/                          # API Routes
│   │   ├── auth/                     # Authentication endpoints
│   │   ├── blogs/                    # Blog management APIs
│   │   │   ├── route.ts             # Get published blogs
│   │   │   ├── create/route.ts      # Create blog
│   │   │   └── [id]/route.ts        # Get, update, delete blog
│   │   └── admin/
│   │       ├── blogs/route.ts       # Get all blogs (admin only)
│   │       └── users/               # User management endpoints
│   ├── admin/                        # Admin dashboard pages
│   │   ├── page.tsx                 # Dashboard home
│   │   ├── blogs/                   # Blog management
│   │   ├── users/                   # User management
│   │   └── stats/                   # Statistics
│   ├── auth/                         # Auth pages
│   │   ├── login/
│   │   └── signup/
│   ├── blogs/                        # Public blog listing
│   ├── blog/[id]/                    # Single blog view
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
│
├── components/
│   ├── Admin/                        # Admin components
│   │   ├── AdminLayout.tsx          # Admin sidebar layout
│   │   ├── DashboardHome.tsx        # Dashboard stats
│   │   ├── ManageBlogs.tsx          # Blog management UI
│   │   ├── ManageUsers.tsx          # User management UI
│   │   └── StatsSection.tsx         # Stats component
│   ├── Auth/                         # Authentication components
│   ├── Navbar/                       # Navigation bar
│   ├── Landing/                      # Landing page sections
│   └── Toast/                        # Toast notifications
│
├── lib/
│   ├── authOptions.ts               # NextAuth configuration
│   ├── mongodb.js                   # MongoDB connection pooling
│   └── mongodbClient.ts
│
├── models/
│   ├── user.ts                      # User schema (email, password, role)
│   └── blog.ts                      # Blog schema
│
└── utils/
    └── toast.ts                     # Toast utility
```

---

## 🔑 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: string (unique, lowercase),
  password: string (bcrypt hashed),
  name: string,
  role: "admin" | "user",
  createdAt: Date,
  updatedAt: Date
}
```

### Blogs Collection
```javascript
{
  _id: ObjectId,
  title: string (required),
  content: string (required),
  excerpt: string,
  thumbnail: string (URL),
  author: string,
  authorId: ObjectId,
  status: "published" | "draft",
  views: number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/callback/credentials` - Login
- `GET /api/auth/session` - Get current session

### Blogs (Public)
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/[id]` - Get single blog (increments views)

### Blogs (Admin Only)
- `GET /api/admin/blogs` - Get all blogs (draft + published)
- `POST /api/blogs/create` - Create new blog
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

### Users (Admin Only)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/[id]` - Update user role

---

## 🎯 User Flows

### Regular User Flow
1. Sign up at `/auth/signup`
2. Login at `/auth/login`
3. Click "Blogs" button in navbar
4. Browse published blogs
5. Click blog to read full article
6. Logout from navbar

### Admin User Flow
1. Create account and promote to admin (see above)
2. Login at `/auth/login`
3. Click "Dashboard" button in navbar
4. **Dashboard Home**: View statistics
5. **Manage Blogs**:
   - View all blogs (published & draft)
   - Create new blog
   - Edit existing blog
   - Delete blog
   - Publish/Unpublish blog
6. **Manage Users**:
   - View all users
   - Promote user to admin
   - Demote admin to user
7. **Stats & Analytics**: View detailed metrics
8. Logout from sidebar

---

## 🔐 Authentication & Security

### Password Security
- Passwords are hashed using **bcryptjs** (12-round salt)
- Passwords are never stored in plain text
- Passwords are never sent to frontend

### Session Management
- Uses **JWT (JSON Web Tokens)** for sessions
- 30-day session expiration
- Secure httpOnly cookies (in production)
- Automatic session refresh

### Role-Based Access Control
- Admin endpoints check user role before allowing operations
- Regular users cannot access admin APIs
- Navbar dynamically shows/hides admin buttons

### Protected Routes
- `/admin/*` requires admin authentication
- `/blogs` requires user authentication
- `/auth/login` and `/auth/signup` redirect to home if logged in

---

## 🎨 Styling & Design

### Technologies Used
- **Tailwind CSS** - Utility-first CSS framework
- **Gradients & Animations** - Smooth transitions
- **Responsive Design** - Mobile-first approach
- **Cards & Modals** - Modern component patterns

### Color Scheme
- **Primary**: Blue/Purple gradient (#0066CC - #7C3AED)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Warning**: Amber (#F59E0B)

### Components
- Navigation bars with responsive menus
- Data tables with sorting/filtering
- Blog cards with images and previews
- Form inputs with validation
- Toast notifications
- Loading spinners
- Confirmation dialogs

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect GitHub repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel Dashboard:
   - `MONGO_URI`
   - `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (your production URL)
4. Deploy!

### Deploy to Other Platforms

Works with any Node.js hosting (Heroku, Railway, AWS, etc.)

Remember to:
- Set `NODE_ENV=production`
- Use strong `NEXTAUTH_SECRET`
- Set correct `NEXTAUTH_URL`
- Use production MongoDB credentials

---

## 📋 Sample Data

To test with sample data, insert into MongoDB:

```javascript
// Sample blog
db.blogs.insertOne({
  title: "Getting Started with Modern Farming",
  content: "This is a comprehensive guide to modern farming techniques...",
  excerpt: "Learn the fundamentals of modern agricultural practices",
  author: "Admin User",
  authorId: ObjectId("admin_id_here"),
  status: "published",
  views: 0,
  createdAt: new Date(),
  updatedAt: new Date()
})

// Sample user
db.users.insertOne({
  email: "user@example.com",
  password: "$2a$12$[bcrypt_hash]",
  name: "Test User",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## 🐛 Troubleshooting

### "ECONNREFUSED 127.0.0.1:27017"
- MongoDB is not running
- Check MONGO_URI in .env.local
- If using Atlas, ensure IP is whitelisted

### "Authentication failed"
- Wrong MongoDB password
- Email doesn't exist
- User role not set correctly

### "Cannot POST /api/blogs/create"
- Not logged in
- User is not admin
- Check request headers

### Session not persisting
- NEXTAUTH_SECRET not set
- Session cookie issue in browser
- Check browser DevTools → Application → Cookies

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [MongoDB Atlas Guide](https://www.mongodb.com/docs/atlas/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API endpoint documentation
3. Check MongoDB connection in Atlas
4. Review environment variables in .env.local

---

## 📄 License

This project is provided as-is for educational and commercial use.

---

**Last Updated**: December 2024
**Version**: 1.0.0
