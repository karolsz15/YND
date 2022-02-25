import React from 'react';
import PropTypes from 'prop-types';
import classes from '../Container/Container.module.css';

const ReposLink = (props) => {
  const { username } = props;
  return (
    <a
      className={classes.Wrap}
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={classes.SingleRepo}>
        <div className={classes.TitleAndDescription}>
          <div className={classes.RepoTitle}>
            All {username}'s repositories...
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </div>
          <div className={classes.RepoDescription}>
            Click here to see all {username}'s repositories!
          </div>
        </div>
      </div>
    </a>
  );
};

ReposLink.propTypes = {
  username: PropTypes.string,
};

export default ReposLink;
