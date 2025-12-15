# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign Up"
3. Create a free account (no credit card required)

## Step 2: Create a Database Cluster

1. After signing up, click "Create a Deployment"
2. Select **M0 (Free Tier)** - it's completely free
3. Choose your cloud provider (AWS, Google Cloud, or Azure)
4. Select your preferred region
5. Click "Create Deployment"
6. Wait for the cluster to be created (usually 2-5 minutes)

## Step 3: Create a Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Set username: `silageadmin`
4. Set password: `SilageApp@2025` (or choose your own)
5. Click "Add User"

## Step 4: Whitelist IP Address

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Confirm

## Step 5: Get Your Connection String

1. Go to "Databases" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js" and version 4.1 or later
5. Copy the connection string
6. Replace `<password>` with your password
7. Replace `<your_db_name>` with `bloggingDB`

Your string should look like:
```
mongodb+srv://silageadmin:SilageApp@2025@your-cluster-name.mongodb.net/bloggingDB?retryWrites=true&w=majority
```

## Step 6: Update .env.local

Replace the MONGO_URI in `.env.local` with your connection string:

```
MONGO_URI=mongodb+srv://silageadmin:SilageApp@2025@your-cluster-name.mongodb.net/bloggingDB?retryWrites=true&w=majority
```

## Step 7: Test Connection

1. Restart the dev server: `npm run dev`
2. Go to http://localhost:3000/auth/signup
3. Create a test account
4. Check MongoDB Atlas dashboard to see the user in the database

## Troubleshooting

### Still getting "ENOTFOUND" error?
- Make sure your cluster is fully deployed (status should be "HEALTHY")
- Verify IP address is whitelisted
- Double-check the connection string is correct

### Connection timeout?
- Check your internet connection
- Make sure the cluster is running
- Try adding `maxPoolSize=10` to the connection string

### Authentication failed?
- Verify username and password are correct
- Make sure special characters are URL-encoded if you used them in the password
