// src/pages/SearchPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Toast from "../components/Toast";

const SearchPage = ({ bookmarks, setBookmarks }) => {
  const [movies, setMovies] = useState([]);
  const [toastMessage, setToastMessage] = useState(""); 
  const query = new URLSearchParams(useLocation().search).get("q");
  const apiKey = "5391343148960f0d40e995a08483ca5c"; // Your TMDb API key

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
          );
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
    };

    fetchMovies();
  }, [query, apiKey]);

  const handleAddBookmark = (movie) => {
    // Check if the movie is already in bookmarks
    const isBookmarked = bookmarks.some((b) => b.id === movie.id);
  
    if (!isBookmarked) {
      const updatedBookmarks = [...bookmarks, movie];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks)); // Save to localStorage
      setToastMessage("Movie added to bookmarks!");
    } else {
      setToastMessage("This movie is already bookmarked!"); 
    }
  };
  
  const closeToast = () => setToastMessage("");
  
  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>
              <button onClick={() => handleAddBookmark(movie)}>Add to Bookmark</button>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
