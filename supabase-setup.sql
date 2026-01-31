-- Create the valentine_responses table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS valentine_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('meeting_response', 'proposal_response', 'alternative_date')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE valentine_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for your frontend)
CREATE POLICY "Allow anonymous inserts" ON valentine_responses
  FOR INSERT WITH CHECK (true);

-- Allow anonymous reads (if you want to view responses)
CREATE POLICY "Allow anonymous reads" ON valentine_responses
  FOR SELECT USING (true);

-- Create an index on timestamp for better performance
CREATE INDEX idx_valentine_responses_timestamp ON valentine_responses(timestamp DESC);

-- Create an index on response type for better performance
CREATE INDEX idx_valentine_responses_type ON valentine_responses(type);
