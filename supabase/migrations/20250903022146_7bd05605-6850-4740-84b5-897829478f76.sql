-- Ajouter le champ scheduled_at à la table cms_articles pour la programmation des publications
ALTER TABLE public.cms_articles 
ADD COLUMN scheduled_at timestamp with time zone NULL;

-- Créer un index pour optimiser les requêtes sur les articles programmés
CREATE INDEX idx_cms_articles_scheduled_at ON public.cms_articles (scheduled_at) 
WHERE scheduled_at IS NOT NULL AND published = false;