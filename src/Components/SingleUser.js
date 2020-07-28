import React from 'react';
import classes from '../Container/Container.module.css';

const singleUser = props => (
    <div className={classes.SingleRepo}>
        <div className={classes.TitleAndDescription}>
            <div className={classes.RepoTitle}>
                Repository title
            </div>
            <div className={classes.RepoDescription}>
                Repository description
            </div>
        </div>
        <div>
            48 <i class="fa fa-star"></i>
        </div>
    </div>
);

export default singleUser;