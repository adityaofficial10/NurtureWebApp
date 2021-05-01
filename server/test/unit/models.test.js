const Mocha = require('mocha');
const mocha = new Mocha();
const chai = require('chai');
const assert = require('assert');
const userModel = require('../../app/api/models/Users');
const mentorModel = require('../../app/api/models/mentors');
const eventModel = require('../../app/api/models/events');
const requestModel = require('../../app/api/models/requests');
const slotModel = require('../../app/api/models/slots');
const mongoose = require('../../config/database'); //database configuration


const expect = chai.expect;


describe('Models: ', function() {

    before(() => {
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    });

    describe('User Model ', function() {
        it('should return no data when incorrect key is passed.', function(done) {
            userModel.findOne({email:'nurture@example.com'}, function(err, userInfo){
                if(err)
                 throw err;
                expect(err).to.be.null;
                expect(userInfo).to.be.null;
            });
            done();
        });
        it('should return data in the correct format when correct key is passed.', function(done) {
            userModel.findOne({email:'adityaberasia@gmail.com'}, function(err, userInfo){
                const user = userInfo._doc;
                expect(err).to.be.null;
                expect(user).to.haveOwnProperty('name');
                expect(user).to.haveOwnProperty('email');
                expect(user).to.haveOwnProperty('password');
                expect(user).to.haveOwnProperty('dateOfBirth');
                expect(user).to.haveOwnProperty('contactNumber');
                expect(user).to.haveOwnProperty('age');
                done();
            });
        });
    });

    describe('Mentor Model ', function() {
        it('should return no data when incorrect key is passed.', function(done) {
            userModel.findOne({email:'nurture@example.com'}, function(err, mentorInfo){
                expect(err).to.be.null;
                expect(mentorInfo).to.be.null;
            });
            done();
        });
        it('should return data in the correct format when correct key is passed.', function(done) {
            mentorModel.findOne({email:'adityaberasia@gmail.com'}, function(err, mentorInfo){
                const mentor = mentorInfo._doc;
                expect(err).to.be.null;
                expect(mentor).to.haveOwnProperty('name');
                expect(mentor).to.haveOwnProperty('email');
                expect(mentor).to.haveOwnProperty('password');
                expect(mentor).to.haveOwnProperty('dateOfBirth');
                expect(mentor).to.haveOwnProperty('contactNumber');
                expect(mentor).to.haveOwnProperty('age');
                expect(mentor).to.haveOwnProperty('available');
                done();
            });
        });
    });

    describe('Events Model ', function() {
        it('should return no data when incorrect key is passed.', function(done) {
            eventModel.findOne({title:'newEvent'}, function(err, eventInfo){
                expect(err).to.be.null;
                expect(eventInfo).to.be.null;
            });
            done();
        });
        it('should return data in the correct format when correct key is passed.', function(done) {
            eventModel.findOne({title:'Event'}, function(err, eventInfo){
                const event = eventInfo._doc;
                expect(err).to.be.null;
                expect(event).to.haveOwnProperty('title');
                expect(event).to.haveOwnProperty('description');
                expect(event).to.haveOwnProperty('mentor');
                expect(event).to.haveOwnProperty('mentorName');
                expect(event).to.haveOwnProperty('student');
                expect(event).to.haveOwnProperty('date');
                expect(event).to.haveOwnProperty('startTime');
                expect(event).to.haveOwnProperty('endTime');
                done();
            });
        });
    });

    describe('Request Model ', function() {
        it('should return no data when incorrect key is passed.', function(done) {
            requestModel.findOne({title:'Nothing'}, function(err, requestInfo){
                expect(err).to.be.null;
                expect(requestInfo).to.be.null;
            });
            done();
        });
        it('should return data in the correct format when correct key is passed.', function(done) {
            requestModel.findOne({title:'Request'}, function(err, requestInfo){
                const request = requestInfo._doc;
                expect(err).to.be.null;
                expect(request).to.haveOwnProperty('title');
                expect(request).to.haveOwnProperty('description');
                expect(request).to.haveOwnProperty('mentor');
                expect(request).to.haveOwnProperty('student');
                expect(request).to.haveOwnProperty('date');
                expect(request).to.haveOwnProperty('startTime');
                expect(request).to.haveOwnProperty('endTime');
                done();
            });
        });
    });

    describe('Slot Model ', function() {
        it('should return no data when incorrect key is passed.', function(done) {
            slotModel.findOne({mentorName : 'Person'}, function(err, slotInfo){
                expect(err).to.be.null;
                expect(slotInfo).to.be.null;
            });
            done();
        });
        it('should return data in the correct format when correct key is passed.', function(done) {
            slotModel.findOne({mentorName:'Jack'}, function(err, slotInfo){
                const slot = slotInfo._doc;
                expect(err).to.be.null;
                expect(slot).to.haveOwnProperty('available');
                expect(slot).to.haveOwnProperty('mentorName');
                expect(slot).to.haveOwnProperty('mentor');
                expect(slot).to.haveOwnProperty('date');
                expect(slot).to.haveOwnProperty('startTime');
                expect(slot).to.haveOwnProperty('endTime');
                done();
            });
        });
    });
});