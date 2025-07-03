-- Corriger le hash du mot de passe pour l'utilisateur Modou
-- Le hash ci-dessous correspond au mot de passe "7844mn44" avec bcrypt
UPDATE public.admin_users 
SET password_hash = '$2b$10$8K3wVoM2FGhM5QY3eY4aWuR3kYhKjS2vM5tFqP7R9xH6zAb8cEd1O'
WHERE username = 'Modou';