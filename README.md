Compteur minimal de jours ouvrés pour remplir un CRA freelance. Le thème, le mois et les jours cochés restent dans le navigateur.

## Développement

```bash
bun install
bun run dev
```

L’application est servie sur http://localhost:5173.

## Déploiement

L’image construit le site avec Bun, puis le sert avec nginx. Aucune base de données : un seul conteneur suffit.

```bash
docker compose up -d --build
```

L’application est servie sur http://localhost:8080. Pour l’arrêter :

```bash
docker compose down
```
