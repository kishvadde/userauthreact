import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';




class Home extends React.Component{


  constructor(props){
    super(props);
    this.state = {
        updated:false,
    }
  }

    componentWillMount() {


        this.props.dispatch({
            type: "GET_USERS",
            payload: null,
        });
    }


    componentWillReceiveProps(newProps){
      const {users} = newProps.users;

      if(!this.state.updated && Object.keys(users).length>0){
            this.setState({
                updated:true,
            });
      }
      console.log(newProps);

    }


     render(){
       const {users} = this.props.users;
       const {current_user} = this.props;


       if (!current_user.username){
           return (
               <Redirect to='/login'/>
           );
       }

       if (users){
            return(
                  <div>
                    <table>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Mobine No</th>
                        </tr>
                      {Object.keys(users).map((user)=>{
                       return (
                          <tr>
                           <td>
                             {users[user].username}
                           </td>
                           <td>
                             {users[user].email}
                           </td>
                           <td>
                             {users[user].mobile_num}
                           </td>
                          </tr>
                       );
                      })}
                   </table>
                  </div>

            );

       }
       else{
         return null;
       }


     }


    }

    function mapStatetoProps(store){

        console.log(store);

        return {
            users:store.users,
            current_user:store.current_user,
            dispatch:store.dispatch,
        };

    }

    export default connect(mapStatetoProps)(Home);