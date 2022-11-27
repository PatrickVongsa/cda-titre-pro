# Projet Titre Professionel Concepteur Développeur d'Application

Développement d'un CRM-ERP permettant de faire un suivi des prospects/client pour une agence web.

deploy : https://xxxxxx.xxx

---

## Technologies

### Back-end
- Node.js
- Express
- Prisma ORM
- Jest

### Front-end
- React.js
- Redux

### Infrastructure
- GitHub actions
- Docker
- VPS

---

## Démarrer le projet
1. Cloner le dépôt
2. Go to the directory
3. Install the package : 
   ```shell
   npm run install-package
   ```
4. Start dev environnement :
    - open one terminal, execute the following command :
   ```shell
   npm run dev-client
   ```
    - open one terminal, execute the following command :
    ```shell
    npm run dev-serveur
    ```
    - then go to http://localhost:3000 for client
    - then go to http://localhost:5000 for server

5. Start dev environnement :
   ```shell
   npm run prod
   ```
    - then go to http://localhost:4173 for client
    - then go to http://localhost:5000 for server
  

6. Start dev environment with Docker :
    ```shell
    docker compose -f docker-compose.dev.yml up -d
    ```
    - then go to http://localhost:3000 for client
    - then go to http://localhost:5000 for server

7. Start production environment Docker :
    ```shell
    docker compose -f docker-compose.prod.yml up -d
    ```
    - then go to http://localhost:4173 for client
    - then go to http://localhost:5000 for server

## Docker after modification
If you have made modifications and you already built a docker compose, run the following command to rebuild :
- Dev environment :
  ```shell
    docker compose -f docker-compose.dev.yml up -d --build
    ```
- Production environment :
    ```shell
    docker compose -f docker-compose.prod.yml up -d --build
    ```

---

## API routes

---

## Tests server

1. Drop your local database
2. Create a new one
3. Go to "server" directory
    ```shell
    cd server/
    ```
4. Run the command
    ```shell
    npx prisma db push
    ```
5. Run the test
    ```shell
    npm run test
    ```
