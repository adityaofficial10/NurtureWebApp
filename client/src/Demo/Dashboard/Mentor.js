import React, {useState} from 'react';
import {Row, Col, Card, Table, Tab, Nav} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import { FiFileText, FiPhone } from "react-icons/fi";
import { AiOutlineMail }  from "react-icons/ai";

import DateTimePicker from 'react-datetime-picker';
import { getMentorDetails,getMentorDashboard,putSlot } from '/Users/ravi/Desktop/final/NurtureWebApp/client/template/src/helpers/mentors.js';
import { Redirect } from 'react-router-dom';

class Mentee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            menteeName:'NA',
            menteeEmail:'NA',
            contactNumber:'NA',
            meetingTime:console.log(new Date()),
            msg:"You don't have a mentee yet.",
            redirect:false,
            sessionMsg:''
        }
    }

    onChange = e => {
         this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
         e.preventDefault();
         const date = this.state.meetingTime;
         if(date === undefined){
             this.setState({sessionMsg:'Choose a time slot first.'});
         }
         else{
            this.setState({sessionMsg:''});
            const dateUpd = new Date(date);
            dateUpd.setHours(0);
            dateUpd.setMinutes(0);
            dateUpd.setSeconds(0);
            const stTime = new Date(date);
            const endTime = new Date(date);
            console.log(endTime);
            endTime.setHours(endTime.getHours()+1);
            putSlot(dateUpd,stTime,endTime).then((response)=>{
                console.log(response.data);
            });
            window.location.reload(false);
         }
    }

    componentDidMount(props){

       getMentorDashboard().then((response)=>{
           if(response.code === -1){
               this.setState({redirect:true});
           }
           if(response.code === 1){
            this.setState({redirect:false});
            this.setState({menteeName:response.data.name});
            this.setState({menteeEmail:response.data.email});
            this.setState({contactNumber:response.data.contactNumber});
            this.setState({msg:''});
           }
       });
    }
    render() {    
        const { menteeName,menteeEmail,contactNumber,msg,redirect,sessionMsg }  = this.state;
        if(!redirect)
        return (
            <Aux>
                <Row>
                    <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Sessions</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Session 1</h6>
                                            <p className="m-0">One line about session 1</p>
                                        </td>
                                        <td>
                                            <h6 className="text"><i className="fa fa-circle text-c-green f-10 m-r-15"/>11 MAY 12:56</h6>
                                        </td>
                                        <td>
                                            <a className="nav-link" href={DEMO.BLANK_LINK}>
                                                <FiFileText size="30px"/>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Session 2</h6>
                                            <p className="m-0">About Session 2</p>
                                        </td>
                                        <td>
                                            <h6 className="text"><i className="fa fa-circle text-c-green f-10 m-r-15"/>11 MAY 12:56</h6>
                                        </td>
                                        <td>
                                            <a className="nav-link" href={DEMO.BLANK_LINK}>
                                                <FiFileText size="30px"/>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Session 3</h6>
                                            <p className="m-0">About Session 3</p>
                                        </td>
                                        <td>
                                            <h6 className="text"><i className="fa fa-circle text-c-green f-10 m-r-15"/>11 MAY 12:56</h6>
                                        </td>
                                        <td>
                                            <a className="nav-link" href={DEMO.BLANK_LINK}>
                                                <FiFileText size="30px"/>
                                            </a>
                                        </td>
                                        
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Session 4</h6>
                                            <p className="m-0">About Session 4</p>
                                        </td>
                                        <td>
                                            <h6 className="text"><i className="fa fa-circle text-c-red f-10 m-r-15"/>Not Available</h6>
                                        </td>
                                        <td>
                                            <a className="nav-link" href={DEMO.BLANK_LINK}>
                                                <FiFileText size="30px"/>
                                            </a>
                                        </td>
                                        
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Session 5</h6>
                                            <p className="m-0">About Session 5</p>
                                        </td>
                                        <td>
                                            <h6 className="text"><i className="fa fa-circle text-c-red f-10 m-r-15"/>Not Available</h6>
                                        </td>
                                        <td>
                                            <a className="nav-link" href={DEMO.BLANK_LINK}>
                                                <FiFileText size="30px"/>
                                            </a>
                                        </td>
                                        
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Session 6</h6>
                                            <p className="m-0">About Session 6</p>
                                        </td>
                                        <td>
                                            <h6 className="text"><i className="fa fa-circle text-c-red f-10 m-r-15"/>11 MAY 12:56</h6>
                                        </td>
                                        <td>
                                            <a className="nav-link" href={DEMO.BLANK_LINK}>
                                                <FiFileText size="30px"/>
                                            </a>
                                        </td>
                                        
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-event'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Pick Session Date and Time</h5>
                                    </div>
                                </div>
                                <hr/>
                                <form noValidate onSubmit = {this.onSubmit}>
                                 <div className="input-group mb-4">
                                  <label for="meeting-time">Choose a time for your appointment:</label>
                                  <input type="datetime-local" id="meetingTime" name="meetingTime" value={this.state.meetingTime} onChange = {this.onChange}/>
                                 </div>
                                 <button type="submit" className="btn btn-primary shadow-2 mb-4">Confirm Slot</button>
                                 <p className="m-0">{sessionMsg}</p>
                                </form>
                            </Card.Body>
                        </Card>
                        <Card className='card-event '>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Mentee Details</h5>
                                    </div>
                                </div>
                                <h6 className="mt-2 f-w-300">{msg}</h6>
                                <h2 className="mt-2 f-w-300">{menteeName}</h2>
                                <h6 className="text-muted mt-3 mb-0">Mentee Experience Details</h6>
                                
                            </Card.Body>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                    <FiPhone color="#00e699" size="30px"/>
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{contactNumber}</h3>
                                        <span className="d-block text-uppercase">Mentee Contact Number</span>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <AiOutlineMail color="#00ace6" size="30px" />
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{menteeEmail}</h3>
                                        <span className="d-block text-uppercase">Mentee Email Address</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
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
                                        <Nav.Item>
                                            <Nav.Link eventKey="session5">Session 5</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="session6">Session 6</Nav.Link>
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
                                        <Tab.Pane eventKey="session5">
                                            <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                                            <a href={DEMO.BLANK_LINK}>Click here to get the full curriculam</a>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="session6">
                                            <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
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
        return <Redirect to = '/auth/mentor-signin'></Redirect>
    }
}

export default Mentee;