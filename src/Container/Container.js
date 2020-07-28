import React, { Component } from 'react';
import classes from './Container.module.css';
import './Dropdown.css';
import { connect } from 'react-redux';

class Container extends Component {

    render () {

        let listOfUsers = (
            <React.Fragment>
                <div className={classes.InfoMessage}>
                    Showing users for "{this.props.searchQuery}"...
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
            </React.Fragment>
        );

        return (
            <div className={classes.Container}>
                <input
                    onChange={e => this.props.searchInputChangeHandler(e.target.value)}
                    type="text" 
                    className={classes.SearchInput} 
                    placeholder="Enter username"></input>
                <button
                    onClick={this.props.searchButtonClickHandler} 
                    className={classes.SearchButton}>
                    Search</button>

                {this.props.showListOfUsers ? listOfUsers : null}
                
            </div>    
        )
    };
};

const mapStateToProps = state => {
    return {
        searchQuery: state.searchQuery,
        showListOfUsers: state.showListOfUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchInputChangeHandler: (input) => dispatch({type: 'INPUT_CHANGED', input: input}),
        searchButtonClickHandler: () => dispatch({type: 'SEARCH_BUTTON_CLICKED'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);