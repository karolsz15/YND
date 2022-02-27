import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import classes from './Container.module.css';
import SingleUser from '../Components/SingleUser/SingleUser';

const Container = React.memo(() => {
  // map state to consts
  const searchQuery = useSelector((state) => state.searchQuery);
  const showListOfUsers = useSelector((state) => state.showListOfUsers);
  const usernamesArray = useSelector((state) => state.usernamesArray);
  const error = useSelector((state) => state.error);

  // map dispatch to consts
  const dispatch = useDispatch();
  const searchInputChangeHandler = useCallback(
    (input) => dispatch({ type: 'INPUT_CHANGED', input: input }),
    [dispatch]
  );
  const formSubmitHandler = useCallback(
    (event) => dispatch({ type: 'FORM_SUBMITTED', event: event }),
    [dispatch]
  );
  const setUsernamesArray = useCallback(
    (array) => dispatch({ type: 'SET_USERNAMES', array: array }),
    [dispatch]
  );
  const setError = useCallback(() => dispatch({ type: 'SET_ERROR' }), [
    dispatch,
  ]);

  const inputRef = useRef();

  // GET USERS
  // setTimeout is used in order to limit HTTP requests
  // request is sent after 0.5s without input change instead of request on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        searchQuery &&
        inputRef.current &&
        searchQuery === inputRef.current.value
      ) {
        const query = searchQuery.length === 0 ? '' : searchQuery;
        axios
          .get(`https://api.github.com/search/users?q=${query}`)
          .then((response) => {
            // handle success
            const newDataArray = response.data.items.map((el) => el.login);
            setUsernamesArray(newDataArray);
          })
          .catch((error) => {
            // handle error
            console.log(error);
            setError();
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, inputRef, setUsernamesArray, setError]);

  const message =
    (usernamesArray && usernamesArray.length === 0) || error
      ? `Sorry, couldn't find users for "${searchQuery}"`
      : `Showing users for "${searchQuery}"`;

  let listOfUsers = error ? (
    <p>Error! Users can't be loaded</p>
  ) : (
    <p>Loading users...</p>
  );

  if (usernamesArray) {
    // if more than 5 usernames match the user input - render list of first 5 results
    if (usernamesArray.length > 5) {
      // same outcome as: listOfUsers = [0,1,2,3,4].map(el => (...username={usernamesArray[el]...));
      listOfUsers = usernamesArray.map((el, index) =>
        index < 5 ? (
          <SingleUser
            username={usernamesArray[index]}
            key={usernamesArray[index]}
          />
        ) : null
      );
      // if less than 5 usernames match the user input - render list of all results
    } else {
      // same outcome as: listOfUsers = [0,1,2,3,4].slice(0, usernamesArray.length).map(el => (...username={usernamesArray[el]...));
      listOfUsers = usernamesArray.map((el, index) => (
        <SingleUser
          username={usernamesArray[index]}
          key={usernamesArray[index]}
        />
      ));
    }
  }

  return (
    <div className={classes.Container}>
      <form onSubmit={formSubmitHandler}>
        <input
          ref={inputRef}
          onChange={(e) => searchInputChangeHandler(e.target.value)}
          type="text"
          className={classes.SearchInput}
          placeholder="Enter username"
        />
        <button type="submit" className={classes.SearchButton}>
          Search
        </button>
      </form>
      <div className={classes.InfoMessage}>
        {showListOfUsers ? message : null}
      </div>
      {usernamesArray && showListOfUsers ? listOfUsers : null}
    </div>
  );
});

export default Container;
