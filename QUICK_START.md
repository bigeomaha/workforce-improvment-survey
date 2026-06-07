# Quick Start Guide - Workforce Intelligence Survey

Your survey app is ready to deploy! Here's how to get it running in minutes.

## ⚡ 5-Minute Setup

### Step 1: Create Supabase Project (2 min)
1. Go to https://app.supabase.com
2. Click **New Project**
3. Fill in project name & password
4. Click **Create new project**
5. Wait for it to finish

### Step 2: Create Database Tables (1 min)
1. In Supabase, go to **SQL Editor** → **New Query**
2. Copy all SQL from [SETUP.md](./SETUP.md) section "Create Database Tables"
3. Paste it and click **Run**

### Step 3: Get Your Credentials (1 min)
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 4: Configure Your App (1 min)
```bash
# Update the .env.local file with your Supabase credentials
# File: .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-key
```

## 🚀 Deploy to Vercel

### Option A: One-Click Deploy (Easiest)

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Survey app"
   git remote add origin https://github.com/your-username/workforce-improvment-survey.git
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL=https://...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`
5. Click **Deploy**

Done! You'll get a URL like: `https://workforce-survey.vercel.app`

### Option B: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
# Follow the prompts
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```

## ✅ Test Your App

1. Visit your Vercel URL
2. Answer "Are you a manager?" → Select **Yes** or **No**
3. Complete the survey
4. Check Supabase to see your response:
   - Go to **Supabase** → **Table Editor**
   - Click `gating_responses` - you should see a new row!

## 📊 Share & Collect Responses

Your survey is live! Share the link:
```
https://your-vercel-url.vercel.app
```

Monitor responses in Supabase:
- **Gating responses**: `gating_responses` table
- **Manager surveys**: `manager_survey_responses` table
- **Employee surveys**: `employee_survey_responses` table
- **App feedback**: `app_feedback_responses` table

## 🔍 Troubleshooting

**"Failed to save response"**
- Check Supabase URL & key are correct in `.env.local`
- Make sure all 4 tables were created in Supabase
- Check browser console for error details

**App doesn't load**
- Clear browser cache
- Check that Vercel deployment finished successfully
- View Vercel logs if deployment failed

## 📚 Next Steps

1. Share the survey link with test users
2. Monitor responses in Supabase
3. Export results as CSV from Supabase
4. Analyze trends and iterate

## 📖 Full Documentation

For more details, see:
- [README.md](./README.md) - Full feature overview
- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

## 🆘 Need Help?

- **Survey specific**: Check the survey questions in the components
- **Supabase issues**: https://supabase.com/docs
- **Vercel issues**: https://vercel.com/support
- **Next.js help**: https://nextjs.org/docs

---

**Questions?** The app is fully self-contained. All data stays in your Supabase project, no external services needed!
