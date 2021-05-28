import React, { useEffect, useState } from 'react';
import { Navbar as RBNavbar, Nav } from 'react-bootstrap';

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
        <RBNavbar fixed='top' style={{ backgroundColor: pos === 'top' ? 'transparent' : 'white' }}>
            <RBNavbar.Brand className='mr-auto'>
                <img src={nurture} style={{ width: '50px' }} className='rounded mr-3' />
            </RBNavbar.Brand>
            <Nav>
                <Nav.Link>About Us</Nav.Link>
                {/* <Nav.Link>Become a Mentor</Nav.Link> */}
                {/* <Nav.Link>Become a Mentee</Nav.Link> */}
                {/* <Nav.Link>Donate</Nav.Link> */}
                <Nav.Link>Contact Us</Nav.Link>
            </Nav>
        </RBNavbar>
    );
}
