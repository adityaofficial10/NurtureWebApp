import React from 'react';

const studentSignIn = React.lazy(() => import('./Demo/Authentication/SignIn/studentSignIn'));
const mentorSignIn = React.lazy(() => import('./Demo/Authentication/SignIn/mentorSignIn'));
const loginDecision = React.lazy(() => import('./Demo/Authentication/Decision/loginDecision'));
const signupDecision = React.lazy(() => import('./Demo/Authentication/Decision/signupDecision'));
const SignUpMentee = React.lazy(() => import('./Demo/Authentication/SignUp/SignUpMentee'));
const SignUpMentor = React.lazy(() => import('./Demo/Authentication/SignUp/SignUpMentor'));
const CareerCounsel = React.lazy(() => import('./Demo/CareerCounsel/index.jsx'))
const CareerDescription = React.lazy(() => import('./Demo/CareerCounsel/CareerDescription.jsx'))
const LandingPage = React.lazy(() => import('./Demo/LandingPage/index.jsx'))
const BecomeMentee = React.lazy(() => import('./Demo/LandingPage/BecomeMentee.jsx'));
const LandingMentee = React.lazy(() => import('./Demo/LandingPage/LandingMentee.jsx'));

const route = [
    { path:'/auth/login-decision',exact:true,name:'Decision-SignIn', component:loginDecision},
    { path: '/auth/mentor-signin', exact: true, name: 'mentorSignIn', component: mentorSignIn },
    { path: '/auth/student-signin', exact: true, name: 'studentSignIn', component: studentSignIn },
    { path: '/auth/signup-decision', exact: true, name: 'Decision', component: signupDecision },
    { path: '/auth/signup-student', exact: true, name: 'SignUpMentee', component: SignUpMentee },
    { path: '/auth/signup-mentor', exact: true, name: 'SignUpMentor', component: SignUpMentor },
    { path: '/career-counsel', exact: true, name: 'CareerCounsel', component: CareerCounsel },
    { path: '/career-counsel/:scheme/:field', name: 'CareerDescription', component: CareerDescription },
    { path: '/new-landing', exact: true, name: 'LandingPage', component: LandingPage },
    { path: '/new-landing/become-mentee', exact: true, name: 'BecomeMentee', component: BecomeMentee },
    { path: '/new-landing/mentee-landing', exact: true, name: 'LandingMentee', component: LandingMentee }
];

export default route;