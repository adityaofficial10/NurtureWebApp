import React, { useState, Fragment } from 'react';
import { Row, Col, Card, Table, Tab, Nav, Modal, Button } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import Alert from 'react-popup-alert';
import { FiFileText, FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import TableScrollbar from 'react-table-scrollbar';
import DateTimePicker from 'react-datetime-picker';
import { getMentorDetails, getMentorDashboard, putSlot, getSlotsForMentor } from '../../helpers/mentors';
import { Redirect } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

class Mentor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            meetingTime: console.log(new Date()),
            content: '',
            link: '',
            msg: "You don't have a mentee yet.",
            redirect: false,
            sessionMsg: '',
            sessions: [],
            mentees: [],
            loading: true,
            success: false,
            show: false,
            failure: false
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({ show: false });
        const date = this.state.meetingTime;
        if (date === undefined) {
            this.setState({ sessionMsg: 'Choose a time slot first.' });
        }
        else {
            this.setState({ sessionMsg: '' });
            const dateUpd = new Date(date);
            dateUpd.setHours(0);
            dateUpd.setMinutes(0);
            dateUpd.setSeconds(0);
            const stTime = new Date(date);
            const endTime = new Date(date);
            console.log(endTime);
            endTime.setHours(endTime.getHours() + 1);
            putSlot(dateUpd, stTime, endTime, this.state.content, this.state.link).then((response) => {
                console.log(response.data);
                if(response.code === 1) {
                    this.setState({ success: true });
                }
                else {
                    this.setState({ failure: true });
                }
            });
        }
    }

    componentDidMount(props) {

        var mentees = [];
        var sessions = [];
        getMentorDashboard().then((response) => {
            console.log(response);
            if (!response.authenticated) {
                this.setState({ redirect: true });
            } else {
                this.setState({ redirect: false });
                this.setState({ sessions: response.sessions });
                this.setState({ mentees: response.mentees });
                this.setState({ msg: '' });
            }
            this.setState({ loading: false });
        });
    }
    render() {
        const { mentees, sessions, msg, redirect, sessionMsg, show, slotBooked } = this.state;
        if (!redirect)
            return (
                <Fragment>
                    <Aux>
                        <Row>
                            <Col md={6} xl={6}>
                                <Card className='Recent-Users'>
                                    <Card.Header>
                                        <Card.Title as='h5'>Sessions</Card.Title>
                                    </Card.Header>
                                    <Card.Body className='px-0 py-2'>
                                        <LoadingOverlay active={this.state.loading} spinner text='Loading the data...'>
                                            <TableScrollbar rows={12}>
                                                <Table responsive hover>
                                                    <tbody>
                                                        {sessions && sessions.map((session, index) => (
                                                            <tr className="unread">
                                                                <td>
                                                                    <h6 className="mb-1">Session with {session.menteeName}</h6>
                                                                    <p className="m-0">Session Number : {session.sessionNumber}</p>
                                                                </td>
                                                                <td>
                                                                    <h6 className="text"><i className="fa fa-circle text-c-green f-10 m-r-15" />{`${session.date}, ${session.startTime}`}</h6>
                                                                    {session.pending ? (<p style = {{color: 'red'}}><strong>PENDING</strong></p>) : <br />}                                                                </td>
                                                                <td>
                                                                    <a className="nav-link" href={session.link}>
                                                                        <IoArrowForwardCircleSharp size="30px" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </TableScrollbar>
                                        </LoadingOverlay>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} xl={6}>
                                <Card className='Recent-Users'>
                                    <Card.Header>
                                        <Card.Title as='h5'>Mentees</Card.Title>
                                    </Card.Header>
                                    <Card.Body className='px-0 py-2'>
                                        <LoadingOverlay active={this.state.loading} spinner text='Loading the data...'>
                                            <TableScrollbar rows={7}>
                                                <Table responsive hover>
                                                    <tbody>
                                                        {mentees && mentees.map((mentee, index) => (
                                                            <tr className="unread">
                                                                <td>
                                                                    <h6 className="mb-1"><strong>{mentee.menteeName}</strong></h6>
                                                                    <p className="m-0">{mentee.email}</p>
                                                                </td>
                                                                <td>
                                                                    <h6 className="mb-1"><strong>Sessions Conducted</strong></h6>
                                                                    <p className="m-0">{mentee.sessionsConducted}</p>
                                                                </td>
                                                                <td>
                                                                    <h6 className="mb-1"><strong>Contact</strong></h6>
                                                                    <p className="m-0">{mentee.contactNumber}</p>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </TableScrollbar>
                                        </LoadingOverlay>
                                    </Card.Body>
                                </Card>
                                <Card className='card-event'>
                                    <Card.Header>
                                        <Card.Title as='h5'>Put a Free Slot</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <p>Schedule a free session slot now</p>
                                            <button onClick={() => this.setState({ show: true })} className="btn btn-primary shadow-2 mb-4">Register Slot</button>
                                    </Card.Body>
                                </Card>
                                <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>SLOT REGISTRATION</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form noValidate onSubmit={this.onSubmit}>
                                            <label for="meeting-time" style = {{color: 'black'}}><strong>Choose a time for your appointment:</strong></label>
                                            <input type="datetime-local" id="meetingTime" name="meetingTime" value={this.state.meetingTime} onChange={this.onChange} />
                                            <hr />
                                            <label for="meeting-time" style = {{color: 'black'}}><strong>Put the content here:</strong></label>
                                            <textarea id="content" className="form-control" placeholder="Something about the content" name="content" value={this.state.content} onChange={this.onChange} />
                                            <hr />
                                            <label for="meeting-time" style = {{color: 'black'}}><strong>Session Link:</strong></label> <br />
                                            <input type="text" id="link" className="form-control" name="link" placeholder = "Link of the session(Optional)" value={this.state.link} onChange={this.onChange} />
                                            <hr />
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <Button type = "submit" variant="primary" onClick={(e) => this.onSubmit(e)}>
                                            Confirm Slot
                                        </Button>
                                        <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                                            Close
                                        </Button>
                                        </form>
                                    </Modal.Body>
                                </Modal>
                                <Modal show={this.state.success} onHide={() => this.setState({ success: false})}>
                                    <Modal.Header closeButton>
                                        <Modal.Title><h3 style = {{color: 'green'}}><strong>SUCCESS</strong></h3></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>The slot has been booked successfully and the mentees can now book an appointment</p>
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <Button variant="success" onClick={() => this.setState({ success: false })}>
                                            OK
                                        </Button>
                                    </Modal.Body>
                                </Modal>
                                <Modal show={this.state.danger} onHide={() => this.setState({ failure: false})}>
                                    <Modal.Header closeButton>
                                        <Modal.Title><h3 style = {{color: 'red'}}><strong>FAILURE</strong></h3></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>The slot could not be booked. Please try again.</p>
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <hr style = {{visibility: 'hidden'}}/>
                                        <Button variant="danger" onClick={() => this.setState({ slotBooked: false })}>
                                            Close
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
                </Fragment>
            );
        else
            return <Redirect to='/auth/mentor-signin'></Redirect>
    }
}

export default Mentor;