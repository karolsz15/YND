import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';

import SingleRepo from './SingleRepo';
import ReposLink from './ReposLink';
import classes from '../Container/Container.module.css';

const SingleUser = (props) => {
  const { username, key } = props;

  // map state to consts
  const activeReposDetails = useSelector((state) => state.activeReposDetails);

  // map dispatch to consts
  const dispatch = useDispatch();
  const setActiveUser = useCallback(
    (user) => dispatch({ type: 'SET_ACTIVE_USER', user: user }),
    [dispatch]
  );
  const setActiveReposDetails = useCallback(
    (data) => dispatch({ type: 'SET_ACTIVE_REPOS_DETAILS', data: data }),
    [dispatch]
  );
  const setError = useCallback(() => dispatch({ type: 'SET_ERROR' }), [
    dispatch,
  ]);

  // local state in order to handle single user's repositories list toggling independently
  const [reposListOpened, setReposListOpened] = useState(false);
  // local state in order to show only ONE repositories list at a time
  const [activeReposList, setActiveReposList] = useState([]);

  let singleRepoArray;
  let singleRepoTitle;
  let singleRepoDescription;
  let singleRepoStars;
  let singleRepoLink;

  // GET USER'S REPOS
  const getUsersRepos = () => {
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        setActiveUser(username);
        setActiveReposDetails(response.data); // response.data is an array of objects
        setReposListOpened(!reposListOpened);
        setActiveReposList(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError();
      });
  };

  const listOfRepos = [];

  if (activeReposDetails) {
    // if user has AT LEAST 4 repos, show list of 4 repos
    if (activeReposDetails.length >= 4) {
      for (let i = 0; i < 4; i++) {
        singleRepoArray = _.values(activeReposDetails[i]); // making array out of object with lodash
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
            key={singleRepoLink}
          />
        );
      }
    } else {
      // if user has LESS THAN 4 repos, show all user's repos
      for (let i = 0; i < activeReposDetails.length; i++) {
        singleRepoArray = _.values(activeReposDetails[i]); // making array out of object with lodash
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
            key={singleRepoLink}
          />
        );
      };
    };
  };

  return (
    <React.Fragment>
      <div onClick={() => getUsersRepos()} className={classes.DropdownContainer} id={key}>
        {username} 
        {!reposListOpened || (activeReposList !== activeReposDetails) ? 
            <i className="fa fa-angle-down" style={{fontSize:'2em', fontWeight: '900'}} /> :
            <i className="fa fa-angle-up" style={{ fontSize: '2em', fontWeight: '900' }} /> }
      </div>
      {reposListOpened && (activeReposList === activeReposDetails) ? listOfRepos : null}
      {reposListOpened && (activeReposList === activeReposDetails) ? <ReposLink username={username} /> : null}
    </React.Fragment>
  );
};

ReposLink.propTypes = {
  username: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired
};

export default SingleUser;
