export default function userlistReducer(state={
                    users:{}
                  },action){

  let newState = state;
  let users = null;
  switch(action.type){

    case 'ADD_USER':
         users = state.users;
         const {username} = action.payload;
         users[username] = action.payload;
         newState = {
           ...state,
           users:users
         };
        localStorage.setItem('users',JSON.stringify(users));
        break;

    case 'GET_USERS':
       users = localStorage.getItem('users');
      newState = {
        ...state,
        users:JSON.parse(users),
      };
      break;

     default:
      newState = state;
      break;

   }

  return newState;
}