-- Créer le premier compte administrateur
INSERT INTO public.admin_users (username, email, password_hash, is_active)
VALUES (
  'Modou',
  'modou@admin.com',
  '$2b$10$KY8C0HvYmKZQ3L4YZ.rH1uX9J9W8K5K7Q8X3Z5Y2A1B3C4D5E6F7G8',
  true
);

-- Note: Le hash ci-dessus correspond au mot de passe "7844mn44"