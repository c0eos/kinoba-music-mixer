# Exercice pour Kinoba - Music Mixer

## Démarrage

Avec Docker :

- `docker-compose up --build`
- télécharge postgres et construit backend + frontend
- initialise la bdd

## Objectifs

- [x] L’utilisateur doit pouvoir drag and drop une musique sur une des deux platines. Une fois la musique mise sur une platine, cela déclenche sa lecture et une animation de rotation de la platine
- [x] L’utilisateur doit pouvoir sélectionner au clic sur une musique, via un menu déroulant, la platine sur laquelle déclencher la musique
- [x] L’utilisateur doit pouvoir ajouter des musiques à la liste d’écoute de la platine de gauche et de droite
- [x] L’utilisateur doit pouvoir supprimer des musiques de ses listes d’écoute
- [x] Au clic sur play, la platine de gauche lit une musique, puis celle de droite, puis celle de gauche, etc... en suivant l’ordre des playlists
- [x] Possibilité de rechercher une musique par nom/artiste (Spotify)

## Technologies

- Backend : API Ruby on Rails
- Frontend : Vue3 + Vite + Tailwindcss
- DB : Postgres
- Docker
