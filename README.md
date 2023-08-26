## React Typescript Webshop

Simple React webshop with fix product categories

## Features

- On the Home page products can be listed by category
- Products can be a added to shopping cart
- An order can be placed on the shopping cart page
- There is a user account page where customer names and delivery addresses can be given
- The given customer names and delivery addresses can be used from an autocompleter on the checkout page
- The orders of the current user can be listed and viewed

### Admin features

- All orders can be listed, viewed and their status can be changed
- All products can be listed and edited
- New products can be added
- For admin features the login credentials: 
    - admin@admin.hu
    - admin1234

## Demo

You can test the running application on this [demo](https://react-webshop-30l0.onrender.com) link.(It may take a few minutes to start...)

## Tech-stack:

- [React](https://legacy.reactjs.org/) - A JavaScript library for building user interfaces
- [Material UI](https://mui.com/) - Material UI is a library of React UI components
- [NodeJs Express](https://expressjs.com/) - Minimalist web framework for Node.js
- [MongoDb Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js

## Installation

Requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies.
Open your favorite Terminal and run these commands.

### Backend

```sh
cd be
npm i
npm run dev
```

### Frontend

```sh
cd fe
npm i
npm run start
```

You should see the running application by navigating to

```sh
127.0.0.1:3000
```

in your preferred browser

## License

MIT
