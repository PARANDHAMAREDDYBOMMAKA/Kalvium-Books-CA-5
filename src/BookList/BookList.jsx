/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./BookList.module.css";

const Booklist = ({ searchValue }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
        .then((response) => response.json())
        .then((data) => {
          setBooks(data.books);
        });
    };

    fetchData();
  }, []);

  const getStoredRating = (bookId) => {
    const storedRating = localStorage.getItem(`${bookId}`);
    return storedRating || giveRandomRating(bookId);
  };

  const giveRandomRating = (bookId) => {
    const randomRating = (Math.random() * (5.0 - 3.0) + 3.0).toFixed(1);
    localStorage.setItem(`${bookId}`, randomRating);
    return randomRating;
  };

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
