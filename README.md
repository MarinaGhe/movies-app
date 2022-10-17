# Movies App

A small web app that uses the [TMDB API](https://awesomeopensource.com/project/elangosundar/awesome-README-templates) to display a list of movie categories and the items belonging to each category.

Navigation is done through tabs and each tab corresponds to a category. The items are displayed as cards inside a grid system. Among the functionalities you cand find real time search, infinite loading and add/remove items to a certain category.

## Buit with

- [React](https://beta.reactjs.org/) and custom components for the UI
- [SASS](https://sass-lang.com/documentation/) for styling

## Getting Started

To get a local copy up and running follow the next steps.

####

## Prerequisites

You should make sure you have `npm >= v8.11.0` and `node >= v16.15.1` installed on your machine by typing the commands bellow inside a terminal.
If you don't see any output you can follow the steps decribed [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the packages.

```bash
  npm -v
  node -v
```

## Run Locally

Once you made sure you have `npm` installed you can continue with the following.

Navigate to a folder of your choice

```bash
  cd my-folder-name
```

Clone the repo

```bash
  git clone https://github.com/MarinaGhe/movies-app.git
```

Go to the project directory

```bash
  cd movies-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

The project should run on `http://localhost:3000/`

## Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file which you should create in the root of the project. These are already generated keys for implementation and testing purposes. You can use these or you can replace them by generating your own keys as described in the TMDB API [documentation](https://developers.themoviedb.org/3/getting-started/introduction).

`REACT_APP_TMDB_API_KEY=61018ae91ee58ed4c9ea8a1ec8dc473c`

`REACT_APP_BASE_URL=https://api.themoviedb.org/3`

`REACT_APP_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500`

`REACT_APP_TMDB_SESSION_ID=c380cdfc103579bf5dfafe43a2ba99fc22b0628d`

`REACT_APP_TMDB_ACCOUNT_ID=15175279`

[back to top](#movies-app)
