const initialState = {};

const searchUser = (state = initialState, action) => {
    let newSate = {...state};
    switch (action.type) {
        case "SEARCH_DATA":
            newSate.keyword = action.keyword;
        return {...newSate};
        default:
            return {...newSate};
    }
}

export default searchUser;