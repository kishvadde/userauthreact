

export default function userRegister(values,dispatch) {


     let users = localStorage.getItem('users');
     users = JSON.parse(users);
    if(values){
        const {username} = values;

        if(users){
           const user = users[username];
            if(user){
                return {
                type:'USER_LOGIN_FAILED',
                 payload: {
                        username: null,
                        mobile_num: null,
                        email: null
                    }
                }
            }
        }
    }

    dispatch({
        type:'USER_LOGIN_SUCCESSFULL',
        payload: {
                username: values.username,
                mobile_num: values.mobile_num,
                email:values.email
        }
    });

    return ({
      type:'ADD_USER',
      payload:values,
    });
}