import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faYoutube,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

import './Footer.scss';

export default function Footer() {
    return (
        <div id='footer'>
            <div className='container'>
                <div className='row py-5'>
                    <div className='col-md px-5 pb-3 pb-md-0'>
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
                    <div className='col-md px-5 pb-3 pb-md-0'>
                        <div className='footer-box'>
                            <div className='footer-header'>
                                <h4>MENU</h4>
                            </div>
                            <div className='footer-body'>
                                <ul>
                                    <li>Home</li>
                                    <li>About</li>
                                    <li>Become a Mentor</li>
                                    <li>Become a Mentee</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row py-3' id='copyrights'>
                    <div className='col-md px-5 text-center text-md-left'>
                        <FontAwesomeIcon icon={faCopyright} /> 2021 Nurture Intiative
                    </div>
                    <div className='col-md px-5'>
                        <ul className='footer-social text-center text-md-right'>
                            <li>
                                <a>
                                    <FontAwesomeIcon icon={faPhone} />
                                </a>
                            </li>
                            <li>
                                <a>
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                            </li>
                            <li>
                                <a>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </li>
                            <li>
                                <a>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </li>
                            <li>
                                <a>
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </li>
                            <li>
                                <a>
                                    <FontAwesomeIcon icon={faYoutube} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
