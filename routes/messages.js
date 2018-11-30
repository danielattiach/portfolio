const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const keys = require('../config/keys');

router.post('/send', (req, res) => {
  const msg = `
    <p>You have a new message</p>
    <h3>Contact details:</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message:</h3>
    <p style="text-decoration: underline">Subject: ${req.body.subject}</p>
    <p>${req.body.message}</p>
    `;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: keys.sendEmail,
            pass: keys.emailPass
        }
    });

  const mailOptions = {
    from: keys.sendEmail,
    to: keys.sendEmail,
    subject: 'New Message',
    html: msg
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if(err)
      //console.log(err)
      res.json({status: 500})
    else
      //res.send(info);
      res.json({status: 200})
  });

});

module.exports = router;
