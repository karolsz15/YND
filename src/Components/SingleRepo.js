import React from 'react';
import classes from '../Container/Container.module.css';

const SingleRepo = props => {
    return (
        <div className={classes.Wrap}>
            <div className={classes.SingleRepo}>
                <div className={classes.TitleAndDescription}>
                    <div className={classes.RepoTitle}>
                        {props.singleRepoTitle} 
                    </div>
                    <div className={classes.RepoDescription}>
                        {props.singleRepoDescription}
                    </div>
                </div>
                <div>
                    {props.singleRepoStars} <i class="fa fa-star"></i>
                </div>  
            </div>
        </div> 
    );
};

export default SingleRepo;