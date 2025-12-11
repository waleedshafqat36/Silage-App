# KM Silage Admin Dashboard 🌾

A modern, professional admin dashboard built with Next.js, React, and TailwindCSS for managing the KM Silage blogging platform.

## 📋 Features

### 1. **Dashboard Home**

- 📊 **Quick Statistics Cards**: Display key metrics including:
  - Total Blogs
  - Total Users
  - Active Users
  - Total Comments
- 📈 **Trend Indicators**: Shows percentage changes from previous period
- 📝 **Recent Blogs Section**: Quick view of latest blog posts
- 👥 **Recent Users Section**: Display newly registered users
- 🔧 **System Health Status**: Server, database, and API status monitoring
- ⚡ **Performance Metrics**: CPU, Memory, and Disk usage bars

### 2. **Manage Blogs Section**

- **Blog Table** with columns:
  - Blog Title
  - Author Name
  - Creation Date
  - Publication Status (Published/Draft)
  - View Count
  - Action Buttons
- **Features**:
  - ✏️ **Create New Blog**: Modal form to add new blog posts
  - 🔍 **Search**: Search blogs by title or author
  - 🏷️ **Filter**: Filter by status (All/Published/Draft)
  - 📢 **Publish**: Convert draft blogs to published
  - ✏️ **Edit**: Modify existing blog posts
  - 🗑️ **Delete**: Remove blogs with confirmation dialog
  - ✅ **Toast Notifications**: Success/error feedback for all actions

### 3. **Manage Users Section**

- **User Table** with columns:

  - User Name
  - Email Address
  - User Role (User/Admin)
  - Registration Date
  - Account Status (Active/Inactive)
  - Action Buttons

- **Features**:
  - 🔍 **Search**: Find users by name or email
  - 🏷️ **Filter**: Filter by role (All/User/Admin)
  - 👑 **Promote**: Upgrade users to admin roles
  - 💫 **Demote**: Downgrade admins to regular users
  - ✏️ **Edit**: Modify user information
  - 🗑️ **Delete**: Remove user accounts with confirmation
  - 🔒 **Confirmation Dialogs**: Prevent accidental changes

### 4. **Stats & Analytics Section**

- **Multiple Chart Views**:
  - 📝 Blogs Created (horizontal bars)
  - 👥 New Users (horizontal bars)
  - 💬 Comments (horizontal bars)
- **Combined Activity Chart**:
  - Interactive bar chart showing all metrics
  - Hover effects for detailed information
  - Time range selector (This Week/Month/Year)
- **Key Metrics**:
  - Average blogs per user
  - Average comments per blog
  - User growth rate
  - Blog activity rate
- **Top Performing Content**:
  - Highest viewed blogs
  - Most commented posts
  - Engagement statistics

### 5. **Navigation & Layout**

- **Collapsible Sidebar**:
  - KM Silage branding and logo
  - Navigation links with active state highlighting
  - Icon-based minimized view
  - Smooth collapse/expand animation
- **Top Bar**:
  - Current page title
  - Today's date
  - User profile section
  - Logout button with loading state

## 🎨 Design Features

- ✨ **Modern UI**: Clean, professional interface with cards and tables
- 🎯 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- 🌈 **Color Coding**:
  - Green/Emerald for positive actions
  - Blue for user-related items
  - Purple for admin/important actions
  - Orange/Red for warnings/deletions
- ⚡ **Smooth Animations**: Hover effects, transitions, and loading states
- 🎭 **Glassmorphism**: Modern card styling with subtle transparency effects
- 📊 **Data Visualization**: Interactive charts and progress bars
- ♿ **Accessible**: Semantic HTML and proper ARIA labels

## 🛠️ Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **State Management**: React Hooks (useState, useMemo)
- **Authentication**: NextAuth.js
- **Notifications**: Custom Toast Component
- **Database**: MongoDB (with mongoose)

## 📁 Directory Structure

```
components/Admin/
├── AdminLayout.tsx      # Main layout with sidebar and topbar
├── DashboardHome.tsx    # Dashboard statistics and overview
├── ManageBlogs.tsx      # Blog management section
├── ManageUsers.tsx      # User management section
└── StatsSection.tsx     # Analytics and charts

app/admin/
├── page.tsx             # Dashboard home page
├── blogs/
│   └── page.tsx         # Blogs management page
├── users/
│   └── page.tsx         # Users management page
└── stats/
    └── page.tsx         # Analytics page
```

## 🚀 Getting Started

### Access the Dashboard

```bash
# Navigate to admin dashboard
http://localhost:3000/admin

# Manage blogs
http://localhost:3000/admin/blogs

# Manage users
http://localhost:3000/admin/users

# View analytics
http://localhost:3000/admin/stats
```

### Navigation

- Click the **KM Silage** logo to collapse/expand sidebar
- Use the navigation menu to switch between sections
- Active section is highlighted in green gradient
- Click **Logout** to sign out (with confirmation)

## 📊 Dashboard Sections Explained

### Quick Statistics

- Shows real-time metrics with trend indicators
- Color-coded cards for easy scanning
- Hover effects reveal detailed information

### Blog Management

- Create new blogs with title, author, and content
- Search and filter blogs by various criteria
- Publish draft blogs with one click
- Delete with confirmation to prevent accidents
- Real-time toast notifications for all actions

### User Management

- Complete user directory with search functionality
- Role management (promote/demote users)
- Account status tracking
- Confirmation dialogs for critical actions

### Analytics

- Time-based filtering (week, month, year)
- Multiple chart types for different metrics
- Interactive bar charts with hover tooltips
- Performance metrics and top content analysis
- Growth rate calculations

## 💡 API Integration Points

The dashboard includes placeholder functions for backend integration:

- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog
- `GET /api/admin/users` - Fetch users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Fetch analytics data

## 🔒 Security Considerations

- Admin routes should be protected with authentication middleware
- Implement role-based access control (RBAC)
- Add permission checks before CRUD operations
- Validate all form inputs on backend
- Use CSRF tokens for state-changing operations
- Log all admin actions for audit trails

## 📱 Responsive Breakpoints

- **Mobile** (< 640px): Sidebar hidden by default, table scrollable
- **Tablet** (640px - 1024px): Sidebar collapsed, adjusted spacing
- **Desktop** (> 1024px): Full layout with expanded sidebar

## 🎯 Future Enhancements

- [ ] Dark mode toggle
- [ ] Advanced filtering and sorting
- [ ] Bulk actions (multi-select)
- [ ] Export to CSV/PDF
- [ ] User activity logs
- [ ] Advanced analytics with date range picker
- [ ] Blog categories and tags
- [ ] Comment moderation system
- [ ] Email notifications
- [ ] Dashboard customization

## 📝 Component Props

### StatCard

```typescript
interface StatCardProps {
  title: string; // Card title
  value: string | number; // Metric value
  icon: string; // Emoji icon
  trend?: {
    // Optional trend data
    value: number;
    isPositive: boolean;
  };
  color: "green" | "blue" | "purple" | "orange";
}
```

## 🎨 Customization

### Colors

All color schemes are defined in TailwindCSS classes. To customize:

1. Modify the color gradients in component classes
2. Update color utility classes
3. Ensure sufficient contrast for accessibility

### Spacing

Adjust padding and margins using TailwindCSS spacing scale:

- `p-4` = 1rem padding
- `gap-4` = 1rem gap
- `mb-6` = 1.5rem margin-bottom

## 📚 Dependencies

- `next` - React framework
- `next-auth` - Authentication
- `react` - UI library
- `tailwindcss` - CSS framework
- `mongoose` - MongoDB ODM

## 🐛 Troubleshooting

### Sidebar not responding

- Clear browser cache
- Check console for JavaScript errors
- Ensure all components are properly imported

### Charts not displaying

- Verify data structure matches expected format
- Check browser console for errors
- Ensure TailwindCSS styles are loaded

### Toast notifications not showing

- Check if ToastContainer is included in layout
- Verify showToast function is properly imported
- Ensure custom event listeners are registered

## 📄 License

This admin dashboard is part of the KM Silage platform.

## ✅ Checklist for Deployment

- [ ] Add authentication middleware to admin routes
- [ ] Implement backend API endpoints
- [ ] Add database queries for real data
- [ ] Set up proper error handling
- [ ] Add loading skeletons for better UX
- [ ] Implement pagination for large datasets
- [ ] Add rate limiting for admin actions
- [ ] Set up monitoring and logging
- [ ] Test responsiveness on real devices
- [ ] Optimize images and assets

---

**Version**: 1.0.0  
**Last Updated**: December 10, 2024  
**Built with ❤️ for KM Silage Platform**
