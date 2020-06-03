const initialState = {};

const editingItem = (state=initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case "EDIT_DATA":
            newState.id = action.id;
            newState.show = true;
            return {...newState};
        case "SHOW_FORM":
            newState.show = true;
            newState.id = '';
            return {...newState};
        case "CLOSE_FORM":
            newState.show = false;
            newState.id = '';
            return {...newState};
        case "UPDATE_DATA":
            newState.id = '';
            newState.show = false;
            return {...newState};
        default:
            return {...newState};
    };
};
export default editingItem;
