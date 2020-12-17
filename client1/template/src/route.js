import React from 'react';

const SignIn = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn'));
const Decision = React.lazy(() => import('./Demo/Authentication/Decision/Decision'));
const SignUpMentee = React.lazy(() => import('./Demo/Authentication/SignUp/SignUpMentee'));
const SignUpMentor = React.lazy(() => import('./Demo/Authentication/SignUp/SignUpMentor'));

const route = [
    { path: '/auth/signin', exact: true, name: 'SignIn', component: SignIn },
    { path: '/auth/decision', exact: true, name: 'Decision', component: Decision },
    { path: '/auth/signup-mentee', exact: true, name: 'SignUpMentee', component: SignUpMentee },
    { path: '/auth/signup-mentor', exact: true, name: 'SignUpMentor', component: SignUpMentor }
];

export default route;