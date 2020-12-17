import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardMentee = React.lazy(() => import('./Demo/Dashboard/Mentee'));
const DashboardMentor = React.lazy(() => import('./Demo/Dashboard/Mentor'));

const routes = [
    { path: '/dashboard/mentee', exact: true, name: 'MenteeDashboard', component: DashboardMentee },
    { path: '/dashboard/mentor', exact: true, name: 'MentorDashboard', component: DashboardMentor }
];

export default routes;