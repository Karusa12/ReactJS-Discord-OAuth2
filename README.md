# ReactJS-Discord-OAuth2
**[EN]**
The ReactJS-Discord-OAuth2 project aims to provide tracking of useful information from a Discord server. Real-time statistics on sent messages, voice presence duration, as well as member verification upon server entry through Discord OAuth2. The project is not finished yet but will be updated in the future!

**[FR]**
Le projet ReactJS-Discord-OAuth2 vise à offrir le suivi des informations utiles d'un serveur Discord. Des statistiques en temps réel sur les messages envoyés, la durée de présence vocale, ainsi que la vérification des membres lors de leur entrée sur le serveur via Discord OAuth2. Le projet n'est pas encore terminé mais sera mis à jour dans le futur !

**This project has been created by and for a French-speaking community. Don't be surprised if certain elements are written in French!**

## 📂| Installation
 
 - 1 Cloner le dépôt
```
git clone https://github.com/Karusa12/ReactJS-Discord-OAuth2.git
```
- 2 Installer les dépendances
```cd ReactJS-Discord-OAuth2
npm install
```
- 3 Lancer le server 
```
npm start
```

## 🔧| Configuration 

- 1 Configuration des ports
Pour configurer les ports, allez dans `package.json` et modifiez...
````json
"scripts": {
//modifiez le port juste en dessous PORT=3500
"start": "PORT=3500 react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"
},
````

- 2 Redirection
Sur le portail des développeurs, vous devrez créer 2 redirections :  
````
http://localhost:3500/callback
http://localhost:3500/redirection
3500 sera en fonction de la configuration de port que vous aurez définie
````

- 3 Url
Pour la génération d'URL, vous devrez sélectionner les URLs que vous aurez définies :
````
identify guilds email guilds.join guilds.members.read
````

## 🗂️| Backend 

Le site aura besoin d'un backend pour traiter des informations avec le token de votre bot ou la connexion du membre avec le client secret de votre OAuth2.

```js
const  express  =  require('express');
const  cors  =  require('cors');
const  mongoose  =  require('mongoose');
const  dotenv  =  require('dotenv');
const  bodyParser  =  require('body-parser');
const  callbackRouter  =  require('./Routes/callbackserver');
const  download  =  require('./Routes/download');
const  stats  =  require('./Routes/stats');
const  redirection  =  require('./Routes/redirection');
const  livingroom  =  require('./Routes/redirection');

dotenv.config();

const  app  =  express();
const  PORT  =  3600;

app.use(cors({
origin:  'http://localhost:3500', // Autoriser les requêtes depuis cette origine
methods: ['GET', 'POST'],
allowedHeaders: ['Content-Type', 'Authorization'],
exposedHeaders: ['Access-Control-Allow-Origin'],
}));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO, { useNewUrlParser:  true, useUnifiedTopology:  true})
.then(() =>  console.log('Connexion à MongoDB réussie !'))
.catch(() =>  console.log('Connexion à MongoDB échouée !'));
 
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());

app.use('/callback', callbackRouter);
app.use('/download', download);
app.use('/stats', stats);
app.use('/redirection', redirection);
app.use('/livingroom', livingroom);

app.listen(PORT, () => {
console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
```

*_Pour obtenir l'intégralité du backend, vous pouvez souscrire à mon Patreon afin de soutenir mon travail !_*
*_Vous trouverez toutes les informations sur le Patreon [https://www.patreon.com/LivingRoomFR]() !_*




