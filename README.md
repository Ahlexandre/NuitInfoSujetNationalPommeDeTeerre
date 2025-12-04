# Village NIRDistant

Application web statique ludique pour la Nuit de l'Info 2025 : aider les etablissements scolaires a resister aux Big Tech en adoptant un numerique inclusif, responsable et durable (NIRD).

## Arborescence
- `index.html` — accueil immersive (village, missions)
- `parcours.html` — quiz/scenarios avec points/badges
- `solutions.html` — catalogue "Solutions NIRD" filtrable + export JSON
- `simulation.html` — mini simulateur dependance vs autonomie
- `contribuer.html` — "Aller plus loin" + formulaire local
- `assets/css/style.css` — theme, responsive, accessibilite
- `assets/js/data.js` — donnees mock (quiz, solutions, badges)
- `assets/js/app.js` — logique quiz, filtres, simulation, formulaire

## Lancer en 10 secondes
- Ouvre `index.html` dans ton navigateur, ou
- lance un mini-serveur statique :
  - PowerShell : `python -m http.server 8000`
  - Puis visite `http://localhost:8000`

## Accessibilite & sobriete
- Couleurs contrastees, focus visibles, navigation clavier.
- Feedback aria-live pour quiz et boutons de copie.
- `prefers-reduced-motion` respecte, pas de dependance lourde.
- Assets legers (SVG possibles), police systeme/Atkinson fallback.
- Donnees stockees en `localStorage` uniquement (pas d'API externe).

## Personnalisation rapide
- Edite les donnees dans `assets/js/data.js` (quiz, solutions, badges).
- Ajuste la palette et les espacements dans `assets/css/style.css`.
- Remplace les visuels dans `assets/img/`.

## Mode d'emploi express (utilisateur)
1) Onglet Parcours : clique sur "Lancer les defis", reponds, regarde le feedback et ton score.
2) Onglet Solutions : filtre par categorie, lis les cartes, copie la liste en JSON si besoin.
3) Onglet Simulation : regle les curseurs, clique sur Calculer, lis score/budget/empreinte.

## Licence
MIT — voir le fichier source pour la mention. Utilisable et modifiable librement pour vos ateliers NIRD.
