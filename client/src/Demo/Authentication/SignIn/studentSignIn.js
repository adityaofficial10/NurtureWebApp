import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
//import { login,setAuthToken } from '/Users/ravi/Desktop/final/NurtureWebApp/client1/template/src/helpers/users.js'
import { login } from '../../../helpers/users'
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class studentSignIn extends React.Component {

    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          msg:"",
          userType:""
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
          password: this.state.password
        };
        login(userData.email,userData.password).then((response)=>{
            if(response.code){
                console.log("Success");
                this.setState({ redirect:true }); 
            }else{
                this.setState({msg:response.message});
            }
        });
    };
    render () {
        const { redirect,msg } = this.state;
        if(!redirect)
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/> 
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                    <div className="auth-content">
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <form noValidate onSubmit={this.onSubmit}>
                                <h3 className="mb-4">Student Dashboard</h3>
                                <h4 className="mb-4">Login</h4>
                                <br></br>
                                <p>{msg}</p>
                                <div className="input-group mb-3">
                                    <input id="email" type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input id="password" type="password" className="form-control" placeholder="password" value={this.state.password} onChange={this.onChange}/>
                                </div>
                                <button type="submit" className="btn btn-primary shadow-2 mb-4">Login</button>
                                </form>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-decision">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
        else
        return <Redirect to="/dashboard/mentee"></Redirect>;
    }
}

export default studentSignIn;