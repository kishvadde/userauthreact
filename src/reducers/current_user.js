export default function currentUserReducer(state={
                        username:null,
                        mobile_num:null,
                        email:null,
                    },action){
        let newState = state;

        switch(action.type){

          case 'USER_LOGIN_SUCCESSFULL':

            newState = {
              ...state,
              ...action.payload
            } ;
            localStorage.setItem('current_user',JSON.stringify(action.payload));
            break;

            case 'USER_LOGIN_FAILED':

            newState = {
              ...state,
               ...action.payload

            } ;
            localStorage.setItem('current_user',JSON.stringify(action.payload));
            break;

          case 'USER_LOGOUT':
            newState = {
                  ...state,
                  ...action.payload,
            };
             localStorage.setItem('current_user',null);
             break;
          default:
            newState = state;
            break;



         }

       return newState;

}
