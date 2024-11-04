// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import Toast from "../components/Toast";
const HomePage = ({ bookmarks, setBookmarks }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const apiKey = "5391343148960f0d40e995a08483ca5c";

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, [apiKey]);

  const handleAddBookmark = (movie) => {
    const isBookmarked = bookmarks.some((b) => b.id === movie.id);
  
    if (!isBookmarked) {
      const updatedBookmarks = [...bookmarks, movie];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setToastMessage("Movie added to bookmarks!");
      return true; // Movie was added
    } else {
      setToastMessage("This movie is already bookmarked!"); 
      return false; // Movie was already bookmarked
    }
  };

  const closeToast = () => setToastMessage("");

  return (
    <div>
      <h1>Trending Movies</h1>
      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
      <div className="movie-list">
        {trendingMovies.length > 0 ? (
          trendingMovies.map((movie) => {
            const isBookmarked = bookmarks.some((b) => b.id === movie.id);
            return (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <button
                  className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
                  onClick={() => handleAddBookmark(movie)}
                >
                  ★
                </button>
              </div>
            );
          })
        ) : (
          <p>No trending movies available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
