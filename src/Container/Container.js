import React, { Component } from 'react';
import classes from './Container.module.css';
import './Dropdown.css';
import { connect } from 'react-redux';
import SingleUser from '../Components/SingleUser';
import _ from 'lodash';

class Container extends Component {

    render () {
        let listOfUsers = this.props.error ? <p>Users can't be loaded</p> : <p>Loading users...</p>;

        if (this.props.usernamesArray) {
            listOfUsers = (
                <SingleUser username={this.props.usernamesArray[0]} />
            );
        };
        
        return (
            <div className={classes.Container}>
                <input
                    onChange={e => this.props.searchInputChangeHandler(e.target.value)}
                    type="text" 
                    className={classes.SearchInput} 
                    placeholder="Enter username"></input>
                <button
                    onClick={this.props.searchButtonClickHandler} 
                    className={classes.SearchButton}>
                    Search</button>
                <div className={classes.InfoMessage}>
                    Showing users for "{this.props.searchQuery}"...
                </div>

                {listOfUsers}
                
                
                
            </div>    
        )
    };
};

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
        searchButtonClickHandler: () => dispatch({type: 'SEARCH_BUTTON_CLICKED'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);