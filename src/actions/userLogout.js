export default function userLogout(values) {

        return {
            type:'USER_LOGOUT',
             payload: {
                    username: null,
                    mobile_num: null,
                    email: null
             }
        }

}