import React, { useEffect } from 'react';
import { Navbar, Nav, Card, Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WOW } from 'wowjs';
import Testimonials from './Testimonials';
import Footer from './Footer';
import AboutUs from './AboutUs';
import OurImpact from './OurImpact';

import nurture from '../../assets/images/nurture.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

export default function LandingPage() {
    useEffect(() => {
        new WOW({ live: false }).init();
    });
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
                    {/* <Nav.Link>Become a Mentor</Nav.Link> */}
                    {/* <Nav.Link>Become a Mentee</Nav.Link> */}
                    {/* <Nav.Link>Donate</Nav.Link> */}
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
            <AboutUs />
            <OurImpact />
            <div className='p-5' id='testimonials'>
                <h1 className='mb-5 text-center wow fadeInUp'>Testimonials</h1>
                <Testimonials />
            </div>
            <Footer />

        </>
    );
}
