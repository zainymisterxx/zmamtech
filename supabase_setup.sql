-- ==========================================================
-- SUPABASE STORAGE & DATABASE SETUP FOR ZMAMTECH
-- Paste and run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ==========================================================

-- 1. Create Tables if they don't exist
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.team (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.solutions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create 'portfolio-assets' bucket if it doesn't exist & make it public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 3. Storage Policies for 'portfolio-assets' bucket
DROP POLICY IF EXISTS "Public Read Assets" ON storage.objects;
DROP POLICY IF EXISTS "Public Insert Assets" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Assets" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Assets" ON storage.objects;

CREATE POLICY "Public Read Assets" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Public Insert Assets" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Public Update Assets" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Public Delete Assets" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'portfolio-assets');

-- 4. Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;

-- Projects Policies
DROP POLICY IF EXISTS "Allow public select projects" ON public.projects;
DROP POLICY IF EXISTS "Allow public insert projects" ON public.projects;
DROP POLICY IF EXISTS "Allow public update projects" ON public.projects;
DROP POLICY IF EXISTS "Allow public delete projects" ON public.projects;

CREATE POLICY "Allow public select projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete projects" ON public.projects FOR DELETE USING (true);

-- Services Policies
DROP POLICY IF EXISTS "Allow public select services" ON public.services;
DROP POLICY IF EXISTS "Allow public insert services" ON public.services;
DROP POLICY IF EXISTS "Allow public update services" ON public.services;
DROP POLICY IF EXISTS "Allow public delete services" ON public.services;

CREATE POLICY "Allow public select services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public insert services" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update services" ON public.services FOR UPDATE USING (true);
CREATE POLICY "Allow public delete services" ON public.services FOR DELETE USING (true);

-- Team Policies
DROP POLICY IF EXISTS "Allow public select team" ON public.team;
DROP POLICY IF EXISTS "Allow public insert team" ON public.team;
DROP POLICY IF EXISTS "Allow public update team" ON public.team;
DROP POLICY IF EXISTS "Allow public delete team" ON public.team;

CREATE POLICY "Allow public select team" ON public.team FOR SELECT USING (true);
CREATE POLICY "Allow public insert team" ON public.team FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update team" ON public.team FOR UPDATE USING (true);
CREATE POLICY "Allow public delete team" ON public.team FOR DELETE USING (true);

-- Solutions Policies
DROP POLICY IF EXISTS "Allow public select solutions" ON public.solutions;
DROP POLICY IF EXISTS "Allow public insert solutions" ON public.solutions;
DROP POLICY IF EXISTS "Allow public update solutions" ON public.solutions;
DROP POLICY IF EXISTS "Allow public delete solutions" ON public.solutions;

CREATE POLICY "Allow public select solutions" ON public.solutions FOR SELECT USING (true);
CREATE POLICY "Allow public insert solutions" ON public.solutions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update solutions" ON public.solutions FOR UPDATE USING (true);
CREATE POLICY "Allow public delete solutions" ON public.solutions FOR DELETE USING (true);
