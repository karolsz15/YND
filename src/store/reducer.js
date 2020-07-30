const initialState = {
    searchQuery: '',
    showListOfUsers: false,
    usernamesArray: null,
    error: false,
    activeUser: null,
    activeReposDetails: null, //titles, descriptions and stars - JSON object response 
    reposListOpen: false
};

const reducer = (state = initialState, action) =>  {
    switch (action.type) {
        case 'INPUT_CHANGED':
            return {
                ...state,
                searchQuery: action.input,
                showListOfUsers: false
            };
        case 'SET_USERNAMES':
            return {
                ...state,
                usernamesArray: action.array
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: true
            };
        case 'FORM_SUBMITTED':
            action.event.preventDefault();
            return {
                ...state,
                showListOfUsers: true
            };
        case 'SET_ACTIVE_USER':
            return {
                ...state,
                activeUser: action.user
            };
        case 'SET_ACTIVE_REPOS_DETAILS':
            return {
                ...state,
                activeReposDetails: action.data
            };
        case 'SET_REPOS_LISTS_OPEN':
            return {
                ...state,
                reposListOpen: true
            };
        case 'SET_REPOS_LISTS_CLOSED':
            return {
                ...state,
                reposListOpen: false
            };
        };
    return state;
};

export default reducer;