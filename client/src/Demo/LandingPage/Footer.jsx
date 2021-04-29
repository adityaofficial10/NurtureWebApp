import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <div id='footer'>
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md px-5'>
                        <div className='footer-box'>
                            <div className='footer-header'>
                                <h4>NURTURE</h4>
                            </div>
                            <div className='footer-body'>
                                <p>
                                    Phasellus pharetra mi nulla, nec rutrum urna mattis eget. Sed
                                    auctor nulla ac efficitur scelerisque. Aliquam molestie quam vel
                                    dolor ultrices, convallis commodo ipsum tincidunt. Nullam
                                    egestas sapien elit, at efficitur neque venenatis vel. Etiam
                                    feugiat enim aliquet nibh fringilla, nec condimentum risus
                                    ullamcorper
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md px-5'>
                        <div className='footer-box'>
                            <div className='footer-header'>
                                <h4>CONTACT US</h4>
                            </div>
                            <div className='footer-body'>
                                <ul className='footer-social'>
                                    <li>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
