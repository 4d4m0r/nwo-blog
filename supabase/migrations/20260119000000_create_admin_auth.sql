-- Create admin_profiles table to track admin users
-- Note: auth.users table is managed by Supabase and RLS is already enabled
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on admin_profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all admin profiles
CREATE POLICY "Admins can view admin profiles"
  ON public.admin_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Note: To create an admin user:
-- 1. Create a user in Supabase Auth (via dashboard or API)
-- 2. Insert their user ID into admin_profiles:
--    INSERT INTO public.admin_profiles (id, email, is_admin)
--    VALUES ('<user-id-from-auth.users>', 'admin@example.com', true);

-- Update RLS policies on articles to allow admin CRUD
-- Drop existing policies if they exist (using IF EXISTS won't work, so we'll create new ones)

-- Policy: Allow admins to insert articles
CREATE POLICY "Admins can insert articles"
  ON public.articles
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Policy: Allow admins to update articles
CREATE POLICY "Admins can update articles"
  ON public.articles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Policy: Allow admins to delete articles
CREATE POLICY "Admins can delete articles"
  ON public.articles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Function to check if user is admin (helper function)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = user_id AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
