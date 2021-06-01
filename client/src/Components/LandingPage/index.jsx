import React, { useEffect, useState } from 'react';
import { Card, Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WOW } from 'wowjs';
import { scroller } from 'react-scroll';

import Testimonials from './Testimonials';
import Footer from './Footer';
import AboutUs from './AboutUs';
import OurImpact from './OurImpact';
import Navbar from './Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

export default function LandingPage() {
    useEffect(() => {
        new WOW({ live: false }).init();
    });

    return (
        <>
            {/* TODO: Make Navbar component */}
            <Navbar />
            <Jumbotron id='jumbo-heading'>
                <Container className='text-center flex-grow-1'>
                    <h1 className='align-middle'>NURTURE</h1>
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
            <div className='p-5 text-center wow fadeInUp bg-primary' id='mentor-mentee'>
                <Link to='/new-landing/become-mentor'>
                    <Card id='card-mentor'>
                        <Card.Body>
                            <Card.Title>BECOME A MENTOR</Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to='/new-landing/become-mentee'>
                    <Card id='card-mentee'>
                        <Card.Body>
                            <Card.Title>BECOME A MENTEE</Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
            <div className='p-5' id='testimonials'>
                <h1 className='mb-5 text-center wow fadeInUp'>Testimonials</h1>
                <Testimonials />
            </div>
            <Footer />
        </>
    );
}
