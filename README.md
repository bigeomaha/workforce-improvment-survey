# Workforce Intelligence Survey

A professional survey platform for gathering feedback on workforce intelligence products. Built with Next.js, deployed to Vercel, and using Supabase for data storage.

## Features

✅ **Three-Part Survey Flow**
- Gating question to identify managers vs. employees
- Role-specific surveys (7 questions each)
- Application feedback survey with embedded app previews

✅ **Interactive App Preview**
- Embedded iframes for mobile and desktop applications
- One-click switching between app versions
- Full app experience within the survey

✅ **Secure Data Storage**
- Supabase PostgreSQL database
- CORS-enabled for secure API calls
- Row-level security ready

✅ **Mobile Responsive**
- Built with Tailwind CSS
- Works on all devices
- Optimized survey experience

✅ **Easy Deployment**
- Deploy to Vercel with one click
- Environment variables for security
- Automatic CI/CD pipeline

## Survey Overview

### Gating Question
"Are you a manager of people or have you managed 8 or more people directly?"
- **Yes** → Manager Survey
- **No** → Employee Survey

### Manager Survey (7 questions)
Validates manager pain points around:
- Employee disengagement detection
- Performance evaluation challenges
- Workforce health visibility
- Actionable insights value

### Employee Survey (7 questions)
Validates employee needs around:
- AI companion adoption likelihood
- Privacy and trust concerns
- Feature priorities
- Honest participation willingness

### Application Feedback Survey (7 questions)
Gathers UX feedback on prototypes:
- App clarity and purpose
- Ease of navigation
- Feature usefulness
- Overall trustworthiness

## Quick Start

### 1. Prerequisites
- Node.js 18+
- Supabase account (free at https://supabase.com)
- Vercel account (free at https://vercel.com)

### 2. Clone & Install
```bash
cd /Users/clark/personal_projects/workforce-improvment-survey
npm install
```

### 3. Set Up Supabase
Follow the detailed setup in [SETUP.md](./SETUP.md):
- Create a Supabase project
- Create database tables using provided SQL
- Get your API credentials

### 4. Configure Environment
```bash
cp .env.local.example .env.local
```

Add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Run Locally
```bash
npm run dev
```

Visit `http://localhost:3000`

### 6. Deploy to Vercel
Push to GitHub, then:
1. Go to Vercel Dashboard
2. Click "Add New Project"
3. Select your GitHub repo
4. Add environment variables
5. Deploy!

Or use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

## Project Structure

```
workforce-improvment-survey/
├── app/
│   ├── api/                    # API routes for data submission
│   │   ├── gating/
│   │   ├── manager-survey/
│   │   ├── employee-survey/
│   │   └── app-feedback/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main survey flow
│   ├── globals.css             # Tailwind CSS
│   └── favicon.ico
├── components/
│   ├── GatingQuestion.tsx       # Manager/Employee branching
│   ├── ManagerSurvey.tsx        # Manager survey questions
│   ├── EmployeeSurvey.tsx       # Employee survey questions
│   └── AppFeedbackSurvey.tsx    # App feedback with iframes
├── lib/
│   └── supabase.ts             # Supabase client & types
├── public/                      # Static assets
├── .env.local.example           # Environment variables template
├── SETUP.md                     # Detailed setup instructions
├── vercel.json                  # Vercel configuration
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Key Technologies

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **State Management**: React Hooks

## API Endpoints

### POST /api/gating
Saves the initial manager/employee classification

### POST /api/manager-survey
Saves manager survey responses (7 questions)

### POST /api/employee-survey
Saves employee survey responses (7 questions)

### POST /api/app-feedback
Saves app feedback and review information

## Database Schema

### gating_responses
- `id`: UUID (Primary Key)
- `is_manager`: BOOLEAN
- `created_at`: TIMESTAMP

### manager_survey_responses
- `id`: UUID (Primary Key)
- `gating_id`: UUID (Foreign Key)
- `q1_confidence` to `q7_trustworthiness`: Responses
- `created_at`: TIMESTAMP

### employee_survey_responses
- `id`: UUID (Primary Key)
- `gating_id`: UUID (Foreign Key)
- `q1_likelihood` to `q7_personal_need`: Responses
- `created_at`: TIMESTAMP

### app_feedback_responses
- `id`: UUID (Primary Key)
- `gating_id`: UUID (Foreign Key)
- `survey_type`: TEXT (manager|employee)
- `q1_version_reviewed` to `q7_first_change`: Responses
- `created_at`: TIMESTAMP

## Analytics & Reporting

After collecting responses, analyze:

**Manager Insights:**
- % who lack early disengagement visibility
- Most common pain points
- Satisfaction with review processes
- Desired analytics features

**Employee Insights:**
- % likely to use AI companion
- Privacy requirement importance
- Top feature priorities
- Participation frequency expectations

**App Feedback:**
- % who understand product purpose
- Navigation ease scores
- Feature utility ratings
- Trust and clarity metrics

## Security Notes

- Public keys (`NEXT_PUBLIC_*`) are exposed in client code - use Supabase's public anonymous key only
- Set up Row Level Security (RLS) policies in Supabase for data protection
- Consider rate limiting in production
- Validate all inputs on the server side

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT

## Version

v0.1.0 - Initial Release
