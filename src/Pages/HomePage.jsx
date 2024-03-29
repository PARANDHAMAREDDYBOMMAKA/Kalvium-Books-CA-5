/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import { Link, useLocation } from "react-router-dom";
import Booklist from "../BookList/BookList";

const HomePage = () => {
  // State to manage the search input value and user name
  const [searchValue, setSearchValue] = useState("");
  const [userName, setUserName] = useState("");

  // useLocation hook to get the current location object from React Router
  const location = useLocation();

  // useEffect hook to set the user name when provided in the location stateƒ
  useEffect(() => {
    if (location.state && location.state.userName) {
      setUserName(location.state.userName);
    }
  }, [location.state]);

  // Function to handle changes in the search input value
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <div className={styles["logoContainer"]}>
        <img
          src="https://kalvium.community/images/sidebar-3d-logo.svg"
          alt="kalvium-logo"
        ></img>
        <h2>Kalvium Books</h2>
      </div>
      <div className={styles["mainContainer"]}>
        <div className={styles["searchContainer"]}>
          <input
            className={styles["inputContainer"]}
            type="text"
            placeholder="Search for book"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {userName ? (
            <p className={styles["userName"]}>{userName}</p>
          ) : (
            <Link to="/register" style={{ textDecoration: "None" }}>
              <button className={styles["btnContainer"]}>Register</button>
            </Link>
          )}
        </div>
      </div>
      <Booklist searchValue={searchValue} />
    </>
  );
};

export default HomePage;
