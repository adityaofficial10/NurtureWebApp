import React from 'react';
import { Button, Col, Container, Form, Nav, Navbar } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingMentee.scss';

export default function BecomeMentee() {
    return (
        <>
            <Navbar variant='dark' bg='dark'>
                <Navbar.Brand className='mr-auto'>NURTURE</Navbar.Brand>
                <Nav>
                    <Nav.Link>About Us</Nav.Link>
                    <Nav.Link>Become a Mentor</Nav.Link>
                    <Nav.Link>Become a Mentee</Nav.Link>
                    <Nav.Link>Donate</Nav.Link>
                    <Nav.Link>Contact Us</Nav.Link>
                </Nav>
            </Navbar>
            <div className='p-5 text-center' id='apply-btn'>
            </div>
        </>
    );
}
