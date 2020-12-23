import React from 'react';

const studentSignIn = React.lazy(() => import('./Demo/Authentication/SignIn/studentSignIn'));
const mentorSignIn = React.lazy(() => import('./Demo/Authentication/SignIn/mentorSignIn'));
const loginDecision = React.lazy(() => import('./Demo/Authentication/Decision/loginDecision'));
const signupDecision = React.lazy(() => import('./Demo/Authentication/Decision/signupDecision'));
const SignUpMentee = React.lazy(() => import('./Demo/Authentication/SignUp/SignUpMentee'));
const SignUpMentor = React.lazy(() => import('./Demo/Authentication/SignUp/SignUpMentor'));

const route = [
    { path:'/auth/login-decision',exact:true,name:'Decision-SignIn', component:loginDecision},
    { path: '/auth/mentor-signin', exact: true, name: 'mentorSignIn', component: mentorSignIn },
    { path: '/auth/student-signin', exact: true, name: 'studentSignIn', component: studentSignIn },
    { path: '/auth/signup-decision', exact: true, name: 'Decision', component: signupDecision },
    { path: '/auth/signup-mentee', exact: true, name: 'SignUpMentee', component: SignUpMentee },
    { path: '/auth/signup-mentor', exact: true, name: 'SignUpMentor', component: SignUpMentor }
];

export default route;