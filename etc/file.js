let express = require('express');
let app = express();
app.use('/music',express.static('tests'));
app.listen(8081)
/*var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ehisvictorobose@gmail.com',
    pass: 'Victor@2007'
  }
});

var mailOptions = {
  from: 'titiloyepaul68@gmail.com',
  to: 'titiloyepaul68@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/
