# PixelPerfect – Site vitrine (Astro)

Bienvenue sur **PixelPerfect** , le site vitrine d'une agence web fictive, développé dans le but de découvrir
et maîtriser Astro, un framework moderne pensé pour des sites ultra-performants, accessibles, et bien
structurés.

**Site en ligne** : https://pixelperfectastro.netlify.app/

## Objectifs du projet

Ce projet a été conçu pour :

```
Apprendre à utiliser Astro de manière concrète
Construire une architecture claire et réutilisable
Explorer les performances natives d’Astro grâce à l’optimisation du rendu statique
Suivre les bonnes pratiques d’accessibilité
Mettre en place un design responsive pour tous les supports
```
## Fonctionnalités et structure

### Composants réutilisables

Le projet utilise une approche modulaire, avec des composants Astro personnalisés (et potentiellement
des composants React ou autres à l’avenir). Cela permet :

```
Une meilleure organisation du code
Une réutilisabilité sur plusieurs pages
Une maintenabilité facilitée
```
### ⚡ Performance et accessibilité

Grâce à Astro : - Seuls les fichiers HTML, CSS et JavaScript nécessaires sont envoyés au client - Le site est
**rapide à charger** , même sur mobile - L’accessibilité est **prise en compte dès la conception**

## Structure du projet

#### /

```
├── public/ # Contenu statique (images, favicons...)
├── src/
│ ├── components/ # Composants Astro
│ └── pages/ # Pages du site (routées automatiquement)
```
#### • • • • • • • • 1


```
│ └── index.astro # Page d’accueil
├── package.json
└── astro.config.mjs
```
## ▶ Lancer le projet en local

```
Cloner le dépôt :
```
```
gitclone https://github.com/votre-utilisateur/pixelperfect.git
cd pixelperfect
```
```
Installer les dépendances :
```
```
npminstall
```
```
Démarrer le serveur de développement :
```
```
npmrun astrodev
```
Accède ensuite à [http://localhost:](http://localhost:)

## 📦 Scripts disponibles

```
Commande Description
npm install Installe les dépendances
```
```
npm run astro dev Démarre le serveur de dev sur localhost:
```
```
npm run build Génère le site statique dans ./dist/
```
```
npm run preview Prévisualise le build localement
```
```
npm run astro ... Exécute une commande CLI Astro
```
## 📚 Ressources utiles

```
Documentation officielle Astro
Communauté Discord Astro
```
**Ce projet est un bac à sable d'apprentissage** pour tester, progresser et construire avec Astro, en
mettant en avant des bonnes pratiques de développement moderne.