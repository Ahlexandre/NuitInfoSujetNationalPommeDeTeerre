# Village NIRDistant

Application web statique ludique pour la Nuit de l’Info 2025 : aider les établissements scolaires à résister aux Big Tech en adoptant un numérique inclusif, responsable et durable (NIRD).

## Arborescence
- `index.html` — accueil immersive (village, missions)
- `parcours.html` — quiz/scénarios avec points/badges
- `solutions.html` — catalogue “Solutions NIRD” filtrable + export JSON
- `simulation.html` — mini simulateur dépendance vs autonomie
- `contribuer.html` — “Aller plus loin” + formulaire local
- `assets/css/style.css` — thème, responsive, accessibilité
- `assets/js/data.js` — données mock (quiz, solutions, badges)
- `assets/js/app.js` — logique quiz, filtres, simulation, formulaire

## Lancer en 10 secondes
- Ouvre `index.html` dans ton navigateur, ou
- lance un mini-serveur statique :
  - PowerShell : `python -m http.server 8000`
  - Puis visite `http://localhost:8000`

## Accessibilité & sobriété
- Couleurs contrastées, focus visibles, navigation clavier.
- Feedback aria-live pour quiz et boutons de copie.
- `prefers-reduced-motion` respecté, pas de dépendance lourde.
- Assets légers (SVG possibles), police système/Atkinson fallback.
- Données stockées en `localStorage` uniquement (pas d’API externe).

## Personnalisation rapide
- Édite les données dans `assets/js/data.js` (quiz, solutions, badges).
- Ajuste la palette et les espacements dans `assets/css/style.css`.
- Remplace les visuels dans `assets/img/`.

## Mode d'emploi express (utilisateur)
1) Onglet Parcours → clique sur « Lancer les défis », réponds, regarde le feedback et ton score.
2) Onglet Solutions → filtre par catégorie, lis les cartes, copie la liste en JSON si besoin.
3) Onglet Simulation → règle les curseurs, clique sur Calculer, lis score/budget/empreinte.

## Licence
MIT — voit le fichier source pour la mention. Utilisable et modifiable librement pour vos ateliers NIRD.
