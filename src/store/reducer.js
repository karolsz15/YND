import axios from 'axios';

const initialState = {
    searchQuery: '',
    showListOfUsers: false
};

const reducer = (state = initialState, action) =>  {
    switch (action.type) {
        case 'INPUT_CHANGED':
            return {
                ...state,
                searchQuery: action.input
            }
        case 'SEARCH_BUTTON_CLICKED':
            axios.get(`https://api.github.com/search/users?q=${state.searchQuery}`)
                .then(function (response) {
                // handle success
                console.log(response.data.items);
                })
                .catch(function (error) {
                // handle error
                console.log(error);
                });
            return {
                ...state,
                showListOfUsers: true
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