import React from 'react';
import { Navbar, Nav, Card, Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Testimonials from "./Testimonials";
import Footer from "./Footer";

import nurture from '../../assets/images/nurture.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

export default function LandingPage() {
    return (
        <>
            {/* TODO: Make Navbar component */}
            <Navbar>
                <Navbar.Brand className='mr-auto'>
                    <img src={nurture} style={{ width: '50px' }} className='rounded mr-3' />
                </Navbar.Brand>
                <Nav>
                    <Nav.Link>About Us</Nav.Link>
                    {/* <Nav.Link>Become a Mentor</Nav.Link> */}
                    {/* <Nav.Link>Become a Mentee</Nav.Link> */}
                    {/* <Nav.Link>Donate</Nav.Link> */}
                    <Nav.Link>Contact Us</Nav.Link>
                </Nav>
            </Navbar>
            <Jumbotron>
                <Container className='text-center'>
                    <h1>NURTURE</h1>
                    <div className='p-5 text-center' id='mentor-mentee'>
                        <Card id='card-mentor'>
                            <Card.Body>
                                <Card.Title>BECOME A MENTOR</Card.Title>
                            </Card.Body>
                        </Card>
                        <Link to='/new-landing/become-mentee'>
                            <Card id='card-mentee'>
                                <Card.Body>
                                    <Card.Title>BECOME A MENTEE</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                </Container>
            </Jumbotron>
            <div className='p-5' id='about-us'>
                <h1 className='mb-5'>ABOUT US</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div className='p-5' id='testimonials'>
                <h1 className='mb-5 text-center'>Testimonials</h1>
                <Testimonials />
            </div>
            <Footer />
        </>
    );
}
