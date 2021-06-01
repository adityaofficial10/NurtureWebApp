import React, { useEffect, useState } from 'react';
import { Navbar as RBNavbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Navbar.scss';

import nurture from '../../assets/images/nurture.png';

export default function Navbar() {
    const [pos, setPos] = useState('top');

    useEffect(() => {
        document.addEventListener('scroll', e => {
            const scrolled = document.scrollingElement.scrollTop;
            if (scrolled >= 50) {
                setPos('moved');
            } else {
                setPos('top');
            }
        });
    });

    return (
        <RBNavbar
            expand='md'
            fixed='top'
            // style={{ backgroundColor: pos === 'top' ? 'transparent' : 'white' }}
        >
            <RBNavbar.Brand>
                <Link to = '/new-landing'><img src={nurture} style={{ width: '50px' }} className='rounded mr-3' /> </Link>
            </RBNavbar.Brand>
            <RBNavbar.Toggle aria-controls='responsive-navbar' />
            <RBNavbar.Collapse id='responsive-navbar'>
                <Nav className='py-3 py-md-0'>
                    <Nav.Link>About Us</Nav.Link>
                    <Nav.Link href="/new-landing/become-mentor">Become a Mentor</Nav.Link>
                    <Nav.Link href="/new-landing/become-mentee">Become a Mentee</Nav.Link>
                    <Nav.Link>Donate</Nav.Link>
                    <Nav.Link>Contact Us</Nav.Link>
                </Nav>
            </RBNavbar.Collapse>
        </RBNavbar>
    );
}
