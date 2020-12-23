import React from 'react';
import {NavLink,Redirect} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { signup } from '/Users/ravi/Desktop/final/NurtureWebApp/client/template/src/helpers/mentors.js';

class SignUpMentor extends React.Component {

    constructor() {
        super();
        this.state = {
          name:"",
          email: "",
          age:"",
          contactNumber:"",
          password: "",
          msg:""
        };
    }
    state = {
        redirect:false
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
          email: this.state.email,
          password: this.state.password,
          name:this.state.name,
          age:this.state.age,
          contactNumber:this.state.contactNumber
        };
        signup(userData).then((response)=>{
            console.log(response);  
            if(response.code){
                console.log("Success");
                this.setState({ redirect:true }); 
            }else{
                this.setState({msg:response.message});
            }
        });
    }

    render () {
        const { redirect,msg } = this.state;

        if(!redirect)
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <form noValidate onSubmit = {this.onSubmit}>
                                <h3 className="mb-4">Sign up</h3>
                                <br></br>
                                <p>{ msg }</p>
                                <div className="input-group mb-3">
                                    <input type="text" id="name" className="form-control" placeholder="Name" value={this.state.name} onChange={this.onChange}/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" id="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="number" id="age" className="form-control" placeholder="Age" value={this.state.age} onChange={this.onChange}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" id="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="text" id="contactNumber" className="form-control" placeholder="Contact Number" value={this.state.contactNumber} onChange={this.onChange}/>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4">Sign up</button>                                      
                                </form>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
        else
        return <Redirect to="/auth/signin"></Redirect>;

    }
}

export default SignUpMentor;