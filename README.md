# Car-Sales-API

## This is an application built with express.js, node.js, and MongoDB, for posting cars. The app provides authenticated and unauthenticated users with a list of car postings. To post, update and delete a car, the user needs to signup or log in. All other actions can be done without being authenticated.

## Built With

- Node
- Express
- MongoDB
- Mongoose

## Live version

### [Live Version](https://buy-cars.herokuapp.com/api/v1/cars)

## Getting Started

To get a local copy up and running follow these simple example steps.
On your terminal, run

```
 git clone git@github.com:Godswilly/Car-Sales-API.git

```

### Setup

Install dependencies with:

```
npm install
```

### Usage

Start server with:

```
    npm run dev
```

Open `http://localhost:8000/api/v1/cars` in your browser.

cd /Car-Sales-API

```
- Set required credential in `config.env`
```

install node packages

```
npm install
```

Run server

```
npm run start // prod mode
npm run dev // dev mode
```

### Implemented endpoints:

#### /auth

| Path                | Method | Description |
| ------------------- | ------ | ----------- |
| api/v1/users/login  | POST   | Login       |
| api/v1/users/signup | POST   | Signup      |

#### /users

| Path             | Method | Description      |
| ---------------- | ------ | ---------------- |
| api/v1/users     | GET    | List All Users   |
| api/v1/users/:id | GET    | Get A User By Id |
| api/v1/users     | PATCH  | Update A User    |
| api/v1/users/:id | DELETE | Delete A User    |

#### /cars

| Path                | Method | Description                                |
| ------------------- | ------ | ------------------------------------------ |
| api/v1/posts        | GET |List All Ca                              |
| api/v1/posts        | POST   | Create A Car                               |
| api/v1/posts/:id    | GET    | Get A Car By Id                            |
| api/v1/posts/:id    | PATCH  | Update A Car                               |
| api/v1/posts/:id    | DELETE | Delete A Car                               |
| api/v1/posts/myCars | GET    | List All Cars Posted By The Logged In User |

## Authors

👨‍💻 **Kalu Agu Kalu**

- Github: [Godswilly](https://github.com/Godswilly)
- Twitter: [@KaluAguKalu17](https://twitter.com/KaluAguKalu17)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/kaluagukalu/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Godswilly/Car-Sales-API/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgements

## 📝 License

This project is [MIT](https://github.com/stevenvachon/broken-link-checker/blob/main/license) licensed.
