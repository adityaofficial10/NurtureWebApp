import React, { useState } from 'react';
import { Button, Col, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import mentorSvg from '../../assets/images/mentor.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BecomeMentor.scss';

export default function BecomeMentor() {
    return (
        <>
            <Navbar variant='dark' bg='dark'>
                <Navbar.Brand className='mr-auto'>NURTURE</Navbar.Brand>
                <Nav>
                    <Nav.Link>About Us</Nav.Link>
                    {/* <Nav.Link>Become a Mentor</Nav.Link>
                    <Nav.Link>Become a Mentee</Nav.Link>
                    <Nav.Link>Donate</Nav.Link> */}
                    <Nav.Link>Contact Us</Nav.Link>
                </Nav>
            </Navbar>
            <div style={{ backgroundColor: 'lightgreen' }}>
                <div className='px-5 pt-5' id='why-join'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md py-3' id='why-join-img'>
                                <img className='img-fluid' src={mentorSvg} />
                            </div>
                            <div className='col-md py-3' id='why-join-content'>
                                <h1 className='mb-5 text-center'>WHY YOU SHOULD BECOME A MENTOR</h1>
                                <p className='text-justify'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                                    lacinia porta lorem at condimentum. Etiam nec nunc id nulla rutrum
                                    imperdiet. Pellentesque habitant morbi tristique senectus et netus
                                    et malesuada fames ac turpis egestas. Nam lorem mauris, mollis eget
                                    sem a, commodo commodo diam. Quisque quis aliquet sem, a eleifend
                                    ex. Donec risus ex, ullamcorper vel quam pulvinar, placerat blandit
                                    massa. Vestibulum eu leo et lacus ornare consectetur vitae vitae
                                    nulla. Fusce consectetur sodales feugiat. Cras tempor vestibulum
                                    interdum. Maecenas ac odio ultrices, dapibus ex id, blandit arcu.
                                    Sed id commodo lectus, vitae iaculis nunc. Quisque porttitor nec
                                    libero vitae dictum. Pellentesque habitant morbi tristique senectus
                                    et netus et malesuada fames ac turpis egestas. Nulla facilisi.
                                    Nullam ut diam nisi. Aenean dignissim dolor in sodales elementum.
                                    Suspendisse viverra gravida efficitur. Etiam eget libero libero.
                                    Praesent vel fermentum dui. Sed pellentesque justo vitae semper
                                    ultricies.
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pb-5 px-5 text-center' id='apply-btn'>
                    <a href='http://localhost:3000/nurture/auth/signup-decision'>
                        <h1>APPLY TO BE A MENTOR</h1>
                    </a>
                </div>
            </div>
        </>
    );
}
