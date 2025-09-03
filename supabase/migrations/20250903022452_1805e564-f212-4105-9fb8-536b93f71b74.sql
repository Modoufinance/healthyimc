-- Créer les extensions nécessaires pour la programmation
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Créer une tâche cron pour publier automatiquement les articles programmés
-- S'exécute toutes les 5 minutes pour vérifier les articles à publier
SELECT cron.schedule(
    'auto-publish-scheduled-articles',
    '*/5 * * * *', -- Toutes les 5 minutes
    $$
    SELECT
      net.http_post(
          url:='https://rzqkytriimmwfsnjirwf.supabase.co/functions/v1/schedule-publisher',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6cWt5dHJpaW1td2ZzbmppcndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzQ3NjQsImV4cCI6MjA2MTg1MDc2NH0.yu8i0r2FvzxEX9-TZu_9Xai7aCwQ14pqQUkoqUIPWPU"}'::jsonb,
          body:='{"scheduled": true}'::jsonb
      ) as request_id;
    $$
);