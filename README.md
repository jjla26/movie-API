# movie-API

###### This API contains information about movies created by users

## API ENDPOINTS 

| REQUEST                 | ENDPOINT                  | METHOD           | REQUEST BODY           | RESPONSE BODY                       |
| ----------------------- | ------------------------- |-----------       | ---------------------- | ----------------------------------- |
| Home Route              | /                         | GET              | None                   | HTML welcome message                |
| Documentation Route     | /documentation.html       | GET              | None                   | HTML documentation info             |
| Get all the movies      | /movies                   | GET              | None                   | JSON holding all the movies         |
| Get movie by title      | /movies/:title            | GET              | None                   | JSON with a movie details           |
| Get genre of movie      | /movies/:title/genre      | GET              | None                   | JSON with the genre of one movie    |
| Get director of movie   | /movies/:title/director   | GET              | None                   | JSON with the director of one movie |
| Register user           | /users                    | POST             | JSON with User's info  | JSON with user's details            |
| Update user's profile   | /users                    | PUT              | Json with update info  | JSON with user's details            |
| Remove user             | /users                    | DELETE           | None                   | Success Message                     |
| Add movie to favorite   | /users/:id/movies/:movieid| POST             | None                   | Success Message                     |
| Remove movie of favorite| /users/:id/movies/:movieid| DELETE           | None                   | Success Message                     |

## Want to experiment with this app?
###### Clone this repository using: - git clone https://github.com/jjla26/Pokedex.git

## About this app

#### Objective

###### To build the server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

#### Essential Features

1. Return a list of ALL movies to the user
2. Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
3. Return data about a genre (description) by name/title (e.g., “Thriller”)
4. Return data about a director (bio, birth year, death year) by name
5. Allow new users to register
6. Allow users to update their user info (username, password, email, date of birth)
7. Allow users to add a movie to their list of favorites
8. Allow users to remove a movie from their list of favorites
9. Allow existing users to deregister
