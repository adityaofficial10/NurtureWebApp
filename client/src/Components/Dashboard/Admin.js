import React from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import TableScrollbar from 'react-table-scrollbar';
import Aux from "../../hoc/_Aux";

import avatar from '../../assets/images/user/avatar.jpg';

import { getAdminDashboard } from '../../helpers/admins';
import { Redirect } from 'react-router-dom';
import FileUpload from '../FileUpload/FileUpload';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mentors: [],
            redirect: false,
            newUserInfo: {
                profileImages: []
            },
            msg: ''
        }
    }

    componentDidMount(props) {
        getAdminDashboard().then((data) => {
            const auth = data.authenticated;
            if (auth) {
                this.setState({ redirect: false });
                const mentorList = data.mentors;
                /*if (mentorList && Array.isArray(mentorList)) {
                    for (var x = 0; x < mentorList.length; x++)
                        allMentors.push(mentorList[x]);
                }*/
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
        this.setState({ newUserInfo: { ...this.state.newUserInfo, profileImages: files } });
    }

    handleSubmit(event) {
        event.preventDefault();
        //logic to create new user...
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
                                    <TableScrollbar rows={5}>
                                        <Table responsive hover>
                                            <tbody>
                                                {mentors.map((mentor, index) => (
                                                    <tr className="unread">
                                                        <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar} alt="activity-user" /></td>
                                                        <td>
                                                            <h6 className="mb-1">{mentor.name}</h6>
                                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                        </td>
                                                        <td>{mentor.email}</td>
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
                                    <form onSubmit={() => this.handleSubmit}>
                                        <FileUpload
                                            accept=".docx,.pdf,.jpg,.png,.jpeg,.txt,.mp3, .mp4, .mov"
                                            label="Content Files"
                                            multiple
                                            updateFilesCb={() => this.updateUploadedFiles}
                                        />
                                        <Button type = 'submit' variant="outline-primary"> Upload </Button>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Aux>
            );
        else
            return <Redirect to='/auth/admin-signin'></Redirect>;
    }
};

export default Admin;