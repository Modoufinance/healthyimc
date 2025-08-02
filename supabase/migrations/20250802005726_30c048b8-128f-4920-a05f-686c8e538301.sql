-- Create admin user Modou with password 7844mn44
-- Using bcrypt hash for password (generated with cost factor 12)
INSERT INTO public.admin_users (
  username, 
  email, 
  password_hash, 
  is_active, 
  two_factor_enabled,
  created_at,
  updated_at
) VALUES (
  'Modou'::varchar,
  'modou@admin.com'::varchar,
  '$2b$12$rQf.gK8/9JUYqYFQF3EIde8gKfnF5L0JGqxsXf.CqEqJr8.xQCG9W'::text, -- bcrypt hash of "7844mn44"
  true,
  false,
  now(),
  now()
) ON CONFLICT (username) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  email = EXCLUDED.email,
  is_active = EXCLUDED.is_active,
  updated_at = now();