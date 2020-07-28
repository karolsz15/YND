import React from 'react';
import classes from '../Container/Container.module.css';

const singleUser = props => (
    <React.Fragment>
        <input className={classes.DropdownContainer} id="toggle" type="checkbox"></input><label for="toggle">{props.username}<i class="fa fa-angle-down" style={{fontSize:'1.5em'}}></i></label>
                <div id="wrap">
                    <div id="slider">
                        <div className={classes.SingleRepo}>
                            <div className={classes.TitleAndDescription}>
                                <div className={classes.RepoTitle}>
                                    {/* {props.repoTitle} */}
                                    REPO'S TITLE
                                </div>
                                <div className={classes.RepoDescription}>
                                    {/* {props.repoDescription} */}
                                    REPO'S DESCRIPTION
                                </div>
                            </div>
                            <div>
                                12 <i class="fa fa-star"></i>
                            </div>  
                        </div>
                    </div>
                </div> 
    </React.Fragment>
);

export default singleUser;