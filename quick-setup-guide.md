# Quick Supabase Setup Guide

## Option 1: Create New Supabase Project (Easiest)

1. Go to https://supabase.com
2. Click "Start your project" 
3. Sign up with any email (Gmail is easiest)
4. Create new project:
   - Project name: "valentine-proposal"
   - Database password: Create a strong password
5. Wait 2 minutes for setup
6. Go to Settings → API
7. Copy these values to your .env:

```
VITE_SUPABASE_URL=YOUR_NEW_PROJECT_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_NEW_ANON_KEY
```

8. Run this SQL in SQL Editor:

```sql
CREATE TABLE valentine_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('meeting_response', 'proposal_response', 'alternative_date')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE valentine_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON valentine_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous reads" ON valentine_responses
  FOR SELECT USING (true);
```

## Option 2: Use LocalStorage Only (No Database)

Your app already saves to localStorage as backup!
- Data saves in browser
- Works immediately
- No setup needed

## Current Status:
✅ App is working
✅ Yes/No buttons functional  
✅ Calendar working
✅ Data saves to localStorage
🔄 Just need database for permanent storage
