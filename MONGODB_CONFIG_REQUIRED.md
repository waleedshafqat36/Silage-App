# ⚠️ MongoDB Configuration Required

## The Error You're Seeing

```
querySrv ENOTFOUND _mongodb._tcp.silage-cluster.9zhao.mongodb.net
```

This means the MongoDB cluster URL in your `.env.local` doesn't exist.

## What You Need To Do

**You must provide your own MongoDB Atlas connection string.**

I've created guides to help you:
1. **MONGODB_QUICK_START.md** - Fast 5-minute setup
2. **MONGODB_ATLAS_SETUP.md** - Detailed step-by-step guide

## The Solution (3 Steps)

### Step 1: Create MongoDB Account (Free)
Visit: https://www.mongodb.com/cloud/atlas
- Sign up (no credit card required)
- Create an M0 (free) cluster
- Create a database user
- Whitelist your IP

### Step 2: Get Your Connection String
In MongoDB Atlas:
- Go to "Connect"
- Copy the Node.js connection string
- Replace placeholders with your info

Example format:
```
mongodb+srv://USERNAME:PASSWORD@cluster-name.mongodb.net/bloggingDB?retryWrites=true&w=majority
```

### Step 3: Update .env.local
Edit `.env.local` and replace:
```
MONGO_URI=YOUR_CONNECTION_STRING_HERE
```

## After Setup

1. Save `.env.local`
2. Restart dev server: `npm run dev`
3. Signup at http://localhost:3000/auth/signup
4. Check MongoDB Atlas to see your data

## Current Status

✅ Code is ready - all signup/login uses MongoDB
❌ Connection string is missing - you need to get yours from MongoDB Atlas

## Why?

- **Security**: I can't provide a shared test cluster (security risk)
- **Reliability**: You need your own cluster to ensure data is secure
- **Free**: MongoDB Atlas free tier is completely free (no credit card)

## Questions?

See the setup guides in the project root for detailed instructions.
