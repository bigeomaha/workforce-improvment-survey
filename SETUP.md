# Workforce Intelligence Survey - Setup Guide

This is a Next.js SPA that deploys to Vercel and uses Supabase for data storage.

## Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (free tier available at https://supabase.com)
- A Vercel account (free tier available at https://vercel.com)

## 1. Set Up Supabase

### Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in the project name and database password
4. Wait for the project to be created

### Get Your Credentials

1. Go to **Settings** > **API**
2. Copy your:
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Create Database Tables

Run the following SQL in the Supabase SQL Editor:

```sql
-- Gating responses
CREATE TABLE gating_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_manager BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Manager survey responses
CREATE TABLE manager_survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gating_id UUID REFERENCES gating_responses(id),
  q1_confidence TEXT NOT NULL,
  q2_hardest_issues TEXT[] NOT NULL,
  q3_evaluation_usefulness TEXT NOT NULL,
  q4_frustration TEXT[] NOT NULL,
  q5_insights_value TEXT NOT NULL,
  q6_most_useful_insight TEXT NOT NULL,
  q7_trustworthiness TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Employee survey responses
CREATE TABLE employee_survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gating_id UUID REFERENCES gating_responses(id),
  q1_likelihood TEXT NOT NULL,
  q2_frequency TEXT NOT NULL,
  q3_honesty TEXT NOT NULL,
  q4_hesitations TEXT[] NOT NULL,
  q5_useful_features TEXT[] NOT NULL,
  q6_privacy_importance TEXT NOT NULL,
  q7_personal_need TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- App feedback responses
CREATE TABLE app_feedback_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gating_id UUID REFERENCES gating_responses(id),
  survey_type TEXT NOT NULL,
  q1_version_reviewed TEXT NOT NULL,
  q2_clarity TEXT NOT NULL,
  q3_ease_of_use TEXT NOT NULL,
  q4_most_useful TEXT NOT NULL,
  q5_least_clear TEXT NOT NULL,
  q6_trustworthiness TEXT NOT NULL,
  q7_first_change TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security) if desired
ALTER TABLE gating_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE manager_survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_feedback_responses ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON gating_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON manager_survey_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON employee_survey_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON app_feedback_responses
  FOR INSERT WITH CHECK (true);
```

## 2. Set Up Local Environment

1. Clone or navigate to your project directory
2. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
3. Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## 3. Run Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to test the survey.

## 4. Deploy to Vercel

### Option A: Via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Select your GitHub repository
5. In Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Option B: Via CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and add environment variables when asked.

## Survey Flow

1. **Gating Question**: "Are you a manager of people or have you managed 8 or more people directly?"
   - **Yes** → Manager Survey
   - **No** → Employee Survey

2. **Manager or Employee Survey**: 7 questions specific to their role

3. **Application Feedback Survey**: Respondents review prototypes and provide feedback
   - Can toggle between mobile and desktop app iframes
   - 7 questions about usability and clarity

4. **Completion**: Thank you page with option to retake survey

## Data Analysis

All responses are stored in Supabase. You can:

1. Query responses directly in the Supabase dashboard
2. Export data as CSV
3. Set up webhooks to send data to other services
4. View real-time response charts in Supabase

## Support

- **Next.js Documentation**: https://nextjs.org/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Vercel Documentation**: https://vercel.com/docs
