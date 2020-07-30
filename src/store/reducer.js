const initialState = {
    searchQuery: '',
    showListOfUsers: false,
    usernamesArray: null,
    error: false,
    activeUser: null,
    activeReposDetails: null, //titles, descriptions and stars - JSON object response 
    showListOfRepos: false,
    currentlyOpened: []
};

const reducer = (state = initialState, action) =>  {
    switch (action.type) {
        case 'INPUT_CHANGED':
            return {
                ...state,
                searchQuery: action.input,
                showListOfUsers: false,
                showListOfRepos: false
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
        case 'FORM_SUBMITTED':
            action.event.preventDefault();
            return {
                ...state,
                showListOfUsers: true
            }
        case 'SET_ACTIVE_USER':
            return {
                ...state,
                activeUser: action.user,
                numberOfRepositories: action.number
            }
        case 'SET_ACTIVE_REPOS_DETAILS':
            return {
                ...state,
                activeReposDetails: action.data
            }
        case 'TOGGLE_USERS_REPOS':
            let trueOrFalse = !state.showListOfRepos;
            return {
                ...state,
                showListOfRepos: trueOrFalse
            }
        }
    return state;
};

export default reducer;