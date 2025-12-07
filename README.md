1.npm i react-routes 

2.npm install react-router-dom

3.npm install tailwindcss @tailwindcss/vite

4.Header / Footer created.

npm install axios

+++

To start the song shop:

1.Start React project: npm run dev

2.Backend Login/Register APIs start in folder /user-login-api/npm start  ---> port 5000

Example:

user-login-api>npm start

> user-login-api@1.0.0 start
> node server.js

✔ Loaded API route from login.js
✔ Loaded API route from register.js
✔ Loaded API route from updateuser.js
✔ Loaded API route from users.js

3.Backend song APIs start in folder /deezer-api-server/npm start ---> port 4000

Example:

deezer-api-server>npm start

> deezer-api-server@1.0.0 start
> node server.js

✔ Loaded route: deezer.js
✔ Loaded route: deezerartists.js
✔ Loaded route: jamendo.js
✔ Loaded route: jamendoartists.js


Project create actions:

Part 1

External free API was collected locally and put in MongoDB from https://api.deezer.com/artist/85/top?limit=50. 
To start local transferred API: 
cd deezer-api-server
node server.js

Part 2

UI colors were modified.

Part 3

Songs button was connected with React components to API.

Part 4 

A new feature button was created "New Artist" where by specifying the ID new list with songs will pop up.

Part 5

Login and register was fixed.
user-login-api folder contains registerin and loginin APIs with mongodb.

Part 6 Requrement done [App.tsx]: Implement client-side routing to at least 5 pages (at least 2 with parameters)

<Route path="/songs/:artistId" element={<ThemeBoard />} />
<Route path="/songs2/:artistId" element={<ThemeBoard2 />} />


