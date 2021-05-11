import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Card, Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WOW } from 'wowjs';
import { scroller } from 'react-scroll';

import Testimonials from './Testimonials';
import Footer from './Footer';
import AboutUs from './AboutUs';
import OurImpact from './OurImpact';

import nurture from '../../assets/images/nurture.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

export default function LandingPage() {
    const [pos, setPos] = useState('top');

    useEffect(() => {
        document.addEventListener('scroll', e => {
            const scrolled = document.scrollingElement.scrollTop;
            if (scrolled >= 20) {
                setPos('moved');
            } else {
                setPos('top');
            }
        });
    });

    useEffect(() => {
        new WOW({ live: false }).init();
    });

    return (
        <>
            {/* TODO: Make Navbar component */}
            <Navbar
                fixed='top'
                style={{ backgroundColor: pos === 'top' ? 'transparent' : 'white' }}
            >
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
                <Container className='text-center flex-grow-1'>
                    <h1 class='align-middle'>NURTURE</h1>
                    {/* <div className='p-5 text-center' id='mentor-mentee'>
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
                    </div> */}
                    <a
                        id='scroll-arrow'
                        href='#about-us'
                        onClick={() =>
                            scroller.scrollTo('about-us', { smooth: 'easeInQuad', offset: -76 })
                        }
                    >
                        <span></span>Scroll
                    </a>
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
