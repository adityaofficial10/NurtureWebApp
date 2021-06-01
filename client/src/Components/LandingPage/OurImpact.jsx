import React from 'react';

import './OurImpact.scss';

const impacts = [
    [
        'Children',
        'Our goal is to promote education and all-round development of children. With our volunteers, we aim to empower their abilities and their confidence to actualize their potential. Learn more about our work by getting in touch with our team today.',
        'https://static.wixstatic.com/media/nsplsh_41456154556e766e65696b~mv2_d_5184_3456_s_4_2.jpg/v1/fill/w_533,h_375,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01/nsplsh_41456154556e766e65696b~mv2_d_5184_3456_s_4_2.webp',
    ],
    [
        'Women',
        'We strive to create awareness about menstrual hygiene and dealing with this challenge. We aim to educate mothers on the importance of antenatal care. on antenatal care. Contact us to learn more about our commitment to this cause.',
        'https://static.wixstatic.com/media/nsplsh_313746525455375871636b~mv2.jpg/v1/fill/w_533,h_375,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01/nsplsh_313746525455375871636b~mv2.webp',
    ],
    [
        'Mental Health',
        'At Nurture, we are dedicated to stepping up our efforts in addressing this issue. Mental Health is by no means an easy feat, but through cooperation and community empowerment we believe we can facilitate wellness. We are always striving to make a difference, and invite you to learn more and lend your support.',
        'https://static.wixstatic.com/media/nsplsh_626f335348503538433367~mv2_d_9000_6001_s_4_2.jpg/v1/fill/w_533,h_375,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01/nsplsh_626f335348503538433367~mv2_d_9000_6001_s_4_2.webp',
    ],
];

export default function OurImpact() {
    return (
        // TODO:
        // [x] - Add in animations
        // [x] - Make it more pro
        <div className='p-5' id='our-impact'>
            <div className='container-fluid'>
                <h1 className='text-center my-5 wow fadeInUp'>
                    OUR IMPACT
                </h1>
                <div className='row'>
                    {impacts.map((impact, i) => (
                        <div className='col-md-4 d-md-flex align-items-stretch wow fadeInUp' key={i}>
                        {/* <div className='col-lg-4 d-lg-flex align-items-stretch' key={i}> */}
                            <div className='card card-blog'>
                                <div className='card-image'>
                                    <img className='img-raised' src={impact[2]} />
                                </div>
                                <div className='card-body'>
                                    <h4 className='card-title'>{impact[0]}</h4>
                                    <p className='card-text'> {impact[1]} </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
