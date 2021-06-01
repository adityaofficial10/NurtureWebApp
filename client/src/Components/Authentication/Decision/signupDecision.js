import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

class signupDecision extends React.Component {
    render () {
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
                                <h3 className="mb-4">Sign up</h3>
                                <Link to="/auth/signup-mentor">
                                    <button className="btn btn-primary shadow-2 mb-4">Mentor</button>
                                </Link>
                                <Link to="/auth/signup-student">
                                    <button className="btn btn-primary shadow-2 mb-4">Mentee</button>
                                </Link>
                                <p className="mb-0 text-muted">Already have an account? <NavLink to="/auth/login-decision">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default signupDecision;