// src/components/MovieItem.js
import React from "react";
import "./MovieItem.css";

const MovieItem = ({ movie, handleBookmark, isBookmarked }) => {
  return (
    <div className="movie-item">
      <h3>{movie.title}</h3>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      {handleBookmark && (
        <button
          className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
          onClick={() => handleBookmark(movie)}
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      )}
    </div>
  );
};

export default MovieItem;
