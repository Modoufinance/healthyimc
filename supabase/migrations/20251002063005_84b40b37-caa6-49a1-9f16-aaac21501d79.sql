-- Sécurité: supprimer la politique trop permissive et autoriser l'upload côté admin non authentifié

-- 1) Retirer la politique SELECT trop large sur digital-products (si elle existe)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Authenticated users can view all product files'
  ) THEN
    EXECUTE 'DROP POLICY "Authenticated users can view all product files" ON storage.objects';
  END IF;
END $$;

-- 2) Autoriser l'UPLOAD pour tous sur le bucket privé (écriture seulement)
--    Cela permet à l'admin (non connecté via Supabase Auth) d'envoyer les fichiers depuis le dashboard.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Anyone can upload digital products'
  ) THEN
    CREATE POLICY "Anyone can upload digital products"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'digital-products');
  END IF;
END $$;