import React from 'react';
import classes from '../Container/Container.module.css';

const SingleRepo = props => {
    return (
        <a className={classes.Wrap} href={props.singleRepoLink} target="_blank" rel="noopener noreferrer">   
                <div className={classes.SingleRepo}>
                    <div className={classes.TitleAndDescription}>
                        <div className={classes.RepoTitle}>
                            <div>
                                {props.singleRepoTitle}
                            </div>
                            <div>
                                {props.singleRepoStars} <i className="fa fa-star"></i> 
                            </div>
                        </div>
                        <div className={classes.RepoDescription}>
                            {props.singleRepoDescription}
                        </div>
                    </div>
                </div>
        </a>
    );
};

export default SingleRepo;