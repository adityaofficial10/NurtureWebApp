import React, { useState } from 'react';
import { Row, Col, Card, Table, Tab, Nav, Button, Modal } from 'react-bootstrap';
import TableScrollbar from 'react-table-scrollbar';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar from '../../assets/images/user/avatar.jpg';

import { FiFileText, FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";

import Popup from 'reactjs-popup';
import Calendar from 'react-calendar';
import DateTimePicker from 'react-datetime-picker';
import { getSlotsOfMentors, bookSlot, getUserDashboard, cancelEngagement, completeSession } from '../../helpers/users'
import { Redirect } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

class Mentee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            slots: [],
            sessions: [],
            redirect: false,
            rawSlots: [],
            mentorName: 'NA',
            mentorCN: 'NA',
            mentorEmail: 'NA',
            msg: '',
            mentorMsg: 'You have not chosen a mentor yet.',
            loading: true,
            cancellation: false,
            show: false,
            alertHeader: '',
            alertMsg: '',
            color: '',
        }
    }
    componentDidMount(props) {
        getUserDashboard(this.state.selectedDate).then((userData) => {
            console.log(userData);
            if (!userData.authenticated) {
                this.setState({ redirect: true });
            }
            else
                this.setState({ redirect: false });

            this.setState({sessions: userData.sessions});
            if (userData.slots) {
                this.setState({ slots: userData.slots.slotsList });
                this.setState({ rawSlots: userData.slots.rawSlots });
                this.setState({ msg: '' });
            } else {
                this.setState({ slots: [] });
                this.setState({ rawSlots: [] });
                this.setState({ msg: '' });
            }
            if (userData.mentorInfo) {
                this.setState({ mentorName: userData.mentorDetails.mentorName });
                this.setState({ mentorCN: userData.mentorInfo.contactNumber });
                this.setState({ mentorEmail: userData.mentorInfo.email });
                this.setState({ mentorMsg: '' });
            }
            this.setState({loading: false});
        });
    }
    onChange = (date) => {
        this.setState({ selectedDate: date });
        this.setState({loading: true});
        getUserDashboard(date).then((userData) => {
            console.log(this.state.selectedDate);
            if (!userData.authenticated) {
                this.setState({ redirect: true });
            }
            else
                this.setState({ redirect: false });
            if (userData.slots) {
                this.setState({ slots: userData.slots.slotsList });
                this.setState({ rawSlots: userData.slots.rawSlots });
                this.setState({ msg: '' });
            } else {
                this.setState({slots: []});
                this.setState({ rawSlots: []});
            }
            this.setState({loading: false});
        });
    }

    onCancellation = (e) => {
        cancelEngagement().then((response)=> {
            this.setState({cancellation: false});
            console.log(response);
            window.location.reload(false);
        })
    }
     
    onCompletion = (e, sessionNumber, mentor) => {
        const d = {
            'mentorId' : mentor,
            'sessionNumber' : sessionNumber
        };
        completeSession(d).then((response) => {
            if(response.code === 1) {
                this.setState({alertHeader: 'SUCCESS', alertMsg: 'This session has been marked completed.', color: 'green'});
                this.setState({show: true});      
            }
            else if(response.code === 2) {
                this.setState({alertHeader: 'SUCCESS', alertMsg: 'You have completed the alotted session quota of 4 and your engagement with the mentor ends. You can now book appointments with other mentors as well.', color: 'green'});
                this.setState({show: true});
            }
        });
    }
    onBooking = (e, index) => {
        const { rawSlots } = this.state;
        const data = {
            'mentorName': rawSlots[index].mentorName,
            'mentor': rawSlots[index].mentor,
            'date': rawSlots[index].date,
            'startTime': rawSlots[index].startTime,
            'endTime': rawSlots[index].endTime
        };
        bookSlot(data).then(response => {
            console.log(response);
        });
        window.location.reload(false);
    }
    render() {
        const { slots, mentorName, mentorCN, mentorEmail, msg, mentorMsg, redirect, sessions } = this.state;
        if (!redirect)
            return (
                <Aux>
                    <Row>
                        <Col md={6} xl={8}>
                            <Card className="Recent-Users">
                                <Card.Header>
                                    <Card.Title as='h5'>Mentors List</Card.Title>
                                </Card.Header>
                                <Card.Body className='px-0 py-2'>
                                <LoadingOverlay active = {this.state.loading} spinner text = 'Loading the data...'>
                                    <h6 className="mb-1">{msg}</h6>
                                    <TableScrollbar rows={6.5}>
                                        <Table responsive hover>
                                            <tbody>
                                                {slots && slots.map((slot, index) => (
                                                    <tr className="unread">
                                                        <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar} alt="activity-user" /></td>
                                                        <td>
                                                            <h6 className="mb-1">{slot.mentor}</h6>
                                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                        </td>
                                                        <td><AiFillClockCircle size="20px" /> {slot.startTime}</td>
                                                        <td>
                                                            <Popup trigger={<a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" >BOOK NOW</a>} modal>
                                                                {close => (<Card>
                                                                    <Card.Header>
                                                                        <Card.Title as='h5'>Confirm Booking?</Card.Title>
                                                                    </Card.Header>
                                                                    <Card.Body>
                                                                        <Button variant="success" onClick={e => {
                                                                            this.onBooking(e, index);
                                                                        }}>
                                                                            Confirm
                                                                        </Button>
                                                                        <Button variant="danger" onClick = {close}>
                                                                            Cancel
                                                                        </Button>
                                                                    </Card.Body>
                                                                </Card>)}
                                                            </Popup>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </TableScrollbar>
                                    </LoadingOverlay>
                                </Card.Body>
                            </Card>
                            <Card className='Recent-Users'>
                                <Card.Header>
                                    <Card.Title as='h5'>Sessions</Card.Title>
                                </Card.Header>
                                <Card.Body className='px-0 py-2'>
                                <LoadingOverlay active = {this.state.loading} spinner text = 'Loading the data...'>
                                <TableScrollbar rows={7.2}>
                                    <Table responsive hover>
                                        <tbody>
                                            {sessions && sessions.map((session, index) => (
                                                <tr className="unread">
                                                <td>
                                                    <h6 className="mb-1">Session {session.sessionNumber}</h6>
                                                    <p className="m-0">Session {session.sessionNumber} with {session.mentorName}</p>
                                                </td>
                                                {session.scheduled ? (<td>
                                                    <h6 className="text"><i className="fa fa-circle text-c-green f-10 m-r-15" />{`${session.date}, ${session.startTime}`}</h6>
                                                </td>) : <br />}
                                                <td>
                                                    <h6 className="text">
                                                        {session.completed ? "Completed" : (session.scheduled ? "Scheduled" : "Not Scheduled")} 
                                                    </h6>
                                                </td>
                                                {session.scheduled && !session.completed ? (
                                                    <td>
                                                        <button type="submit" className="btn btn-primary shadow-2 mb-6" onClick = {(e) => this.onCompletion(e, session.sessionNumber, session.mentor)}>Complete</button>                                               
                                                    </td>
                                                ) : <br />}
                                            </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    </TableScrollbar>
                                    </LoadingOverlay>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xl={4}>
                            <Card className='card-event'>
                                <Card.Body>
                                <h6 className="mb-1">Select the date to see the available slots.</h6>
                                    <Calendar
                                        onChange = {this.onChange}
                                        value={this.state.selectedDate}
                                        onClickDay = {this.onChange}
                                    />
                                </Card.Body>
                            </Card>
                            <Card className='card-event'>
                                <Card.Body>
                                    <h6>{mentorMsg}</h6>
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col">
                                            <h5 className="m-0">Mentor Details</h5>
                                        </div>
                                    </div>
                                    <h2 className="mt-2 f-w-300">{mentorName}</h2>
                                    <h6 className="text-muted mt-3 mb-0">Mentor Experience Details</h6>

                                </Card.Body>
                            </Card>
                            <Card >
                                <Card.Body className='border-bottom'>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-auto">
                                            <FiPhone color="#00e699" size="20px" />
                                        </div>
                                        <div className="col">
                                            <h3 className="f-w-300">{mentorCN}</h3>
                                            <span className="d-block text-uppercase">Mentor Contact Number</span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body className='border-bottom'>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-auto">
                                            <AiOutlineMail color="#00ace6" size="20px" />
                                        </div>
                                        <div className="col">
                                            <h3 className="f-w-300">{mentorEmail}</h3>
                                            <span className="d-block text-uppercase">Mentor Email Address</span>
                                        </div>
                                    </div>
                                    <br />
                                    {this.state.mentorName !== 'NA' ? (<button type="button" style = {{alignItems: "center"}} className="btn btn-danger shadow-2 mb-6" onClick = {() => this.setState({cancellation: true})}>Cancel Engagement</button>) : <br />} 
                                </Card.Body>
                            </Card>
                            <Modal show={this.state.show} onHide={() => this.setState({ show: false})}>
                                    <Modal.Header closeButton>
                                        <Modal.Title><h3 style = {{color: this.state.color}}><strong>{this.state.alertHeader}</strong></h3></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>{this.state.alertMsg}</p>
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <Button variant="success" onClick={() => {this.setState({show: false}); window.location.reload(false);}}>
                                            OK
                                        </Button>
                                    </Modal.Body>
                            </Modal>
                            <Modal show={this.state.cancellation} onHide={() => this.setState({ cancellation: false})}>
                                    <Modal.Header closeButton>
                                        <Modal.Title><h3 style = {{color: 'red'}}><strong>ALERT</strong></h3></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>Are you sure you want to cancel the engagement? This action can not be reversed.</p>
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <Button variant="success" onClick={(e) => this.onCancellation(e)}>
                                            Proceed
                                        </Button>
                                        <Button variant="danger" onClick={() => this.setState({ cancellation: false })}>
                                            Cancel
                                        </Button>
                                    </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className='card-event'>
                                <Card.Header>
                                    <Card.Title as='h5'>Session Curriculams</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Tab.Container defaultActiveKey="session1">
                                        <Row>
                                            <Col sm={3}>
                                                <Nav variant="pills" className="flex-column">
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="session1">Session 1</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="session2">Session 2</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="session3">Session 3</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="session4">Session 4</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                            <Col sm={9}>
                                                <Tab.Content >
                                                    <Tab.Pane eventKey="session1">
                                                        <p> Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                                                        <a href={DEMO.BLANK_LINK}>Click here to get the full curriculam</a>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="session2">
                                                        <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                                                        <a href={DEMO.BLANK_LINK}>Click here to get the full curriculam</a>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="session3">
                                                        <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                                                        <a href={DEMO.BLANK_LINK}>Click here to get the full curriculam</a>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="session4">
                                                        <p>Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.</p>
                                                        <a href={DEMO.BLANK_LINK}>Click here to get the full curriculam</a>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Col>
                                        </Row>
                                    </Tab.Container>
                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>
                </Aux>
            );
        else
            return <Redirect to='/auth/student-signin'></Redirect>;
    }
}

export default Mentee;