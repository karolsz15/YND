import React from 'react';
import classes from '../Container/Container.module.css';

const ReposLink = props => (
    <a className={classes.Wrap} href={`https://github.com/${props.username}`} target="_blank" rel="noopener noreferrer">
        <div className={classes.SingleRepo}>
            <div className={classes.TitleAndDescription}>
                <div className={classes.RepoTitle}>
                    Other user's repositories! 
                </div>
                <div className={classes.RepoDescription}>
                    Click here to see all {props.username}'s repositories!
                </div>
            </div>
            <div>
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </div>  
        </div>
    </a>
    
);

export default ReposLink;