import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import SingleRepo from './SingleRepo';
import ReposLink from './ReposLink';
import classes from '../Container/Container.module.css';

const SingleUser = props => {

    //local state in order to handle single user's repositories list toggling independently
    const [reposListOpened, setReposListOpened] = useState(false);
    //local state in order to show only ONE repositories list at a time
    const [activeReposList, setActiveReposList] = useState([]);
    
    let singleRepoArray, singleRepoTitle, singleRepoDescription, singleRepoStars, singleRepoLink;

    //GET USER'S REPOS
    const getUsersRepos = () => {
        axios.get(`https://api.github.com/users/${props.username}/repos`)
        .then( response => {
            props.setActiveUser(props.username);
            props.setActiveReposDetails(response.data); //response.data is an array of objects
            setReposListOpened(!reposListOpened);
            setActiveReposList(response.data);
        })
        .catch( error => {
            console.log(error);
            props.setError();
        });
    };

    let listOfRepos = [];

    if (props.activeReposDetails) {

        //if user has AT LEAST 4 repos, show list of 4 repos
        if (props.activeReposDetails.length >= 4) {
            for (let i = 0; i <4; i++) {
                singleRepoArray = _.values(props.activeReposDetails[i]); //making array out of object with lodash
                singleRepoLink = singleRepoArray[6];
                singleRepoTitle = singleRepoArray[2];
                singleRepoDescription = singleRepoArray[7];
                singleRepoStars = singleRepoArray[71];
                listOfRepos.push(
                    <SingleRepo 
                        singleRepoTitle={singleRepoTitle} 
                        singleRepoDescription={singleRepoDescription} 
                        singleRepoStars={singleRepoStars} 
                        singleRepoLink={singleRepoLink}
                        key={singleRepoLink} />
                );
            };
        } else {

        //if user has LESS THAN 4 repos, show all user's repos
            for (let i = 0; i < props.activeReposDetails.length; i++) {
                singleRepoArray = _.values(props.activeReposDetails[i]); //making array out of object with lodash
                singleRepoLink = singleRepoArray[6];
                singleRepoTitle = singleRepoArray[2];
                singleRepoDescription = singleRepoArray[7];
                singleRepoStars = singleRepoArray[71];
                listOfRepos.push(
                    <SingleRepo 
                        singleRepoTitle={singleRepoTitle} 
                        singleRepoDescription={singleRepoDescription} 
                        singleRepoStars={singleRepoStars} 
                        singleRepoLink={singleRepoLink}
                        key={singleRepoLink} />
                );
            };
        };
    };

    return (
        <React.Fragment>
            <div onClick={() => getUsersRepos()} className={classes.DropdownContainer} id={props.key}>
                {props.username} 
                {!reposListOpened || (activeReposList !== props.activeReposDetails) ? 
                    <i className="fa fa-angle-down" style={{fontSize:'2em', fontWeight: '900'}}></i> :
                    <i className="fa fa-angle-up" style={{fontSize:'2em', fontWeight: '900'}}></i> 
                }
            </div>
            {reposListOpened && (activeReposList === props.activeReposDetails) ? listOfRepos : null}
            {reposListOpened && (activeReposList === props.activeReposDetails) ? <ReposLink username={props.username}/> : null}
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        activeUser: state.activeUserName,
        activeReposDetails: state.activeReposDetails, //titles, descriptions and stars
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActiveUser: (user) => dispatch({type: 'SET_ACTIVE_USER', user: user}),
        setActiveReposDetails: (data) => dispatch({type: 'SET_ACTIVE_REPOS_DETAILS', data: data}),
        setError: () => dispatch({type: 'SET_ERROR'}),
        clearActiveReposDetails: () => dispatch({type: 'CLEAR'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);