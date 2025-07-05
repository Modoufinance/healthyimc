-- Corriger le nom de la colonne dans admin_login_attempts
ALTER TABLE public.admin_login_attempts 
RENAME COLUMN "Modou" TO id;

-- Vérifier que tous les index et contraintes sont corrects
-- Recréer l'index sur IP et date si nécessaire
DROP INDEX IF EXISTS idx_admin_login_attempts_ip;
CREATE INDEX idx_admin_login_attempts_ip ON public.admin_login_attempts(ip_address, created_at);

DROP INDEX IF EXISTS idx_admin_login_attempts_username;
CREATE INDEX idx_admin_login_attempts_username ON public.admin_login_attempts(username, created_at);