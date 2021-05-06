import React from 'react';
import { Navbar, Nav, Card, CardDeck } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import './CareerDescription.scss';

export default function CareerDescription() {
    const { scheme, field } = useParams();
    return (
        <>
            <Navbar variant='dark' bg='dark'>
                <Navbar.Brand className='mr-auto'>NURTURE</Navbar.Brand>
                <Nav>
                    <Nav.Link href='/nurture/career-counsel' active>
                        Career Counsel
                    </Nav.Link>
                    <Nav.Link>Log Out</Nav.Link>
                </Nav>
            </Navbar>
            <h1 className='text-center py-5'>
                {scheme}/{field}
            </h1>
            <div id='career-desc' className='mx-3 p-5'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div id='choices' className='p-5 text-center'>
                <CardDeck className='justify-content-around'>
                    <Card>
                        <Card.Body>
                            <Card.Title>TITLE</Card.Title>
                            <img src="https://picsum.photos/100"></img>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>TITLE</Card.Title>
                            <img src="https://picsum.photos/100"></img>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>TITLE</Card.Title>
                            <img src="https://picsum.photos/100"></img>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>TITLE</Card.Title>
                            <img src="https://picsum.photos/100"></img>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>TITLE</Card.Title>
                            <img src="https://picsum.photos/100"></img>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>TITLE</Card.Title>
                            <img src="https://picsum.photos/100"></img>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        </>
    );
}
