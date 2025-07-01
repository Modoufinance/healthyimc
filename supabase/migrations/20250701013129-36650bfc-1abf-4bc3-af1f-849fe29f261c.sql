
-- Créer un bucket pour les images des articles
INSERT INTO storage.buckets (id, name, public) 
VALUES ('article-images', 'article-images', true);

-- Politique pour permettre à tous de voir les images (publique)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'article-images');

-- Politique pour permettre l'upload d'images (vous pouvez ajuster selon vos besoins d'authentification)
CREATE POLICY "Allow uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'article-images');

-- Politique pour permettre la mise à jour des images
CREATE POLICY "Allow updates" ON storage.objects FOR UPDATE USING (bucket_id = 'article-images');

-- Politique pour permettre la suppression des images
CREATE POLICY "Allow deletes" ON storage.objects FOR DELETE USING (bucket_id = 'article-images');
