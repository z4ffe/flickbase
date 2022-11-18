const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

let transporter = nodemailer.createTransport({
   service: "Gmail",
   secure: true,
   auth: {
	  user: process.env.EMAIL,
	  pass: process.env.EMAIL_PW
   }
})

const registerEmail = async (userEmail, user) => {
   try {
	  const emailToken = user.generateVerificationToken()
	  let mailGenerator = new Mailgen({
		 theme: "default",
		 product: {
			name: "Flickbase",
			link: process.env.EMAIL_URL
		 }
	  })

	  const email = {
		 body: {
			name: userEmail,
			intro: 'Welcome to Flickbase',
			action: {
			   instructions: 'To verify your account, please click here:',
			   button: {
				  color: '#1a73e8',
				  text: 'Verify your account',
				  link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
			   }
			},
			outro: 'Need help, or have questions? Just reply to this email.'
		 }
	  }

	  let emailBody = mailGenerator.generate(email)
	  let message = {
		 from: process.env.EMAIL,
		 to: userEmail,
		 subject: "Welcome to Flickbase",
		 html: emailBody
	  }
	  await transporter.sendMail(message)
	  return true
   } catch (error) {
	  throw error
   }
}

module.exports = {registerEmail}
