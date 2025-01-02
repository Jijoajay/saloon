const express = require('express');
const bodyParser = require('body-parser');
const otpGenerator = require('otp-generator');
const router = express.Router();
const { Vonage } = require('@vonage/server-sdk')
const optmodel = require("../model/optmodel")
const nodemailer = require('nodemailer');

// Assume User model is defined somewhere
let optStoragetemparay;

router.post('/generateotp', async (req, res) => {
    const { phoneNumber,email} = req.body;
    const otp = otpGenerator.generate(6, { digits: true, specialChars: false,lowerCaseAlphabets: false ,upperCaseAlphabets: false   });
    optStoragetemparay=otp;
    console.log("ACUTUAL OTP",otp)
    
    // console.log("optStoragetemparay",optStoragetemparay)
    // const vonage = new Vonage({
    //     apiKey: "6623f9be",
    //     apiSecret: "bUF6QNUP7FxQSHbS"
    //   })
    //   const from = "Vonage APIs"
    //   const to = `91${phoneNumber}`
    //   const text = `Your opt for booking the appointment in the salon app ${otp} `    
    //   async function sendSMS() {
    //       await vonage.sms.send({to, from, text})
    //           .then(resp => { console.log('Message sent successfully'); console.log(resp); })
    //           .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
    //   } 

    // sendSMS(); 
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        // auth: {
        //   user: 'rolesonjg96@gmail.com' ,
        //   pass: 'kygk bnod qwrf ppzi '
        // }

        auth: {
            user: process.env.MAIL_USER ,
            pass: process.env.NODEMAILER_KEY 
          }
      });
        
        const mailOptions = {
            from: process.env.MAIL_USER, 
            to: email, 
            subject: 'OTP from salon app', 
            text: otp 
        };
    
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).send('Email could not be sent.');
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).send('Email sent successfully.');
            }      
       });

    const getoptuseremail = await optmodel.find({
        email: email,
    });
    const getoptuserpassword = await optmodel.find({  
        phonenumber: parseInt(phoneNumber)
    });

    if(getoptuseremail.length===0&&getoptuserpassword.length===0){
        console.log("NOT ALREADy theRE")
        const newusertempotp = new optmodel({
            otp: otp,
            email: email,
            phonenumber: parseInt(phoneNumber)
        });       
        newusertempotp.save()
            .then(savedUser => {
                console.log('User with OTP saved successfully:', savedUser);
                // Handle success
            })
            .catch(error => {
                console.error('Error saving user with OTP:', error);
                // Handle error
            });
    }
    else{
        console.log("ALREADY THERE",getoptuseremail,getoptuserpassword)

        optmodel.findOneAndUpdate(
            { email: email,    
        phonenumber: parseInt(phoneNumber)  }, 
            { otp: otp }, 
            { new: true } 
        )
        .then(updatedUser => {
            if (updatedUser) {
                console.log('User found and OTP updated successfully:', updatedUser);

            } else {
                console.log('User with the provided email not found.');
            }
        })
        .catch(error => {
            console.error('Error updating OTP:', error);
            // Handle error
        });
    }  
    try {
        // const user = await User.findOneAndUpdate({ phoneNumber }, { otp }, { upsert:ue }); 
        // console.log("optStoragetemparay",optStoragetemparay)     
        res.status(200).json({ message:"opt generated but temp not send to phone number",otp:otp});
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/verifyotp', async (req, res) => {
    const { otp,phoneNumber,email} = req.body;
    try {
        console.log("otpfromforntend",otp);
        console.log("phoneNumber",phoneNumber);
        console.log("email",email);
        const x = await optmodel.findOne({ email: email, phonenumber: parseInt(phoneNumber) });    
        console.log( x ," x ");
        const actualotp = x.otp;
        console.log("actualotp",actualotp);
        console.log("ENTERED otp",otp);
        // const user = await User.findOne({ phoneNumber });
        if ( parseInt(otp) === actualotp) {
          console.log('BOTHE ARE EQUAL')
        //  console.log(actualotp,"actualotp");
        //  console.log(otp,"otp");
            return res.status(200).json({ message: 'success' });
        }
        else{
            // console.log('BOTHE ARE  NOT EQUAL')
            // console.log(actualotp,"actualotp");
            // console.log(otp,"otp");
               return res.status(400).json({ error: 'Invalid OTP bro' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;