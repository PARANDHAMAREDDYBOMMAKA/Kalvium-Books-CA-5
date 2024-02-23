/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./BookList.module.css";

const Booklist = ({ searchValue }) => {
  // State to manage the list of books
  const [books, setBooks] = useState([]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch book data from a remote API
    const fetchData = () => {
      fetch("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
        .then((response) => response.json())
        .then((data) => {
          // Updating the state with the fetched book data
          setBooks(data.books);
        });
    };

    // Calling the fetchData function when the component mounts
    fetchData();
  }, []);

  // Function to get the stored rating for a book from localStorage
  const getStoredRating = (bookId) => {
    // Retrieving the stored rating from localStorage
    const storedRating = localStorage.getItem(`${bookId}`);
    return storedRating || giveRandomRating(bookId);
  };

  // Function to generate a random rating for a book and storing it in localStorage
  const giveRandomRating = (bookId) => {
    // Generating a random rating between 3.0 and 5.0, storing it, and returning it
    const randomRating = (Math.random() * (5.0 - 3.0) + 3.0).toFixed(1);
    localStorage.setItem(`${bookId}`, randomRating);
    return randomRating;
  };

  // Filtering books based on the search value entered by the user in the search bar
  const filterBooksBySearch = books.filter((book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={styles["mainContainer"]}>
      {filterBooksBySearch.map((data) => (
        <div key={data.id} className={styles["imageContainer"]}>
          <img src={data.imageLinks.thumbnail} alt={data.title} />
          <h5>{data.title}</h5>
          <div className={styles["dataContainer"]}>
            <p>{getStoredRating(data.id)}★</p>
            <p>FREE</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Booklist;
