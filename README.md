# Movie Lobby CRUD API

This API allows users to perform CRUD (Create, Read, Update, Delete and search) operations on movies in a movie lobby. It is built using Node.js, Express, and TypeScript.

## Installation

To use this API, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Praveenkodadala/movie_lobby_CRUD.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Endpoints

### List all Movies
- **GET /api/movies**

### Search for a Movie
- **GET /api/movies/search?q={query}**
  - Replace `{query}` with your search query for title or genre.

### Add a Movie
- **POST /api/movies**
  - Requires "admin" role in the header.
  - Request Body:
    ```json
    {
        "title": "Sample Movie3",
        "rating": 6,
        "genres": ["65ec4e01198f2f79fcf13736", "65ec4dff198f2f79fcf13716", "65ec4dff198f2f79fcf13714"],
        "streamingLink": "https://www.youtube.com/watch?v=yAoLSRbwxL8"
    }
    ```

### Update a Movie
- **PUT /api/movies/:id**
  - Requires "admin" role in the header(role -> admin).
  - Replace `:id` with the ID of the movie to be updated.
  - Request Body:
    ```json
    {
        "title": "Sample Movie Edited",
        "rating": 10,
        "genres": ["65ec4e01198f2f79fcf13736", "65ec4dff198f2f79fcf13714"],
        "streamingLink": "https://www.youtube.com/watch?v=yAoLSRbwxL8"
    }
    ```

### Delete a Movie
- **DELETE /api/movies/:id**
  - Requires "admin" role in the header(role -> admin).
  - Replace `:id` with the ID of the movie to be deleted.

### Get Genres (Master Data)
- **GET /api/movies/getGenres**

## Usage

- Ensure you have the appropriate permissions to perform admin actions.
- Include the "admin" role in the header for POST, PUT, and DELETE requests.

## Postman Collection

- Download the Postman collection file [here](https://asset.cloudinary.com/moxiedb/e23978243097f94ea79bc3d0b2aad72e)
- Import the collection into Postman for easy API testing.



