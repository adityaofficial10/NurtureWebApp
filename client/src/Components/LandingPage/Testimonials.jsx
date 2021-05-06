import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faSeedling } from '@fortawesome/free-solid-svg-icons';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Testimonials.scss';

const testimonialList = [
    [
        'Google',
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
    ],
    [
        'IBM',
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
    ],
    [
        'Apple',
        'Nam dictum tincidunt tincidunt. Nullam commodo nibh semper faucibus lobortis. Phasellus molestie ipsum sed turpis vulputate iaculis. Vestibulum ut mattis nunc, vel maximus diam. Nulla.',
    ],
    [
        'FB',
        'Nam dictum tincidunt tincidunt. Nullam commodo nibh semper faucibus lobortis. Phasellus molestie ipsum sed turpis vulputate iaculis. Vestibulum ut mattis nunc, vel maximus diam. Nulla.',
    ],
    ['UN', 'Hello there'],
];

const carousalResponsiveOptions = {
    0: {
        stagePadding: 0,
        items: 1,
    },
    540: {
        items: 1,
    },
    900: {
        // items: 2,
        items: 2,
    },
};

export default function Testimonials() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <OwlCarousel
                        className='owl-theme'
                        // autoplay
                        // TODO: Show center demo and uncomment in above resp break
                        // center
                        dots
                        items={1}
                        loop
                        responsive={carousalResponsiveOptions}
                        stagePadding={100}
                        id='testimonial-slider'
                    >
                        {testimonialList.map((t, i) => (
                            <div className='testimonial' key={i}>
                                <div className='testimonial-content'>
                                    <div className='testimonial-icon'>
                                        <FontAwesomeIcon
                                            icon={faSeedling}
                                            color='#85b659'
                                            size='lg'
                                        />
                                    </div>
                                    <p className='description'>{t[1]}</p>
                                </div>
                                <div className='author'>
                                    <h3 className='title'>{t[0]}</h3>
                                    <span className='post'>Lorem Ipsum</span>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>
        </div>
    );
}
