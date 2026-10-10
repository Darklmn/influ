# Trading Evolution — « Le Footprint dans l'Order Flow » (vidéo arabe 9:16)

Vidéo motion-design de ~42 s pour TikTok / Instagram Reels (1080×1920, 30 fps).
Construite avec **Remotion 4** + **Three.js** (`@remotion/three`, React Three Fiber).
Voix off en arabe générée avec ElevenLabs v4, musique et SFX synthétisés sur mesure (libres de droits).

## Script voix off (arabe, MSA) — 41,5 s

| # | Temps | Voix off | Visuel |
|---|-------|----------|--------|
| 1 | 0.00 – 4.06 | هل تتداول بالشموع فقط؟ إذن أنت ترى نصفَ الحقيقة! | Graphique 3D de bougies qui poussent → écran coupé en deux, « 50% » + « ؟ » |
| 2 | 4.06 – 8.72 | الشمعة تُخبرك أين تحرّك السعر… لكنها لا تُخبرك مَن حرّكه. | Bougie qui se forme en direct (O/H/L/C), puis « ؟ » + « مشترون؟ / بائعون؟ » |
| 3 | 8.72 – 12.67 | وهنا يأتي دورُ الفوت برينت، أقوى أدوات الأوردر فلو. | Titre « الفوت برينت / FOOTPRINT », badge ORDER FLOW, bougie 3D en rotation |
| 4 | 12.67 – 18.16 | الفوت برينت يفتح الشمعة من الداخل، ويُظهر حجمَ التداول عند كل مستوى سعري. | La bougie 3D s'ouvre en 10 niveaux de prix → échelle footprint, volumes ligne par ligne |
| 5 | 18.16 – 23.08 | على اليسار: البائعون عند البِيد. وعلى اليمين: المشترون عند الآسك. | Colonne BID (vendeurs) puis ASK (acheteurs) mises en avant |
| 6 | 23.08 – 29.79 | وعندما يتفوّق طرفٌ على الآخر بقوة، يظهر الإمبالانس… وغالبًا ما يكشف دخولَ الأموال الكبيرة. | Comparaison diagonale 412 ÷ 88 = ×4.7 → IMBALANCE, 3 imbalances empilés, carte « الأموال الكبيرة » |
| 7 | 29.79 – 35.00 | أمّا الدلتا، فهي الفرق بين الشراء والبيع، لتعرف مَن يسيطر فعلًا على السوق. | Δ : ASK 2,170 − BID 1,073 = +1,097, histogramme delta, « المشترون يسيطرون » |
| 8 | 35.00 – 42.50 | توقّف عن التخمين، واقرأ السوق كالمحترفين. احصل على أدواتك المجانية الآن من تريدينغ إيفولوشن دوت سايت. | Tampon « توقّف عن التخمين », récap ✓, logo 3D, « أدوات مجانية », barre URL tradingevolution.site |

Traduction FR : *Tu trades seulement avec les bougies ? Alors tu ne vois que la moitié de la vérité ! La bougie te dit où le prix a bougé… mais pas qui l'a fait bouger. C'est là qu'intervient le footprint, l'outil le plus puissant de l'order flow. Le footprint ouvre la bougie de l'intérieur et montre le volume échangé à chaque niveau de prix. À gauche : les vendeurs au bid. À droite : les acheteurs à l'ask. Quand un camp domine fortement l'autre, un imbalance apparaît… et révèle souvent l'entrée des gros capitaux. Le delta, c'est la différence entre achats et ventes, pour savoir qui contrôle vraiment le marché. Arrête de deviner, lis le marché comme les pros. Récupère tes outils gratuits maintenant sur tradingevolution.site.*

Les données du footprint sont cohérentes : imbalance diagonal Ask(P) / Bid(P − 1 tick) ≥ 300 %, Σ Ask − Σ Bid = Delta (voir `src/data.ts`).

## Identité visuelle

- Fond blanc, écriture bleue, design 3 couleurs exactement comme le logo : bleu `#0154FD`, noir `#030302`, blanc (couleurs échantillonnées sur le logo).
- Logo vectorisé depuis le fichier officiel (`scripts/vectorize_logo.py` → `src/logoPaths.ts`) : présent pendant toute la vidéo (en haut, zone sûre TikTok/Reels), puis en 3D extrudé (Three.js) au call-to-action.
- Transition signature : les 3 barres inclinées du « E » (noir / bleu / noir) balaient l'écran.
- Sous-titres arabes mot à mot synchronisés sur la voix ; les mots clés passent en noir avec le « swoosh » bleu du logo.

## Synchronisation

- `src/timeline.ts` : timestamps de chaque mot de la voix off (faster-whisper large-v3 + carte des silences `scripts/vo_chunks.json`).
- `src/sfxCues.json` : chaque son (whoosh, pop, impact, tick, ding…) est placé sur l'animation correspondante ; partagé par les scènes et par `scripts/make_music.py`.
- Musique : 114,47 BPM, calée pour que les mesures tombent pile sur « يفتح الشمعة » (12,67 s), le drop « احصل على أدواتك » (37,83 s) et l'URL (39,93 s). Effet « tape-stop » sur « توقّف ». Ducking automatique sous la voix.

## Rendu

```bash
npm install
export REMOTION_BROWSER=/chemin/vers/chrome-headless-shell   # optionnel
npx remotion studio src/index.ts                               # prévisualisation
# avec la voix off : placer public/vo.wav (41,48 s, voir ci-dessous) puis
npx remotion render src/index.ts FootprintAR out/footprint_ar.mp4 --props='{"withVO":true}' --gl=swangle
```

### Voix off

Générée sur Higgsfield (ElevenLabs v4, voix « Marcus », job `ca5a62f2-26c1-49f9-b72d-6f43c9c0608e`), puis :
accélérée ×1,30 (rubberband, hauteur conservée) et pauses resserrées (0,08 s dans une phrase, 0,20 s entre phrases)
→ `vo.wav` de 41,48 s, exactement la timeline de `src/timeline.ts`.

`scripts/mix_final.py` mixe la vidéo (musique + SFX) avec la voix et normalise à −14 LUFS (standard TikTok/Instagram).

## Fichiers

```
src/Main.tsx                 composition (calques, audio)
src/scenes/*                 8 scènes
src/components/three/*       Three.js : bougies 3D, bougie qui s'ouvre, logo 3D extrudé
src/components/*             logo SVG animé, sous-titres, transition, fond, icônes
scripts/make_music.py        musique + SFX procéduraux → public/music_sfx.wav
scripts/vectorize_logo.py    vectorisation du logo
scripts/stills.mjs           images de contrôle
```
