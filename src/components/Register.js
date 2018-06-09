import React, { Component } from 'react';
import {connect} from "react-redux";
import {Field,Form,reduxForm} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {isNotEmail} from 'sane-email-validation';
import {isValidNumber} from 'libphonenumber-js/custom';
import userRegister from '../actions/userRegister';

class Register extends React.Component{


  constructor(props){
    super(props);
    this.state = {
        error:null,
        user:null,
        registration_started:false,
        registration_completed:true,
        success:false,
        failed:false,
    }
  }


  onSubmitHandler(values, dispatch, props){
    dispatch(userRegister(values,dispatch));
    this.setState({
        user:values.username,
        registration_started:true,
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

        if(this.state.registration_started && current_user.username === this.state.user) {

            this.setState({
                registration_started: false,
                registration_completed: true,
                success:true,
                failed:false
            });
        }
        else if(this.state.registration_started && current_user.username !== this.state.user){
             this.setState({
                registration_started: false,
                registration_completed: true,
                failed:true,
                success:false,
                error:'Username already exist, registration failed'
            });
        }
    }

  renderField(field){
      return(
          <div>
            <spisValidNumberan>
              {field.name}
            </spisValidNumberan>
            <input style={{padding:'10px',margin:'10px'}} className='inputclass' type={field.type} {...field.input} placeholder={field.placeholder}/>
             <div>{field.meta.error?<span style={{color:'red'}}>{field.meta.error}</span>:null}</div>
        </div>

      );
   }

  render(){

       const {handleSubmit,current_user} = this.props;
       const {success,error} = this.state;

    if(current_user.username){
        return (
            <Redirect to='/home'/>
        );
    }

    return(
        <div id={'registerIsNotEmail'} style={{padding:'20px'}}>
              <Form onSubmit = {handleSubmit(this.onSubmitHandler.bind(this))}>
                <Field name='username' placeholder ={'username'} type={'text'} component={this.renderField.bind(this)}/>
                <Field name='password' placeholder ={'password'} type={'password'} component={this.renderField.bind(this)}/>
                <Field name='mobile_num' placeholder ={'Mobile Number'} type={'text'} component={this.renderField.bind(this)}/>
                <Field name='email' placeholder = {'Email Address'}  type={'text'} component={this.renderField.bind(this)}/>
                <Field name='joiningdate' placeholder ={'Date of Joining'} type={'date'} component={this.renderField.bind(this)}/>
                <button style={{margin:'10px'}} type='submit'>
                    Register
                </button>
              </Form>
               {error?<div style={{color:'red'}}>{error}</div>:null}
        </div>
    );

  }
}

function validate(values){
  const errors = {};


  for (let key of Object.keys(values)){
  if(!values[key]){
      errors[key] = `*${key} required`;
  }
  }

  if (values.email && isNotEmail(values.email)){
        errors['email'] = '*Invalid Email'
  }


  if (values.mobile_num && values.mobile_num.length !== 10){
        errors['mobile_num'] = '*Invalid Phone Number'
  }



  return errors;
}

function mapStatetoProps(store){

        return {
            dispatch:store.dispatch,
            users:store.users,
            current_user:store.current_user
        };
    }

export default reduxForm({
    form:'Register',
    validate,
})(connect(mapStatetoProps)(Register));