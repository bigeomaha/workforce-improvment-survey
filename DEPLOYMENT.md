# Deployment Guide - Workforce Intelligence Survey

This guide walks you through deploying the survey application to Vercel with Supabase for data storage.

## Deployment Checklist

- [ ] Create a Supabase project
- [ ] Create database tables in Supabase
- [ ] Get Supabase API credentials
- [ ] Set up GitHub repository
- [ ] Connect Vercel to GitHub
- [ ] Add environment variables to Vercel
- [ ] Deploy and test

## Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click **New Project**
3. Fill in:
   - Project name: `workforce-survey`
   - Database password: (Create a strong password and save it)
   - Region: Choose closest to your users
4. Click **Create new project** and wait for it to initialize

## Step 2: Create Database Tables

1. In Supabase, go to the **SQL Editor**
2. Click **New Query**
3. Copy and paste the SQL from [SETUP.md](./SETUP.md) under "Create Database Tables"
4. Click **Run**

Your tables are now created!

## Step 3: Get Your Supabase Credentials

1. Go to **Settings** → **API**
2. Copy and save:
   - **Project URL** (under "API Settings")
   - **anon public** (under "Project API keys")

These are your:
- `NEXT_PUBLIC_SUPABASE_URL` 
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 4: Push Code to GitHub

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Workforce Intelligence Survey"

# Add your GitHub repository
git remote add origin https://github.com/your-username/workforce-improvment-survey.git
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Connect your GitHub account and select your repository
5. Click **Import**
6. In **Environment Variables**, add:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase Project URL
   - Click **Add**
7. Add another environment variable:
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key
   - Click **Add**
8. Click **Deploy**

Wait for the deployment to complete. You'll get a URL like:
`https://workforce-improvment-survey.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# When prompted:
# - Link to existing project? No
# - Project name: workforce-improvment-survey
# - Which directory? .
# - Settings override? No

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Complete the gating question
3. Complete a survey
4. Check that data appears in Supabase:
   - Go to **Supabase Dashboard** → **Table Editor**
   - Click on `gating_responses` - you should see a new row
5. Test all three survey paths:
   - Manager (Yes → Manager Survey)
   - Employee (No → Employee Survey)
   - App Feedback for both types

## Monitoring & Analytics

### View Survey Responses

**In Supabase:**
1. Go to **Table Editor**
2. Click each table to view responses:
   - `gating_responses` - Manager classification
   - `manager_survey_responses` - Manager feedback
   - `employee_survey_responses` - Employee feedback
   - `app_feedback_responses` - App usability feedback

### Export Data

1. Click on any table
2. Click **Export** (top right)
3. Choose format (CSV, JSON)
4. Download and analyze in Excel or analytics tools

### Real-time Monitoring

1. In Supabase, go to **Database** → **Realtime**
2. Enable realtime for your tables
3. You can watch responses come in live

## Troubleshooting

### "Failed to save response" on survey submission

**Causes:**
- Environment variables not set correctly
- Supabase tables not created
- Network/CORS issues

**Fix:**
1. Check Vercel Environment Variables are correct
2. Verify all tables exist in Supabase
3. Check browser console for error messages
4. Check Vercel logs: Dashboard → Project → Deployments → Recent → Logs

### "supabaseUrl is required" during build

**Cause:** Trying to instantiate Supabase client without environment variables

**Fix:** The code already handles this - make sure you're using `getSupabaseClient()` function in API routes only

### Can't submit survey with "CORS error"

**Cause:** Supabase URL or key is incorrect

**Fix:**
1. Double-check your Supabase URL (should start with `https://`)
2. Verify you're using the `anon` key, not the `service_role` key
3. Check key isn't accidentally modified or truncated

## Custom Domain

1. In Vercel Dashboard, go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `survey.example.com`)
4. Follow Vercel's DNS instructions
5. Update your DNS records with your domain provider

## Performance Optimization

The app is already optimized with:
- ✅ Next.js auto-optimization
- ✅ Tailwind CSS purging unused styles
- ✅ Responsive images
- ✅ Code splitting

No additional optimization needed for typical survey volumes.

## Scaling

For high volumes (10,000+ responses/day):

1. **Consider Supabase Pro plan** for increased database limits
2. **Enable Supabase Edge Functions** for custom processing
3. **Set up Vercel Analytics** to monitor performance
4. **Consider caching** with Vercel KV if needed

## Support

- **Vercel Issues**: [Vercel Support](https://vercel.com/support)
- **Supabase Issues**: [Supabase Discord](https://discord.supabase.io)
- **Next.js Help**: [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)

## Next Steps

1. ✅ Deploy the app
2. Share survey link with users
3. Monitor responses in Supabase
4. Export and analyze data weekly
5. Iterate on survey questions based on feedback
