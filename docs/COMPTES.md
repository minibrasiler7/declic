# Activer les comptes (Supabase)

Le site est statique (GitHub Pages). Les comptes et la progression sont stockés chez [Supabase](https://supabase.com), dont l'offre gratuite suffit largement. Tant que ce n'est pas configuré, le site garde la progression dans le navigateur.

## 1. Créer le projet
1. Crée un compte sur supabase.com, puis un projet (région Europe, par exemple Zurich ou Francfort).
2. Dans **Project Settings → API**, copie l'**URL du projet** et la clé **anon public**.

## 2. Créer la table de progression
Dans **SQL Editor**, exécute :

```sql
create table public.progression (
  user_id    uuid primary key references auth.users on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progression enable row level security;

create policy "lire sa progression"     on public.progression for select using (auth.uid() = user_id);
create policy "créer sa progression"    on public.progression for insert with check (auth.uid() = user_id);
create policy "modifier sa progression" on public.progression for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

Chaque personne ne peut lire et écrire que sa propre ligne : c'est ce qui rend la clé « anon » publique sans danger.

## 3. Régler l'authentification
Dans **Authentication → URL Configuration** :
- **Site URL** : `https://minibrasiler7.github.io/declic/`
- **Redirect URLs** : ajoute la même adresse (et `http://localhost:8000/` pour tester en local).

Dans **Authentication → Providers → Email** :
- Le service d'e-mail intégré de Supabase n'envoie que quelques e-mails par heure. Pour démarrer, tu peux désactiver **Confirm email** : les gens se connectent alors tout de suite après l'inscription.
- Pour la vraie mise en service, branche un SMTP (Brevo, Postmark, Resend…) dans **Project Settings → Auth → SMTP**, puis réactive la confirmation.

## 4. Brancher le site
Dans `compte.js`, remplis :

```js
const DECLIC_CONFIG = {
  supabaseUrl: 'https://xxxx.supabase.co',
  supabaseAnonKey: 'eyJhbGciOi…',
};
```

Commit, push : GitHub Pages republie le site en une ou deux minutes.

## Ce qui est synchronisé
L'objet de progression complet : leçons terminées, étape en cours de chaque leçon, XP, série de jours, contenu des ardoises. À la connexion, la progression locale et celle du compte sont fusionnées : rien n'est perdu.
