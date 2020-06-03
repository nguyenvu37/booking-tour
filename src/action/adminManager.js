export const actFetchData = (data) => {
  return {
    type: 'FETCH_DATA',
    data,
  };
};

export const actAddData = (data) => {
  return {
    type: 'ADD_DATA',
    data,
  };
};

export const deleteAdminItem = (id) => {
  return {
    type: 'DELETE_ADMINITEM',
    id,
  };
};

export const editAdminItem = id => {
    return {
        type: 'EDIT_DATA',
        id
    };
};

export const showForm = () => {
    return {
        type: 'SHOW_FORM',
    };
};

export const closeForm = () => {
    return {
        type: 'CLOSE_FORM',
    };
};

export const updateData = (data) => {
    return {
        type: 'UPDATE_DATA',
        data
    };
}

export const searchData = (keyword, data) => {
  return {
    type: 'SEARCH_DATA',
    keyword,
    data
  };
};
