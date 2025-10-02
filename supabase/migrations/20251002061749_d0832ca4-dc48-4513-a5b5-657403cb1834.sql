-- Ajouter des politiques pour permettre aux admins de gérer les fichiers produits

-- Permettre aux utilisateurs authentifiés de voir tous les fichiers du bucket (pour l'admin)
CREATE POLICY "Authenticated users can view all product files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'digital-products' 
  AND auth.role() = 'authenticated'
);

-- Permettre aux utilisateurs authentifiés de mettre à jour les fichiers
CREATE POLICY "Authenticated users can update product files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'digital-products' 
  AND auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'digital-products' 
  AND auth.role() = 'authenticated'
);

-- Permettre aux utilisateurs authentifiés de supprimer les fichiers
CREATE POLICY "Authenticated users can delete product files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'digital-products' 
  AND auth.role() = 'authenticated'
);