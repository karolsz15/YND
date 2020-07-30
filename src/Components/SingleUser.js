import React, { useState } from 'react';
import classes from '../Container/Container.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import SingleRepo from './SingleRepo';
import ReposLink from './ReposLink';

const SingleUser = props => {

    const [open, setOpen] = useState(false);
    const { setActiveUser, setActiveReposDetails, setError } = props;
    let singleRepoArray, singleRepoTitle, singleRepoDescription, singleRepoStars, singleRepoLink;

    singleRepoArray = null;
    singleRepoTitle = 'spinner...';
    singleRepoDescription = 'spinner...';

    // GET USER'S REPOS
    const getUsersRepos = () => {
        axios.get(`https://api.github.com/users/${props.username}/repos`)
        .then( response => {
            // handle success
            setActiveUser(props.username);
            setActiveReposDetails(response.data); //response.data is an array of objects
            console.log(response.data);
            props.clicked();
            setOpen(!open);
        })
        .catch( error => {
            // handle error
            console.log(error);
            setError();
        });
    }

    let listOfRepos = [];

    if (props.activeReposDetails) {
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
                    key={singleRepoTitle} />
            );
        };
    };

    return (
        <React.Fragment>
                    <div onClick={() => getUsersRepos()} className={classes.DropdownContainer}>
                        {props.username} 
                        {!open ? 
                            <i class="fa fa-angle-down" style={{fontSize:'2em', fontWeight: '900'}}></i> :
                            <i class="fa fa-angle-up" style={{fontSize:'2em', fontWeight: '900'}}></i> }
                    </div>
                    {props.showListOfRepos && open ? listOfRepos : null}
                    {props.showListOfRepos && open ? <ReposLink username={props.username}/> : null}
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        activeUser: state.activeUserName,
        activeReposDetails: state.activeReposDetails, //titles, descriptions and stars
        showListOfRepos: state.showListOfRepos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActiveUser: (user) => dispatch({type: 'SET_ACTIVE_USER', user: user}),
        setActiveReposDetails: (data) => dispatch({type: 'SET_ACTIVE_REPOS_DETAILS', data: data}),
        setError: () => dispatch({type: 'SET_ERROR'}),
        showUsersRepos: () => dispatch({type: 'SHOW_USERS_REPOS'}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);