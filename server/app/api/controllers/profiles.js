'use strict';

module.exports = {

  userProfile: async function(req, res, next) {
    const userEmail = req.query.email;
    if (!userEmail) {
      res.json({status: 404, message: 'The user email ID was not provided.',
        data: null});
    } else {
      userModel.findOne({email: userEmail}, function(_err, userInfo) {
        if (_err)
          throw _err;
        if (!userInfo)
          res.json({status: 404,
            message: 'There is no user account linked with this email.',
            data: null});
        res.json({status: 200, message: 'User Found!', data: userInfo});
      });
    }
  },
  mentorProfile: async function(req, res, next) {
    const mentorEmail = req.query.email;
    if (!mentorEmail) {
      res.json({status: 404, message: 'The mentor email ID was not provided.',
        data: null});
    } else {
      mentorModel.findOne({email: mentorEmail}, function(_err, mentorInfo) {
        if (_err)
          throw _err;
        if (!mentorInfo)
          res.json({status: 404,
            message: 'There is no mentor account linked with this email.',
            data: null});
        res.json({status: 200, message: 'Mentor Found!', data: mentorInfo});
      });
    }
  },
};
