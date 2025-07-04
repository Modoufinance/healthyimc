-- Créer un utilisateur admin avec le bon hash bcrypt
-- Le hash bcrypt pour le mot de passe "7844mn44"
INSERT INTO public.admin_users (username, email, password_hash, is_active)
VALUES (
  'Modou',
  'modou@healthyimc.com',
  '$2b$10$YMXw4q5X9kR5Lm3VcCvOZesU.QHEo/8/J8fJGQ6VhFZOFqY8KCt/i',
  true
) ON CONFLICT (username) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  is_active = EXCLUDED.is_active;