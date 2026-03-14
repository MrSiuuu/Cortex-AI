-- Migration : ajout intent_detected et closed sur public.conversations
-- À exécuter dans Supabase → SQL Editor

alter table public.conversations
  add column if not exists intent_detected text
    check (intent_detected in ('info', 'interest', 'purchase', 'refusal')),
  add column if not exists closed boolean default false;

comment on column public.conversations.intent_detected is 'Dernier intent détecté par l agent IA';
comment on column public.conversations.closed is 'True si le prospect a accepté une offre';
