import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardMentee = React.lazy(() => import('./Components/Dashboard/Mentee'));
const DashboardMentor = React.lazy(() => import('./Components/Dashboard/Mentor'));
const DashboardAdmin = React.lazy(() => import('./Components/Dashboard/Admin'));
const MentorProfile = React.lazy(() => import('./Components/Profile/Mentor'));

const routes = [
    { path: '/dashboard/mentee', exact: true, name: 'MenteeDashboard', component: DashboardMentee },
    { path: '/dashboard/mentor', exact: true, name: 'MentorDashboard', component: DashboardMentor },
    { path: '/dashboard/admin', exact: true, name: 'AdminDashboard', component: DashboardAdmin },
    { path: '/profile/mentor', exact: true, name: 'MentorProfile', component: MentorProfile}
];

export default routes;