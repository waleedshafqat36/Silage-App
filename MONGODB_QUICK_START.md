# 🚀 MongoDB Setup Checklist

## Current Issue
Your `.env.local` has a placeholder MongoDB URI that doesn't exist.

## ✅ Quick Setup (5 minutes)

### 1. Create Free MongoDB Account
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Click "Try Free"
- [ ] Sign up with email

### 2. Create a Cluster
- [ ] Click "Create a Deployment"
- [ ] Select "M0 Free" (Always free)
- [ ] Choose your region
- [ ] Wait for deployment (2-5 minutes)

### 3. Create Database User
- [ ] Go to "Database Access"
- [ ] Click "Add New Database User"
- [ ] Username: `silageadmin`
- [ ] Password: `SilageApp@2025` (or your choice)
- [ ] Click "Add User"

### 4. Whitelist IP Address
- [ ] Go to "Network Access"
- [ ] Click "Add IP Address"
- [ ] Click "Allow Access from Anywhere"
- [ ] Confirm

### 5. Get Connection String
- [ ] Go to "Databases"
- [ ] Click "Connect"
- [ ] Choose "Drivers"
- [ ] Copy the Node.js connection string
- [ ] Replace `<password>` with your password
- [ ] Replace `<your_db_name>` with `bloggingDB`

### 6. Update .env.local
Replace this:
```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER_NAME.mongodb.net/bloggingDB?retryWrites=true&w=majority
```

With your actual connection string.

Example:
```
MONGO_URI=mongodb+srv://silageadmin:SilageApp@2025@cluster-123456.9zhao.mongodb.net/bloggingDB?retryWrites=true&w=majority
```

### 7. Restart Dev Server
```bash
npm run dev
```

### 8. Test Signup
- [ ] Go to http://localhost:3000/auth/signup
- [ ] Create an account
- [ ] Check MongoDB Atlas dashboard for the new user

## If You Get Errors

### "ENOTFOUND" or "querySrv" Error
- ❌ Your cluster URL is wrong
- ✅ Double-check the connection string
- ✅ Make sure cluster is fully deployed (green status)

### "ECONNREFUSED" Error
- ❌ Can't reach MongoDB
- ✅ Check internet connection
- ✅ Check cluster is running
- ✅ Check IP whitelist includes your IP

### "Authentication failed"
- ❌ Wrong username or password
- ✅ Verify credentials in connection string
- ✅ Check special characters are URL-encoded

## Need Help?

See the detailed guide: `MONGODB_ATLAS_SETUP.md`

## Testing Your Connection

Once configured, run:
```bash
npm run dev
```

Then in browser:
1. Signup at http://localhost:3000/auth/signup
2. Create test account
3. Check MongoDB Atlas dashboard → Collections → users

You should see your user data there!
