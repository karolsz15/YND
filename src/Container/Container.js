import React, { useEffect, useRef } from 'react';
import classes from './Container.module.css';
import './Dropdown.css';
import { connect } from 'react-redux';
import SingleUser from '../Components/SingleUser';
import axios from 'axios';

const Container = React.memo(props =>  {

    const inputRef = useRef();
    const { searchQuery, setUsernamesArray, setError } = props;

    // GET USERS
    useEffect(() => {
        const timer = setTimeout(() => {
            let newDataArray;
            if (inputRef.current && (searchQuery === inputRef.current.value)) {
                const query =
                    searchQuery.length === 0
                    ? ''
                    : searchQuery;
                axios.get(`https://api.github.com/search/users?q=${query}`)
                    .then( response => {
                        // handle success
                        newDataArray = response.data.items.map(el => el.login);
                        // console.log(newDataArray);
                        // console.log(response.data.items);
                        setUsernamesArray(newDataArray);
                    })
                    .catch( error => {
                        // handle error
                        console.log(error);
                        setError();
                    });
            }
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery, inputRef, setUsernamesArray, setError]);

        let message = `Showing users for "${props.searchQuery}"...`
        
        let listOfUsers = props.error ? <p>Error! Users can't be loaded</p> : <p>Loading users...</p>;

        if (props.usernamesArray) {
            listOfUsers = [0,1,2,3,4].map(el => (
                <SingleUser username={props.usernamesArray[el]} />
            ))
        };
        
        return (
            <div className={classes.Container}>
                <input
                    ref={inputRef}
                    onChange={e => props.searchInputChangeHandler(e.target.value)}
                    type="text" 
                    className={classes.SearchInput} 
                    placeholder="Enter username"></input>
                <button
                    onClick={props.searchButtonClickHandler} 
                    className={classes.SearchButton}>
                    Search</button>
                <div className={classes.InfoMessage}>
                    {props.showListOfUsers ? message : null}
                </div>
                {props.usernamesArray && props.showListOfUsers ? listOfUsers : null}
            </div>    
        )
});

const mapStateToProps = state => {
    return {
        searchQuery: state.searchQuery,
        showListOfUsers: state.showListOfUsers,
        usernamesArray: state.usernamesArray,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchInputChangeHandler: (input) => dispatch({type: 'INPUT_CHANGED', input: input}),
        searchButtonClickHandler: () => dispatch({type: 'SEARCH_BUTTON_CLICKED'}),
        setUsernamesArray: (array) => dispatch({type: 'SET_USERNAMES', array: array}),
        setError: () => dispatch({type: 'SET_ERROR'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);