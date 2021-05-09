import React, { useState } from 'react';
import { Button, Col, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import menteeImg from '../../assets/images/mentee.png';
import menteeSvg from '../../assets/images/mentee.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BecomeMentee.scss';

export default function BecomeMentee() {
    const [values, setValues] = useState({});

    const changeForm = e => {
        setValues({ ...values, [e.target.id]: e.target.value });
        e.target.focus();
        console.log(values);
    };

    function formSubmit(e) {
        e.preventDefault();
        console.log(e.currentTarget);
        const fData = new FormData(e.currentTarget);
        fData.forEach((v, k) => console.log(k, v));
    }

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
            <div className='p-5 text-center' id='apply-btn'>
                <a href='#mentee-form'>
                    <h1>APPLY TO BE A MENTEE</h1>
                </a>
            </div>
            <div className='p-5' id='why-join'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md py-3' id='why-join-img'>
                            <img className='img-fluid' src={menteeSvg} />
                        </div>
                        <div className='col-md py-3' id='why-join-content'>
                            <h1 className='mb-5 text-center'>WHY YOU SHOULD JOIN US</h1>
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
            <div id='mentee-form' className='container-fluid p-5'>
                <form onSubmit={formSubmit}>
                    <div className='row mb-3'>
                        <div
                            className={
                                'mx-auto input col-md-6 input--jiro ' +
                                (values?.fname ? 'input--filled' : '')
                            }
                        >
                            <input
                                className='input__field input__field--jiro'
                                type='text'
                                id='fname'
                                name='fname'
                                onChange={changeForm}
                            />
                            <label className='input__label input__label--jiro' htmlFor='fname'>
                                <span className='input__label-content input__label-content--jiro'>
                                    First Name
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div
                            className={
                                'mx-auto input col-md-6 input--jiro ' +
                                (values?.lname ? 'input--filled' : '')
                            }
                        >
                            <input
                                className='input__field input__field--jiro'
                                type='text'
                                id='lname'
                                name='lname'
                                onChange={changeForm}
                            />
                            <label className='input__label input__label--jiro' htmlFor='lname'>
                                <span className='input__label-content input__label-content--jiro'>
                                    Last Name
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div
                            className={
                                'mx-auto input col-md-6 input--jiro ' +
                                (values?.email ? 'input--filled' : '')
                            }
                        >
                            <input
                                className='input__field input__field--jiro'
                                type='email'
                                id='email'
                                name='email'
                                onChange={changeForm}
                            />
                            <label className='input__label input__label--jiro' htmlFor='email'>
                                <span className='input__label-content input__label-content--jiro'>
                                    Email
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div
                            className={
                                'mx-auto input col-md-6 input--jiro ' +
                                (values?.phone ? 'input--filled' : '')
                            }
                        >
                            <input
                                className='input__field input__field--jiro'
                                type='tel'
                                id='phone'
                                name='phone'
                                onChange={changeForm}
                            />
                            <label className='input__label input__label--jiro' htmlFor='phone'>
                                <span className='input__label-content input__label-content--jiro'>
                                    Phone Number
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class='row'>
                        
                        <Button variant='primary' type='submit' className='mt-4 mx-auto'>
                            REGISTER
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
