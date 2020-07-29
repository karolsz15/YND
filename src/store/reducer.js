// import axios from 'axios';

const initialState = {
    searchQuery: '',
    showListOfUsers: false,
    usernamesArray: null,
    error: false,
    activeUser: null,
    activeReposDetails: null //titles, descriptions and stars - JSON object response
};

const reducer = (state = initialState, action) =>  {
    switch (action.type) {
        case 'INPUT_CHANGED':
            return {
                ...state,
                searchQuery: action.input,
                showListOfUsers: false
            }
        case 'SET_USERNAMES':
            return {
                ...state,
                usernamesArray: action.array
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: true
            }
        case 'SEARCH_BUTTON_CLICKED':
            return {
                ...state,
                showListOfUsers: true
            }
        case 'SET_ACTIVE_USER':
            return {
                ...state,
                activeUser: action.user
            }
        case 'SET_ACTIVE_REPOS_DETAILS':
            return {
                ...state,
                activeReposDetails: action.data
            }

    // axios
    // .get(`https://api.github.com/users/${answers.name}/starred`)
    // .then(function(res) {
    //   let stars = res.data[0].stargazers_count;

    //"https://api.github.com/user/repos{?type,page,per_page,sort}"
        }
    return state;
};

export default reducer;