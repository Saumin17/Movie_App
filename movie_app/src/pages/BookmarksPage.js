// src/pages/BookmarksPage.js
import React, { useEffect, useState } from "react";
import MovieItem from "../components/MovieItem";
import Toast from "../components/Toast"; // Import the Toast component

const BookmarksPage = ({ bookmarks, setBookmarks }) => {
  const [toastMessage, setToastMessage] = useState("");

  const handleRemoveBookmark = (movie) => {
    const updatedBookmarks = bookmarks.filter((b) => b.id !== movie.id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setToastMessage("Bookmark removed successfully!"); // Set toast message
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, [setBookmarks]);

  const closeToast = () => setToastMessage(""); // Function to close the toast

  return (
    <div>
      <h1>Bookmarked Movies</h1>

      {/* Display Toast if there's a toast message */}
      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}

      <div className="movie-list">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="movie-card">
              <MovieItem
                movie={bookmark}
                handleBookmark={handleRemoveBookmark}
                isBookmarked={true}
                className="movie-item"
              />
            </div>
          ))
        ) : (
          <p>No bookmarks added yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
