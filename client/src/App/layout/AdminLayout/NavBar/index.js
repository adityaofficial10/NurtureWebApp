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
        
        /*let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', this.props.headerBackColor];
        if (this.props.headerFixedLayout) {
            headerClass = [...headerClass, 'headerpos-fixed'];
        }

        let toggleClass = ['mobile-menu'];
        if (this.props.collapseMenu) {
            toggleClass = [...toggleClass, 'on'];
        }
        <Aux>
                <header className={headerClass.join(' ')}>
                    <div className="collapse navbar-collapse" style={{backgroundColor: '#3d3d5c'}}>
                        <div>
                            <img className="rounded-circle" style={{width: '40px'}} src={nurture} alt="Nurture Logo" />
                        </div>
                        <NavLeft/>
                        <NavRight rtlLayout={this.props.rtlLayout} />
                    </div>
                </header>
            </Aux>
*/
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
