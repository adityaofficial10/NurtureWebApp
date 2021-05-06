import React, { useState } from 'react';
import { Row, Col, Card, Table, Tab, Nav, Button } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import FileUpload from '../FileUpload/FileUpload';



function MentorProfile (){

    const[newUserInfo, setNewUserInfo] = useState({
        profileImages: []
    });

    const updateUploadedFiles = (files) =>
        setNewUserInfo({ ...newUserInfo, profileImages: files });

    const handleSubmit = (event) => {
        event.preventDefault();
        //logic to create new user...
    };

    return(
       <Aux>
         <Row>
           <Col md = {6} xl = {6}>
             
           </Col>
           <Col md = {6} xl = {6}>
             <p>Upload your profile picture:</p>
             <form onSubmit={handleSubmit}>
                <FileUpload
                    accept=".jpg,.png,.jpeg"
                    label="Profile Image(s)"
                    multiple
                    updateFilesCb={updateUploadedFiles}
                />
                <button type="submit">Update</button>
             </form>
           </Col>
         </Row>
       </Aux >
      );
};

export default MentorProfile;