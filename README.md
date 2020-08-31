## Badges

[![Build Status](https://travis-ci.org/Ally4/backend-portfolio.svg?branch=develop)](https://travis-ci.org/Ally4/backend-portfolio) , [![Coverage Status](https://coveralls.io/repos/github/Ally4/backend-portfolio/badge.svg?branch=develop)](https://coveralls.io/github/Ally4/backend-portfolio?branch=develop) , [![Maintainability](https://api.codeclimate.com/v1/badges/0a49fb5bf99b028aeaf7/maintainability)](https://codeclimate.com/github/Ally4/backend-portfolio/maintainability) , [![Test Coverage](https://api.codeclimate.com/v1/badges/0a49fb5bf99b028aeaf7/test_coverage)](https://codeclimate.com/github/Ally4/backend-portfolio/test_coverage)

## Features

- All normal users get the landing page
- The owner is the only one to signin
- The owner is the only one to post a blog
- The owner is the one to edit the blog post by id
- The owner is the one to delete the blog post by id
- The owner is the only one to get the queries
- The owner is the only one to get the query by id
- The owner is the only one to delete the query by id
- All normal users can get all the blog post
- All normal users can get a blog post by id
- All normal users can sent a query



#### Accessing the hosted environment

- [The heroku hosting](https://allyportfolio.herokuapp.com)

#### Api Documentation

- [Swagger hosting](https://allyportfolio.herokuapp.com/documentation)


## Development tools

 - NodeJs
 - Express JS
 - Mocha
 - Chai
 - Babel
 - Mongodb, Mongoose
 - JsonWebToken

  
### Endpoints and their caracteristics

| VERBS  | ENDPOINTS                        | STATUS   | ACCESS                  | DESCRIPTION                       |
|--------|----------------------------------|----------|-------------------------|-----------------------------------|
| GET    | /                                |  200 OK  | EVERYONE                | Welcome message                   |
| GET    | /posts                           |  200 OK  | EVERYONE                | Getting all blog posts            |
| GET    | /posts/:id                       |  200 OK  | EVERYONE                | Getting all blog posts            |
| GET    | /queries                         |  200 OK  | OWNER                   | Getting all queries               |
| GET    | /queries/:id                     |  200 OK  | OWNER                   | Getting a query by id             |
| POST   | /queries                         |  200 OK  | EVERYONE                | Creating a query                  |
| POST   | /auth/login                      |  200 OK  | OWNER                   | Signin of the owner               |
| POST   | /posts                           |  201 OK  | OWNER                   | Creating a blog post              |
| PATCH  | /posts/:id                       |  200 OK  | OWNER                   | Editing a blog post by id         |
| DELETE | /posts/:id                       |  200 OK  | OWNER                   | Deleting a blog post by id        |
| DELETE | /queries/:id                     |  200 OK  | OWNER                   | Deleting a query by id            |

### Other Tools

Other tools and technologies used in development of this application are;
- Hoster: [Heroku](http://heroku.com).
- Compiler: [Babel](https://babeljs.io/).
- Integrate: [TravisCI](https://travis-ci.org/github/Ally4/backend-portfolio).
- Integrate: [Coveralls](https://coveralls.io/github/Ally4/backend-portfolio).
- Documentation: [Swagger](https://swagger.io/).
- API checking environment: [Postman](https://www.getpostman.com).
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/).
- RunTime environment: [NodeJS](https://nodejs.org/en/).
- Framework: [ExpressJS](http://expressjs.com/).
- Text Editor: [VSCode](https://code.visualstudio.com).

### Getting Started

1. Follow the instruction to start the project

- Clone this project on your machine , by running this command on in your command line or Terminal:
 ```
git clone https://github.com/Ally4/backend-portfolio.git
 ```
 - Install the required dependencies found in package.json by running this command:
 ```
npm install
 ```
 - And then to start running  this project on your computer , run :
 ```
npm run dev
 ```

 - Check the endpoint in postman on  :
 ```
http://localhost:4000
 ```
 - See the test, run command:
 ```
npm test
```

### Getting Started online

 - Starting with swagger:
 
 [Swagger](https://allyportfolio.herokuapp.com/documentation/#/). 


#### Made with :heart: by Ally

