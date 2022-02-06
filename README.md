# movie-API

## About this app

#### Objective

###### To build the server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

#### Requirements

###### For this project you need to have MongoDB installed and running.

##### Using a Local MongoDB Server
###### If you don't have MongoDB installed, please click on this [link](https://www.mongodb.com/try/download/community) and follow the instructions for your Operating System.

###### After MongoDB is installed, follow the instructions on the documentation to start the server. Then run the mongo shell from a separate terminal and execute the show dbs command. If all goes well you should see a list of available databases, similar to the sample below.

###### To either create a new database or switch to a different database, type: use [database name] in your terminal. In this case the name of the database is myFlixDB.

#### Essential Features of this APP

1. Return a list of ALL movies to the user
2. Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
3. Return data about a genre (description) by name/title (e.g., “Thriller”)
4. Return data about a director (bio, birth year, death year) by name
5. Allow new users to register
6. Allow users to update their user info (username, password, email, date of birth)
7. Allow users to add a movie to their list of favorites
8. Allow users to remove a movie from their list of favorites
9. Allow existing users to deregister

## Authentication and Authorization

###### After creating an user you will have to log in with the API to be able to make resquests. When logging in the authorization token will be returned in the response. That will be the authorization token (Bearer Token) that you will have to use in every request to interact with the API.

## API ENDPOINTS 

| REQUEST                 | ENDPOINT                  | METHOD           | REQUEST BODY           | RESPONSE BODY                       |
| ----------------------- | ------------------------- |-----------       | ---------------------- | ----------------------------------- |
| Home Route              | /                         | GET              | None                   | HTML welcome message                |
| Documentation Route     | /documentation.html       | GET              | None                   | HTML documentation info             |
| Get all the movies      | /movies                   | GET              | None                   | JSON holding all the movies         |
| Get movie by title      | /movies/:title            | GET              | None                   | JSON with a movie details           |
| Get genre by name       | /movies/:name/genre       | GET              | None                   | JSON with the genre of one movie    |
| Get director by name    | /movies/:name/director    | GET              | None                   | JSON with the director of one movie |
| Register user           | /users                    | POST             | JSON with User's info  | JSON with user's details            |
| Update user's profile   | /users                    | PUT              | JSON with update info  | JSON with user's details            |
| Remove user             | /users/:username                    | DELETE           | None                   | Success Message                     |
| Add movie to favorite   | /users/:username/movies/:movieid| POST             | None                   | Success Message                     |
| Remove movie from favorite| /users/:username/movies/:movieid| DELETE           | None                   | Success Message                     |
| Get all the users       | /users                     | GET              | None                   | JSON with all the users |
| Get user by name        | /users/:username           | GET              | None                   | JSON with the user requested |


## Want to experiment with this app?
###### Clone this repository using: - git clone https://github.com/jjla26/movie-API.git and run npm install
