var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');
var app = express();
var userEmail = process.env.EMAIL;
var password = process.env.PASSWORD;
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: userEmail,
        pass: password
    }
});

app.use(cors())
app.use(bodyParser.json());
app.use('/send-mail', router);
router.post('/', sendMail);

function sendMail(req, res) {
    var body = req.body;
    var mailOptions = {
        from: userEmail,
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.text
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.json({resp: 'error'});
        } else {
            console.log('Message sent: ' + info.response);
            res.json({resp: info.response});
        };
    });
}

app.listen(4242, '0.0.0.0', (err) => {
    console.log('Listening at http://0.0.0.0:4242');
    if (err) {
        return console.log(`Server starting error: ${err}`);
    }
});
