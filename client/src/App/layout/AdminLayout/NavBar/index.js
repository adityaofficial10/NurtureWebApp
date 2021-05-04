import React, {Component} from 'react';
import {connect} from 'react-redux';


import DEMO from "../../../../store/constant";
import { Link } from 'react-router-dom';
import Aux from "../../../../hoc/_Aux";
import * as actionTypes from "../../../../store/actions";
import nurture from '../../../../assets/images/nurture.png';
import Avatar from '../../../../assets/images/user/avatar.jpg';
import { FiLogOut } from "react-icons/fi";
import { setAuthToken } from '../../../../helpers/mentors';
import { logout } from '../../../../helpers/users'

import { Nav, Navbar } from "react-bootstrap";

class NavBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            accountHolder:''
        }
    }
    onLogout = (e)=>{
      logout().then(response=>{
        console.log(response);
      });
    }
    onLoadfunc = (e) =>{

    }
    render() {
        return (
            
            <Aux>
                <header className='navbar'style={{backgroundColor: '#3d3d5c'}}>

                    <div>
                        <h2 style={{color: '#f2f2f2', fontFamily:"Lucida Console"}}>Dashboard</h2>
                    </div>
                    <div rtlLayout={this.props.rtlLayout} >
                        <Nav>
                        <Nav.Link href="/career-counsel" style={{color: "#ffffff"}}>CAREER COUNSEL</Nav.Link>
                        <Nav.Link href="/auth/signin" onClick = {(e) => this.onLogout(e)}>
                            <b>Logout</b><FiLogOut size="25px"/>
                        </Nav.Link>
                        </Nav>
                    </div> 
                </header>
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        rtlLayout: state.rtlLayout,
        headerBackColor: state.headerBackColor,
        headerFixedLayout: state.headerFixedLayout,
        collapseMenu: state.collapseMenu
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);
