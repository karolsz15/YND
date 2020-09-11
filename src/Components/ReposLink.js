import React from 'react';
import classes from '../Container/Container.module.css';

const ReposLink = (props) => (
  <a
    className={classes.Wrap}
    href={`https://github.com/${props.username}`}
    target="_blank"
    rel="noopener noreferrer"
    <div className={classes.SingleRepo}>
        <div className={classes.TitleAndDescription}>
            <div className={classes.RepoTitle}>
                All {props.username}
                's repositories...
<i className="fa fa-arrow-right" aria-hidden="true" /> 
              </div>
            <div className={classes.RepoDescription}>
                Click here to see all {props.username}
                's repositories!
</div>
          </div>
      </div>
  </a>
);

export default ReposLink;
