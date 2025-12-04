// Donnees mockees pour les scenarios, solutions et badges
const QUIZ_SCENARIOS = [
  {
    id: "scenario-enseignant",
    title: "Salle info en rade",
    context: "Objectif : prolonger le parc sans achat massif.",
    question: "La moitie des postes sont lents. Que fais-tu pour sauver ton cours ?",
    choices: [
      {
        label: "Installer une distro legere libre et relancer les PC.",
        impact: 1,
        feedback: "Bravo : tu gagnes en sobriete et allonges la duree de vie.",
      },
      {
        label: "Appeler le support Big Tech pour upgrader les licences.",
        impact: 0,
        feedback: "Neutre : tu restes dependant(e), sans resoudre l'obsolescence.",
      },
      {
        label: "Remplacer tout le parc par du neuf proprietaire.",
        impact: -1,
        feedback: "Aie : couts eleves, impact carbone fort, dependance accrue.",
      },
    ],
  },
  {
    id: "scenario-eleve",
    title: "Budget serre, Big Tech insiste",
    context: "Objectif : garder la main sur les formats et les couts.",
    question: "Une suite proprietaire propose une reduction. Comment reagis-tu ?",
    choices: [
      {
        label: "Tester des alternatives libres (OnlyOffice, LibreOffice, Pads).",
        impact: 1,
        feedback: "Top : tu favorises l'interop et l'apprentissage des formats ouverts.",
      },
      {
        label: "Accepter la reduction pour 1 an et aviser ensuite.",
        impact: 0,
        feedback: "Mi-figue : court terme ok, mais toujours dependant et data captives.",
      },
      {
        label: "Signer 5 ans pour securiser le prix.",
        impact: -1,
        feedback: "Tu bloques ton budget et l'autonomie pour longtemps.",
      },
    ],
  },
  {
    id: "scenario-admin",
    title: "Donnees eleves sous controle",
    context: "Objectif : gouverner les donnees sensibles en interne.",
    question: "Le cloud externe stocke les dossiers d'eleves. Quelle gouvernance choisir ?",
    choices: [
      {
        label: "Heberger localement ou chez un prestataire souverain, chiffrement.",
        impact: 1,
        feedback: "Excellent : conformite RGPD, maitrise des donnees, meilleure resilience.",
      },
      {
        label: "Signer un avenant de traitement de donnees sans audit.",
        impact: 0,
        feedback: "Peut depanner, mais tu depends toujours d'un tiers opaque.",
      },
      {
        label: "Exporter les donnees vers un service gratuit non certifie.",
        impact: -1,
        feedback: "Risque fort de fuite et de non-conformite.",
      },
    ],
  },
  {
    id: "scenario-reemploi",
    title: "Gros arrivee de vieux PC",
    context: "Objectif : maximiser le reemploi et limiter l'achat neuf.",
    question: "Le departement livre 40 PC de 7 ans. Que fais-tu ?",
    choices: [
      {
        label: "Reconditionner avec une distro legere + SSD de recup.",
        impact: 1,
        feedback: "Yes : tu prolonges de 3 ans, impact carbone divise.",
      },
      {
        label: "Stocker pour pieces sans plan clair.",
        impact: 0,
        feedback: "Neutre : pas de gain, pas de perte, mais inaction.",
      },
      {
        label: "Jeter et commander du neuf proprietaire.",
        impact: -1,
        feedback: "Perte massive : gaspillage et budget explose.",
      },
    ],
  },
  {
    id: "scenario-logiciel",
    title: "Choix ENT",
    context: "Objectif : limiter le tracking et rester interop.",
    question: "L'ENT proprietaire impose des trackers. Reponse ?",
    choices: [
      {
        label: "Proposer un ENT libre auto-heberge ou chez hebergeur souverain.",
        impact: 1,
        feedback: "Bien vu : moins de trackers, respect RGPD, interop.",
      },
      {
        label: "Accepter mais demander une page vie-privee",
        impact: 0,
        feedback: "Minimal : un peu de transparence, dependance intacte.",
      },
      {
        label: "Ignorer les trackers pour aller vite.",
        impact: -1,
        feedback: "Mauvais : data eleves en risque, pas conforme.",
      },
    ],
  },
  {
    id: "scenario-cloud",
    title: "Stockage collaboratif",
    context: "Objectif : collaborer sans vendre les donnees.",
    question: "Quel cloud pour les groupes d'eleves ?",
    choices: [
      {
        label: "Nextcloud self-host ou assoc libre, comptes limites.",
        impact: 1,
        feedback: "Top : controle des donnees, integration LibreOffice/OnlyOffice.",
      },
      {
        label: "Drive Big Tech gratuit pour tout le monde.",
        impact: -1,
        feedback: "Zero controle, publicite, dependance forte.",
      },
      {
        label: "USB tournant en classe.",
        impact: 0,
        feedback: "Ca marche mais risque perte, pas de collab en ligne.",
      },
    ],
  },
  {
    id: "scenario-access",
    title: "Accessibilite en urgence",
    context: "Objectif : accessibilite immediate pour tous.",
    question: "Un eleve malvoyant arrive. Que fais-tu d'abord ?",
    choices: [
      {
        label: "Activer lecteur d'ecran, contraste eleve, police legible.",
        impact: 1,
        feedback: "Inclusif : tu rends le poste utilisable immediatement.",
      },
      {
        label: "Donner un PDF non balise et expliquer oralement.",
        impact: 0,
        feedback: "Partiel : manque de structure accessible.",
      },
      {
        label: "Reporter le cours pour trouver du materiel plus tard.",
        impact: -1,
        feedback: "Exclusion immediate, apprentissage bloque.",
      },
    ],
  },
  {
    id: "scenario-energie",
    title: "Electricite limitee",
    context: "Objectif : continuer le cours en sobriete.",
    question: "Panne partielle d'elec, tu dois limiter la conso.",
    choices: [
      {
        label: "Basculer sur portables reconditionnes + mode basse conso.",
        impact: 1,
        feedback: "Sobre : moins de watts, cours maintenu.",
      },
      {
        label: "Couper tout et envoyer les eleves en etude.",
        impact: 0,
        feedback: "Neutre : pas de risque, mais pas d'apprentissage.",
      },
      {
        label: "Allumer tout le parc et croiser les doigts.",
        impact: -1,
        feedback: "Risque de coupure totale, pas de sobriete.",
      },
    ],
  },
  {
    id: "scenario-formations",
    title: "Former l'equipe",
    context: "Objectif : embarquer tout le monde progressivement.",
    question: "Comment embarquer les profs ?",
    choices: [
      {
        label: "Ateliers courts mensuels + docs libres + binomes.",
        impact: 1,
        feedback: "Super : monte en competence et diffusion durable.",
      },
      {
        label: "Envoyer un long PDF unique par mail.",
        impact: 0,
        feedback: "Peu engageant, faible adoption.",
      },
      {
        label: "Imposer sans accompagnement.",
        impact: -1,
        feedback: "Rejet, frustration, pas d'autonomie.",
      },
    ],
  },
  {
    id: "scenario-dechets",
    title: "Fin de vie materiel",
    context: "Objectif : recycler proprement et recuperer des pieces.",
    question: "Que faire des postes irreparables ?",
    choices: [
      {
        label: "Donner a une filiere DEEE locale + recuperer pieces reutilisables.",
        impact: 1,
        feedback: "Circularite : tu reduis les dechets et sauves des pieces.",
      },
      {
        label: "Stocker au fond de la salle serveur.",
        impact: 0,
        feedback: "Encombrement, pas de valorisation.",
      },
      {
        label: "Poubelle classique.",
        impact: -1,
        feedback: "Pollution et perte de metaux, interdit.",
      },
    ],
  },
  {
    id: "scenario-communs",
    title: "Communs et partage",
    context: "Objectif : capitaliser et partager les acquis.",
    question: "Comment documenter vos avancees NIRD ?",
    choices: [
      {
        label: "Creer un wiki libre et publier guides/scripts sous licence ouverte.",
        impact: 1,
        feedback: "Top : tu crees un commun reutilisable par d'autres etablissements.",
      },
      {
        label: "Garder un drive prive pour l'equipe.",
        impact: 0,
        feedback: "Fonctionnel mais non partageable, valeur limitee.",
      },
      {
        label: "Ne rien documenter, tout oral.",
        impact: -1,
        feedback: "Connaissance perdue, zero transmission.",
      },
    ],
  },
  {
    id: "scenario-secu",
    title: "Securite vs confort",
    context: "Objectif : securiser sans bloquer les usages.",
    question: "Les mots de passe eleves sont faibles. Que faire ?",
    choices: [
      {
        label: "Imposer passphrase simple + 2FA pour comptes sensibles.",
        impact: 1,
        feedback: "Bon equilibre : securite accessible.",
      },
      {
        label: "Garder les mots de passe actuels pour eviter les plaintes.",
        impact: 0,
        feedback: "Risques maintenus, pas d'amelioration.",
      },
      {
        label: "Exiger un changement complexe tous les mois.",
        impact: -1,
        feedback: "Complexite excessive, contournements assures.",
      },
    ],
  },
  {
    id: "scenario-tablettes",
    title: "Parc de tablettes",
    context: "Objectif : eviter l'enfermement fournisseur.",
    question: "On te propose 100 tablettes verrouillees fournisseur.",
    choices: [
      {
        label: "Exiger un OS libre/gestion MDM ouverte + reemploi des coques existantes.",
        impact: 1,
        feedback: "Tu gardes la main, tu limites l'empreinte materielle.",
      },
      {
        label: "Accepter mais limiter aux usages pedago essentiels.",
        impact: 0,
        feedback: "Usage controle, mais dependance forte.",
      },
      {
        label: "Accepter tout et installer les apps commerciales par defaut.",
        impact: -1,
        feedback: "Enfermement total et collecte de donnees.",
      },
    ],
  },
  {
    id: "scenario-ia",
    title: "IA proprietaire",
    context: "Objectif : proteger les copies et l'equite.",
    question: "Une IA payante promet de corriger les copies.",
    choices: [
      {
        label: "Tester une IA locale ou open source sur donnees anonymisees.",
        impact: 1,
        feedback: "Souverainete et respect des eleves.",
      },
      {
        label: "Essai limite avec consentement et anonymisation forte.",
        impact: 0,
        feedback: "Controle partiel, vigilance necessaire.",
      },
      {
        label: "Envoyer toutes les copies sur le cloud proprietaire.",
        impact: -1,
        feedback: "Fuite potentielle de donnees sensibles.",
      },
    ],
  },
  {
    id: "scenario-maintenance",
    title: "Maintenance du parc",
    context: "Objectif : securite et fiabilite continues.",
    question: "Les mises a jour ne sont pas faites depuis 1 an.",
    choices: [
      {
        label: "Automatiser via scripts libres + plan mensuel avec eleves/admins.",
        impact: 1,
        feedback: "Fiabilite, apprentissage, securite.",
      },
      {
        label: "Faire un gros lot tous les ans sans suivi.",
        impact: 0,
        feedback: "Mieux que rien, mais trou de securite possible.",
      },
      {
        label: "Ignorer tant que ca marche.",
        impact: -1,
        feedback: "Faille assuree et panne probable.",
      },
    ],
  },
  {
    id: "scenario-pedago",
    title: "Parents pro-GAFA",
    context: "Objectif : maintenir la ligne NIRD en expliquant.",
    question: "Des parents veulent imposer un outil Big Tech.",
    choices: [
      {
        label: "Expliquer la charte NIRD + proposer l'equivalent libre documente.",
        impact: 1,
        feedback: "Clair, argumente, tu restes coherent avec le projet.",
      },
      {
        label: "Accepter pour cette annee, transition planifiee l'an prochain.",
        impact: 0,
        feedback: "Compromis temporaire, mais attention a la reconduction.",
      },
      {
        label: "Ceder totalement sans cadre.",
        impact: -1,
        feedback: "Perte de ligne directrice et de controle.",
      },
    ],
  },
  {
    id: "scenario-resilience",
    title: "Resilience reseau",
    context: "Objectif : continuer meme sans Internet.",
    question: "Internet tombe pendant un examen pratique.",
    choices: [
      {
        label: "Basculer sur serveur local + ressources offline.",
        impact: 1,
        feedback: "Continuite d'activite, autonomie locale.",
      },
      {
        label: "Reporter l'examen.",
        impact: 0,
        feedback: "Pas d'apprentissage, mais pas de fuite de donnees.",
      },
      {
        label: "Utiliser un tethering perso pour tout le monde.",
        impact: -1,
        feedback: "Non securise, data personnelles en jeu.",
      },
    ],
  },
  {
    id: "scenario-gdpr",
    title: "Consentement et RGPD",
    context: "Objectif : respecter la vie privee des mineurs.",
    question: "Une appli demande des comptes eleves avec photo.",
    choices: [
      {
        label: "Refuser, proposer une alternative sans profil, anonymisee.",
        impact: 1,
        feedback: "Protection des mineurs et conformite.",
      },
      {
        label: "Accepter si les parents signent un formulaire.",
        impact: 0,
        feedback: "Partiel, la collecte reste lourde.",
      },
      {
        label: "Accepter d'office.",
        impact: -1,
        feedback: "Risque legal et vie privee.",
      },
    ],
  },
  {
    id: "scenario-energie2",
    title: "Serveur energivore",
    context: "Objectif : reduire la conso et la dette technique.",
    question: "Un vieux serveur consomme trop.",
    choices: [
      {
        label: "Virtualiser sur machine plus recente et sobre, couper l'ancien.",
        impact: 1,
        feedback: "Sobriete et fiabilite accrues.",
      },
      {
        label: "Le laisser tourner jusqu'a panne.",
        impact: 0,
        feedback: "Consommation inutile, risque d'arret brutal.",
      },
      {
        label: "Laisser tourner et ajouter un autre serveur sans audit.",
        impact: -1,
        feedback: "Double conso et dette technique.",
      },
    ],
  },
];

const BADGES = [
  {
    id: "badge-libre",
    label: "Defricheur Libre",
    rule: (score) => score >= 2,
  },
  {
    id: "badge-donnees",
    label: "Gardien des Donnees",
    rule: (score) => score >= 3,
  },
  {
    id: "badge-sobriete",
    label: "Champion Sobriete",
    rule: (score) => score >= 4,
  },
];

const SOLUTIONS = [
  {
    title: "Linux education",
    category: "systeme",
    impact: "Prolonge la vie des PC, maitrise des mises a jour",
    accessibility: "Interface legere, bon contraste, lecteurs d'ecran compatibles",
    resources: ["Debian Edu", "Ubuntu LTS", "PrimTux"],
    explanation: "Remplacer l'OS par une base libre stable evite l'obsolescence logicielle et les licences payantes.",
  },
  {
    title: "Reemploi & reconditionne",
    category: "materiel",
    impact: "Allonge la duree de vie de 3 ans et plus",
    accessibility: "Materiel teste, claviers contrastes, reparation locale",
    resources: ["Ateliers eleves-profs", "Fablab local"],
    explanation: "Reutiliser le materiel reduit l'empreinte carbone et cree de la valeur pedagogique par la reparation.",
  },
  {
    title: "Communs numeriques",
    category: "communaute",
    impact: "Mutualisation, documentation partagee",
    accessibility: "Guides libres, wiki collaboratif",
    resources: ["Wikis d'etablissement", "OpenStreetMap Club"],
    explanation: "Documenter et partager sous licence libre capitalise les efforts et evite de reinventer la roue.",
  },
  {
    title: "Pads collaboratifs libres",
    category: "pedagogie",
    impact: "Travail synchrone sans comptes Big Tech",
    accessibility: "A11y correcte, textes simples",
    resources: ["Etherpad", "HedgeDoc"],
    explanation: "Les pads remplacent les suites en ligne proprietaires et evitent le suivi publicitaire.",
  },
  {
    title: "Stockage souverain (Nextcloud)",
    category: "systeme",
    impact: "Donnees hebergees localement, partage maitrise",
    accessibility: "Clients multi-OS, support lecteurs d'ecran",
    resources: ["Nextcloud", "Collabora"],
    explanation: "Heberger ses fichiers garde la souverainete, permet des quotas et du chiffrement sous controle.",
  },
  {
    title: "Eco-conception web",
    category: "sobriete",
    impact: "Pages legeres, moins de bande passante",
    accessibility: "Contrastes, navigation clavier, tailles relatives",
    resources: ["RGESN", "EcoIndex", "Checklist a11y"],
    explanation: "Des pages plus sobres chargent plus vite, consomment moins et restent accessibles.",
  },
  {
    title: "Parcours de formation interne",
    category: "communaute",
    impact: "Autonomie des equipes, moins de dependance au support externe",
    accessibility: "Supports accessibles, sous-titres, transcription",
    resources: ["Ateliers mensuels", "Tutoriels video sous-titres"],
    explanation: "Former en interne diffuse la culture libre et reduit les couts recurrents.",
  },
];
