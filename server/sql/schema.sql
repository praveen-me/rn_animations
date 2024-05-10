-- Create the 'movies' table
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  poster TEXT NOT NULL
);

-- Create the 'comments' table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER NOT NULL,
  comment TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_movie
    FOREIGN KEY(movie_id) 
    REFERENCES movies(id)
    ON DELETE CASCADE
);

-- Create an index on the 'movie_id' column in the 'comments' table
CREATE INDEX idx_comments_movie_id ON comments (movie_id);
