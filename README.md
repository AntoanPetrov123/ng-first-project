# Angular Project Instacar - Antoan Petrov

This is a small website where people can share different posts, edit them and like other users` posts.
Using Angular for front-end, Firebase for backend, Bootstrap for UI

# Info and functionalities:

## Components:

- Authentication module - contains Login, Register and Profile components
- Core module - contains Header and Footer components; Guards and Interfaces; Cars and User service
- Feature - contains:
    - Cars Module - with cars-detail-page, cars-new-page, catalog and catalog components; cars-routing-module;
    - Pages Module - with home-page and page-not-found components
- Assets - images for website UI

## Permissions

### Guests:

Can see all post of users but can not like them and check their details.

They can login or register.

### Logged-in/Rigistered Users:

Can post a photo, then edit it.

Can like every post, see details as well.

Have access to thei profiles where are their posts;


## Paths:

- POST - Signing up - /register - ('username', 'email', 'password', 'rePassword') - Guests
- POST - Signing in - /login - ('email', 'password') - Guests
- POST - Logging out - /logout -  - Logged in users
- GET - Get all posts - /catalog - - Guests and Users
- POST - Share new post - /catalog/new - 'carName', 'image', 'description' - Logged in users
- GET - See post details - /catalog/:carId - - Logged in users
- PUT - Edit own posts details - /catalog/:carId - 'carName', 'image', 'description' - Logged in users (owner of post)
- PUT - Like a post - /catalog - Logged in users (can Like all posts once)
- GET - User profile - /profile - Logged in users (owner of profile)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
© 2022 GitHub, Inc.