

export default function userLogin(values) {

      const {username,password} = values;
        let users = localStorage.getItem('users');
        users = JSON.parse(users);
        if (users){
            const user = users[username];
            if(user && user.username === username && user.password === password) {
                return ({
                    type: "USER_LOGIN_SUCCESSFULL",
                    payload: {
                        username: username,
                        mobile_num: user.mobile_num,
                        email: user.email
                    }
                })
            }
        }
        
        return {
            type:'USER_LOGIN_FAILED',
             payload: {
                    username: null,
                    mobile_num: null,
                    email: null
                }
        }

}