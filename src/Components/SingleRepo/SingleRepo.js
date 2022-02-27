import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../Container/Container.module.css';

const SingleRepo = ({
  singleRepoLink,
  singleRepoTitle,
  singleRepoStars,
  singleRepoDescription,
}) => (
  <a
    className={classes.Wrap}
    href={singleRepoLink}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className={classes.SingleRepo}>
      <div className={classes.TitleAndDescription}>
        <div className={classes.RepoTitle}>
          <div>{singleRepoTitle}</div>
          <div>
            {singleRepoStars}
            <i className="fa fa-star" />
          </div>
        </div>
        <div className={classes.RepoDescription}>{singleRepoDescription}</div>
      </div>
    </div>
  </a>
);

SingleRepo.propTypes = {
  singleRepoLink: PropTypes.string,
  singleRepoTitle: PropTypes.string,
  singleRepoStars: PropTypes.number,
  singleRepoDescription: PropTypes.string,
};

export default SingleRepo;
