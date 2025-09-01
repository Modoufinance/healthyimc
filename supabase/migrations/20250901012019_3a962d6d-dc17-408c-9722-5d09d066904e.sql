-- Fix admin_users table RLS policies for proper security
-- Remove the overly restrictive policy that blocks everything
DROP POLICY IF EXISTS "Admin users can only see themselves" ON public.admin_users;

-- Create proper RLS policies for admin_users table
-- Only allow service role (edge functions) to access admin data
CREATE POLICY "Service role can manage admin users"
ON public.admin_users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow authenticated admin users to view only their own data
CREATE POLICY "Admins can view their own data"
ON public.admin_users
FOR SELECT
TO authenticated
USING (id = (
  SELECT admin_user_id 
  FROM public.admin_sessions 
  WHERE session_token = current_setting('request.headers')::json->>'authorization'
  AND expires_at > now()
  LIMIT 1
));

-- Create a security definer function to get current admin user ID safely
CREATE OR REPLACE FUNCTION public.get_current_admin_user_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT admin_user_id 
  FROM public.admin_sessions 
  WHERE session_token = current_setting('request.jwt.claims', true)::json->>'session_token'
  AND expires_at > now()
  LIMIT 1;
$$;

-- Update admin_users policies to use the security definer function
DROP POLICY IF EXISTS "Admins can view their own data" ON public.admin_users;

CREATE POLICY "Admins can view their own data"
ON public.admin_users
FOR SELECT
TO authenticated
USING (id = public.get_current_admin_user_id());

-- Fix database functions to include proper search_path
CREATE OR REPLACE FUNCTION public.cleanup_expired_admin_sessions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
    DELETE FROM public.admin_sessions WHERE expires_at < now();
$$;

CREATE OR REPLACE FUNCTION public.update_admin_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;