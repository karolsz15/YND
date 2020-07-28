import React, { Component } from 'react';
import classes from './Container.module.css';
import './Dropdown.css';
import { connect } from 'react-redux';

class Container extends Component {
    render () {
        return (
            <div className={classes.Container}>
                <input type="text" className={classes.SearchInput} placeholder="Enter username"></input>
                <button className={classes.SearchButton}>Search</button>
                <div className={classes.InfoMessage}>
                    Showing users for "Exampleuser"...
                </div>

                <input className={classes.DropdownContainer} id="toggle" type="checkbox"></input><label for="toggle">Exampleuser 1 <i class="fa fa-angle-down" style={{fontSize:'1.5em'}}></i></label>
                <div id="wrap">
                    <div id="slider">
                        <div className={classes.SingleRepo}>
                            <div className={classes.TitleAndDescription}>
                                <div className={classes.RepoTitle}>
                                    {this.props.test}
                                </div>
                                <div className={classes.RepoDescription}>
                                    Repository description
                                </div>
                            </div>
                            <div>
                                12 <i class="fa fa-star"></i>
                            </div>  
                        </div>

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
                                32 <i class="fa fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        )
    };
};

const mapStateToProps = state => {
    return {
        test: state.test
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateContactName: (name) => dispatch({type: 'UPDATE_CONTACT_NAME', name: name})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);