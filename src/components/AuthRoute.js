import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';




class AuthRoute extends Route{

        constructor(props){
            super(props);
        }


     // componentWillReceiveProps(newProps){
     //
     //        if(!this.state.current_user && newProps.current_user.username){
     //            this.setState({
     //                current_user:newProps.current_user
     //            });
     //
     //        }
     // }


     render(){
         const current_user = this.props.current_user;

          if (current_user){
            return (
                <Redirect to='/home'/>
            );
          }
        else{
          return(
            <Redirect to= '/login'/>
          );
        }
    }
}

function mapStatetoProps(store){

        return {
            dispatch:store.dispatch,
            users:store.users,
            current_user:store.current_user,
        };

}

export default connect(mapStatetoProps)(AuthRoute);



