import React, { useEffect } from 'react';
import classes from '../Container/Container.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import SingleRepo from './SingleRepo';

const SingleUser = props => {

    const { setActiveUser, setActiveReposDetails, setError } = props;
    let singleRepoArray, singleRepoTitle, singleRepoDescription, singleRepoStars;

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
        })
        .catch( error => {
            // handle error
            console.log(error);
            setError();
        });
    }

    // useEffect( () => {
    //     axios.get(`https://api.github.com/users/${props.username}/repos`)
    //     .then( response => {
    //         // handle success
    //         setActiveUser(props.username);
    //         setActiveReposDetails(response.data); //response.data is an array of objects
    //         console.log(response.data);
    //     })
    //     .catch( error => {
    //         // handle error
    //         console.log(error);
    //         setError();
    //     });
    // }, [ setActiveUser, setActiveReposDetails, setError]);

    if (props.activeReposDetails) {
        singleRepoArray = _.values(props.activeReposDetails[0]); //making array out of object with lodash
        singleRepoTitle = singleRepoArray[2];
        singleRepoDescription = singleRepoArray[7];
        singleRepoStars = singleRepoArray[71];
    }

    return (
        <React.Fragment>
            <input 
                className={classes.DropdownContainer} 
                id="toggle" 
                type="checkbox"></input>
            <label onClick={() => getUsersRepos()} for="toggle">{props.username}<i class="fa fa-angle-down" style={{fontSize:'1.5em'}}></i></label>
                <div id="wrap">
                    <div id="slider">
                        <SingleRepo 
                        singleRepoTitle={singleRepoTitle} 
                        singleRepoDescription={singleRepoDescription} 
                        singleRepoStars={singleRepoStars} />

                    </div>
                </div> 
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        activeUser: state.activeUserName,
        activeReposDetails: state.activeReposDetails //titles, descriptions and stars
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActiveUser: (user) => dispatch({type: 'SET_ACTIVE_USER', user: user}),
        setActiveReposDetails: (data) => dispatch({type: 'SET_ACTIVE_REPOS_DETAILS', data: data}),
        setError: () => dispatch({type: 'SET_ERROR'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);