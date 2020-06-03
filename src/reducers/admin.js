const initialState = [];

const adminItems = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case 'FETCH_DATA':
      console.log('actionFetctAllData', action);
      newState = action.data;
      return [...newState];
    case 'DELETE_ADMINITEM':
      let index = newState.findIndex((item) => item.id === action.id);
      newState.splice(index, 1);
      return [...newState];
    case 'ADD_DATA':
      console.log('actionADD', action);
      let data = {
        id: action.data.id,
        usersName: action.data.usersName,
        gmail: action.data.gmail,
        firtName: action.data.firtName,
        lastName: action.data.lastName,
        password: action.data.password,
        role: action.data.role,
      };
      newState.push(data);
      return [...newState];
    case 'UPDATE_DATA':
      let indexUpdate = newState.findIndex(
        (item) => item.id === action.data.id
      );
      newState[indexUpdate] = action.data;
      return [...newState];
    case 'SEARCH_DATA':
      let arrFilter = [];
      const keyWord = action.keyword;
      if (keyWord !== '') {
        action.data.filter(item => {
          let arrCharUserName = item.usersName.toUpperCase().split(' ').filter(x => x !== '').join('');
          let arrCharKeyword = keyWord.toUpperCase().split(' ').filter(x => x !== '').join('');
          if (arrCharUserName.includes(arrCharKeyword)) arrFilter.push(item);
          return newState = [...arrFilter];
        });
      }
      else return newState = [...action.data];
      return [...newState];
    default:
      return [...newState];
  }
};

export default adminItems;
