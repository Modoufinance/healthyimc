-- Fix security vulnerability: Restrict subscribers table INSERT to authenticated users only
-- Remove the overly permissive INSERT policy
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;

-- Create a new secure INSERT policy that only allows authenticated users to insert their own data
CREATE POLICY "authenticated_users_can_insert_own_subscription" ON public.subscribers
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Also update the SELECT policy to be more secure - users should only see their own subscription
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;

CREATE POLICY "users_can_view_own_subscription" ON public.subscribers
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id OR email = auth.email());

-- Update policy should also be restricted to authenticated users
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;

CREATE POLICY "users_can_update_own_subscription" ON public.subscribers
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add a policy for service role to allow edge functions to manage subscriptions
CREATE POLICY "service_role_can_manage_subscriptions" ON public.subscribers
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);