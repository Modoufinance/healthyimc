-- Supprimer l'utilisateur admin existant pour pouvoir recréer avec le bon mot de passe
DELETE FROM admin_users WHERE username = 'Modou';