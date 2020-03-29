# Plexideas Chat

This is my pet-project - simple chat with firebase integration. Tech stack: React, Route, Firebase, Firebase auth (email+pass and google).

## Usage

To run this project you need:

```sh
$ yarn inastall
```

change config in ./src/services/firebase.js

```js
...

const config = {
  apiKey: "YOUR FIREBASE CREDENTIAL",
  authDomain: "YOUR FIREBASE CREDENTIAL",
  databaseURL: "YOUR FIREBASE CREDENTIAL"
};
...
```

then need run: (for dev)
```sh
yarn start 
```

## License

[MIT](LICENSE) © Sergei Sakharobskii
