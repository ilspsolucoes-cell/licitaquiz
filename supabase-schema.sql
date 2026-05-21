-- ================================================
-- LicitaQuiz — Schema Supabase (cole no SQL Editor)
-- ================================================

create table if not exists profiles (
  id uuid references auth.users primary key,
  full_name text not null,
  email text not null,
  organization text,
  oab text,
  created_at timestamptz default now()
);

create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  icon text default '📋',
  color text default '#0F2040',
  is_public boolean default false,
  created_at timestamptz default now()
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  text text not null,
  time_limit integer default 20,
  sort_order integer default 0,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists answer_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id) on delete cascade,
  text text not null,
  is_correct boolean default false,
  sort_order integer default 0
);

create table if not exists game_sessions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id),
  host_id uuid references profiles(id),
  pin char(6) unique not null,
  status text default 'lobby',
  current_question_index integer default 0,
  question_started_at bigint,
  created_at timestamptz default now()
);

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references game_sessions(id) on delete cascade,
  nickname text not null,
  avatar text default '🎓',
  total_score integer default 0,
  joined_at timestamptz default now()
);

create table if not exists responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references game_sessions(id) on delete cascade,
  participant_id uuid references participants(id) on delete cascade,
  question_id uuid references questions(id),
  answer_option_id uuid references answer_options(id),
  is_correct boolean default false,
  points_earned integer default 0,
  response_time_ms integer,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table quizzes enable row level security;
alter table questions enable row level security;
alter table answer_options enable row level security;
alter table game_sessions enable row level security;
alter table participants enable row level security;
alter table responses enable row level security;

create policy "profiles_own" on profiles for all using (auth.uid() = id);
create policy "quizzes_owner" on quizzes for all using (auth.uid() = owner_id);
create policy "quizzes_public_read" on quizzes for select using (is_public = true);
create policy "questions_owner" on questions for all using (quiz_id in (select id from quizzes where owner_id = auth.uid()));
create policy "questions_read" on questions for select using (true);
create policy "options_owner" on answer_options for all using (question_id in (select id from questions where quiz_id in (select id from quizzes where owner_id = auth.uid())));
create policy "options_read" on answer_options for select using (true);
create policy "sessions_host" on game_sessions for all using (host_id = auth.uid());
create policy "sessions_read" on game_sessions for select using (true);
create policy "participants_read" on participants for select using (true);
create policy "participants_insert" on participants for insert with check (true);
create policy "participants_update" on participants for update using (true);
create policy "responses_read" on responses for select using (true);
create policy "responses_insert" on responses for insert with check (true);
