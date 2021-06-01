import React from 'react';
import { Row, Col, Card, Table, Button, Modal } from 'react-bootstrap';
import TableScrollbar from 'react-table-scrollbar';
import Aux from "../../hoc/_Aux";

import avatar from '../../assets/images/user/avatar.jpg';

import { getAdminDashboard, handleUpload } from '../../helpers/admins';
import { Redirect } from 'react-router-dom';
import FileUpload from '../FileUpload/FileUpload';
import Alert from 'react-popup-alert';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mentors: [],
            redirect: false,
            newUserInfo: {
                profileImages: []
            },
            show: false,
            msg: '',
            alertHeader: 'Success',
            alertMsg: '',
            color: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.updateUploadedFiles = this.updateUploadedFiles.bind(this);
    }

    componentDidMount(props) {
        getAdminDashboard().then((data) => {
            const auth = data.authenticated;
            if (auth) {
                this.setState({ redirect: false });
                const mentorList = data.mentors;
                this.setState({ mentors: mentorList });
                console.log(this.state.mentors);
                if (!mentorList.length)
                    this.setState({ msg: 'There are currently no mentors registered on the platform currently.' });
            }
            else {
                this.setState({ redirect: true });
            }
        });
    }

    updateUploadedFiles(files) {
        console.log(files); 
        this.setState({ newUserInfo: {...this.state.newUserInfo, profileImages: files } });
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("Heelp");
        var data = new FormData();
        Array.isArray(this.state.newUserInfo.profileImages) && this.state.newUserInfo.profileImages.map((file, index) => {
            data.append('file', file, `contentfile-${new Date()}-${index}`);
        });
        console.log(data.get('file'));
        handleUpload(data).then((response) => {
            if(response.code === 1) {
                this.setState({alertMsg: 'The content files have been uploaded successfully..', alertHeader: 'SUCCESS', color: 'green'});
                this.setState({show: true});
                this.setState({newUserInfo: {...this.state.newUserInfo, profileImages: [] }});
            } else {
                this.setState({alertMsg: 'Sorry there was a problem.', alertHeader: 'FAILURE', color: 'red'});
                this.setState({show: true});
                this.setState({newUserInfo: {...this.state.newUserInfo, profileImages: [] }});
            }
        });
    }

    render() {
        var { redirect, mentors, msg } = this.state;
        if (!redirect)
            return (
                <Aux>
                    <Row>
                        <Col md={6} xl={6}>
                            <Card className="Recent-Users">
                                <Card.Header>
                                    <Card.Title as='h5'>Mentors List</Card.Title>
                                </Card.Header>
                                <Card.Body className='px-0 py-2'>
                                    <h6 className="mb-1">{msg}</h6>
                                    <TableScrollbar rows={5.9}>
                                        <Table responsive hover>
                                            <tbody>
                                                {mentors.map((mentor, index) => (
                                                    <tr className="unread">
                                                        <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar} alt="activity-user" /></td>
                                                        <td>
                                                            <h6 className="mb-1">{mentor.name}</h6>
                                                            <p className="m-0">{mentor.email}</p>
                                                        </td>
                                                        <td>
                                                            <h6 className="mb-1">Sessions Conducted: </h6>
                                                            <p className="m-0">{mentor.sessions !== undefined ? mentor.sessions : (<span style = {{color: 'red'}}>INACTIVE</span>)}</p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </TableScrollbar>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Card.Title as='h5'>Content Corner</Card.Title>
                                </Card.Header>
                                <Card.Body className='px-0 py-2'>
                                    <form id = {"upload"} onSubmit={(e) => this.onSubmit(e)}>
                                        <FileUpload
                                            accept=".docx,.pdf,.jpg,.png,.jpeg,.txt,.mp3, .mp4, .mov"
                                            label="Content Files"
                                            multiple
                                            updateFilesCb={(files) => this.updateUploadedFiles(files)}
                                        />
                                        <Button type='submit' variant="outline-primary" form = {"upload"}> Upload </Button>
                                    </form>
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
                                        <Button variant="success" onClick={() => {this.setState({ show: false }); window.location.reload(false);}}>
                                            OK
                                        </Button>
                                    </Modal.Body>
                                </Modal>
                        </Col>
                    </Row>
                </Aux>
            );
        else
            return <Redirect to='/auth/admin-signin'></Redirect>;
    }
};

export default Admin;