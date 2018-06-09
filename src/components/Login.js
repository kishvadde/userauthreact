import React, { Component } from 'react';
import {Field,Form,reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {Link,Redirect} from 'react-router-dom';
import userLogin from '../actions/userLogin';


class Login extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        error:null,
        login_started:false,
        current_user:null,
        login_completed:false,
        success:false,
        failed:false,
      }
    }


    onSubmitHandler(values, dispatch, props){
       dispatch(userLogin(values));
       this.setState({
           login_started:true,
           error:null
       });
    }

    componentWillMount() {

        this.props.dispatch({
            type: "GET_USERS",
            payload: null,
        });
    }

    componentWillReceiveProps(newProps){
        const {current_user} = newProps;

        if(this.state.login_started && current_user.username) {

            this.setState({
                login_started: false,
                login_completed: true,
                current_user: current_user,
                success:true,
                failed:false
            });
        }
        else if(this.state.login_started && current_user.username == null){
            this.setState({
                login_started: false,
                login_completed: true,
                current_user: current_user,
                failed:true,
                success:false,
                error:'*Check username or password'

            });
        }
    }

    renderField(field){
      return(
          <div>
            <span>
              {field.name}
            </span>
            <input style={{padding:'10px',margin:'10px'}} className='inputclass' type={field.type} {...field.input} placeholder={field.placeholder}/>
             <div>{field.meta.error?<span style={{color:'red'}}>{field.meta.error}</span>:null}</div>
        </div>

      );
    }



    render(){

     const {handleSubmit,current_user} = this.props;
     const {login_completed,success,error} = this.state;
      if( current_user.username){
          return (
              <Redirect to='/home'/>
          );
      }
      return(
          <div id='loginForm' style={{padding:'20px'}}>
            <Form onSubmit = {handleSubmit(this.onSubmitHandler.bind(this))}>
              <Field name='username' placeholder ={'username'} type={'text'} component={this.renderField.bind(this)}/>
               <Field name='password' placeholder ={'password'} type={'password'} component={this.renderField.bind(this)}/>
                <button style={{margin:'10px'}} type='submit'>
                    Submit
                </button>
            </Form>
              {error?<div style={{color:'red'}}>{error}</div>:null}
              <Link style={{margin:'10px'}} to={'/register'}>
                  register
               </Link>
          </div>
      );

    }

}


function mapStatetoProps(store){

        return {
            dispatch:store.dispatch,
            current_user:store.current_user,
        };
    }

    export default reduxForm({
        form:'Login',
    })(connect(mapStatetoProps)(Login));
