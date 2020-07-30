import React, { useEffect, useRef } from 'react';
import classes from './Container.module.css';
import { connect } from 'react-redux';
import SingleUser from '../Components/SingleUser';
import axios from 'axios';

const Container = React.memo(props =>  {

    const inputRef = useRef();
    const { searchQuery, setUsernamesArray, setError } = props;

    // GET USERS
    //setTimeout is used in order to limit HTTP requests
    //request is sent after 0.5s without input change instead of request on every keystroke

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
                        setUsernamesArray(newDataArray);
                    })
                    .catch( error => {
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

    let message;

    message = props.usernamesArray && (props.usernamesArray.length === 0) 
        ? `Sorry, couldn't find users for "${props.searchQuery}"` 
        : `Showing users for "${props.searchQuery}"`
    
    let listOfUsers = props.error ? <p>Error! Users can't be loaded</p> : <p>Loading users...</p>;

    if (props.usernamesArray) {
        //if more than 5 usernames match the user input
        if (props.usernamesArray.length > 5) {
            listOfUsers = [0,1,2,3,4].map(el => (
                <SingleUser 
                    username={props.usernamesArray[el]} 
                    clicked={() => props.toggleUsersRepos()}
                    key={props.usernamesArray[el]} />
            ));
        //if less than 5 usernames match the user input
        } else {
            listOfUsers = [0,1,2,3,4].slice(0, props.usernamesArray.length).map(el => (
                <SingleUser 
                    username={props.usernamesArray[el]} 
                    clicked={() => props.toggleUsersRepos()}
                    key={props.usernamesArray[el]} />
            ));
        }
    };
        
    return (
        <div className={classes.Container}>
            <form onSubmit={props.formSubmitHandler}>
                <input
                    ref={inputRef}
                    onChange={e => props.searchInputChangeHandler(e.target.value)}
                    type="text" 
                    className={classes.SearchInput} 
                    placeholder="Enter username"></input>
                <button
                    type="submit"
                    className={classes.SearchButton} >
                    Search</button>
            </form>
            <div className={classes.InfoMessage}>
                {props.showListOfUsers ? message : null}
            </div>
            {props.usernamesArray && props.showListOfUsers ? listOfUsers : null}
        </div>    
    );
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
        formSubmitHandler: (event) => dispatch({type: 'FORM_SUBMITTED', event: event}),
        setUsernamesArray: (array) => dispatch({type: 'SET_USERNAMES', array: array}),
        setError: () => dispatch({type: 'SET_ERROR'}),
        toggleUsersRepos: () => dispatch({type: 'TOGGLE_USERS_REPOS'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);