import React from 'react';
import { Navbar, Nav, Card, Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import nurture from '../../assets/images/nurture.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

let testimonialList = [
    [
        'Google',
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
    ],
    [
        'Apple',
        'Nam dictum tincidunt tincidunt. Nullam commodo nibh semper faucibus lobortis. Phasellus molestie ipsum sed turpis vulputate iaculis. Vestibulum ut mattis nunc, vel maximus diam. Nulla.',
    ],
    ['UN', 'Hello there'],
];

export default function LandingPage() {
    let testimonialCards = [];
    for (let v of testimonialList) {
        testimonialCards.push(
            <Card>
                <Card.Body>
                    <Card.Title>{v[0]}</Card.Title>
                    <Card.Text>{v[1]}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
    return (
        <>
            {/* TODO: Make Navbar component */}
            <Navbar>
                <Navbar.Brand className='mr-auto'>
                    <img src={nurture} style={{ width: '50px' }} className='rounded mr-3' />
                </Navbar.Brand>
                <Nav>
                    <Nav.Link>About Us</Nav.Link>
                    <Nav.Link>Become a Mentor</Nav.Link>
                    <Nav.Link>Become a Mentee</Nav.Link>
                    <Nav.Link>Donate</Nav.Link>
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
            <div className='p-5 text-center' id='testimonials'>
                <h1 className='mb-5'>Testimonials</h1>
                <div id='testimonial-cards'>{testimonialCards}</div>
            </div>
            <div className='p-5' id='contact-us'>
                <h1 className='mb-5'>Contact Us</h1>
            </div>
        </>
    );
}
