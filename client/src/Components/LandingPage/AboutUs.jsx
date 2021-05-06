import React from 'react';

import './AboutUs.scss';

export default function AboutUs() {
    return (
        // TODO: 
        // [] - Add in animations
        // [] - Make it more pro
        <div className='p-sm-5' id='about-us'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md order-md-2 p-0' id='about-us-img'>
                        <img src='https://static.wixstatic.com/media/f2a190_f1f12c856e7f4492871b0669f395a000~mv2.jpg/v1/fill/w_613,h_600,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01/f2a190_f1f12c856e7f4492871b0669f395a000~mv2.webp' />
                    </div>
                    <div className='col-md order-md-1 py-3 px-5 mr-md-5' id='about-us-content'>
                        <h1 className='mb-5'>ABOUT US</h1>
                        <p>
                            Here at Nurture, we recognize the importance of individual involvement
                            to power their communities and themselves. We work to empower women and
                            children and help them realize their fullest potential.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
