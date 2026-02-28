-- Kortex AI — Schéma prototype (Cahier des charges)
-- À exécuter dans Supabase : SQL Editor → New query → coller ce script → Run

-- Table des conversations (prospects / visiteurs du chatbot)
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_name text,
  visitor_email text,
  visitor_phone text,
  company_name text,
  sector text,
  need text,
  recommended_offer text,
  has_website text,
  budget text,
  urgency text,
  summary text,
  status text default 'active' check (status in ('active', 'completed', 'email_sent')),
  email_sent_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Table des messages d'une conversation
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('visitor', 'bot')),
  content text not null,
  created_at timestamptz default now() not null
);

-- Index pour les requêtes courantes
create index if not exists idx_messages_conversation_id on public.messages(conversation_id);
create index if not exists idx_conversations_status on public.conversations(status);
create index if not exists idx_conversations_created_at on public.conversations(created_at desc);

-- RLS : autoriser l’API (service role) et les requêtes authentifiées selon ta politique
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Exemple : permettre l’insertion/lecture pour les utilisateurs authentifiés (à adapter selon besoin)
-- create policy "Allow authenticated read/write conversations" on public.conversations for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');
-- create policy "Allow authenticated read/write messages" on public.messages for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- Pour le prototype : permettre tout en lecture/écriture via anon si besoin (à restreindre en prod)
create policy "conversations_prototype" on public.conversations for all using (true) with check (true);
create policy "messages_prototype" on public.messages for all using (true) with check (true);

comment on table public.conversations is 'Conversations chatbot Kortex AI — infos prospect et statut';
comment on table public.messages is 'Messages d’une conversation (visiteur / bot)';
