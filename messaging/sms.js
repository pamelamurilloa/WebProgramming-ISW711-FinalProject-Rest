const authToken = process.env.AUTH_TOKEN
const accountSid = process.env.ACCOUNT_SID
const twilioPhoneNumber = process.env.TWILIO_NUMBER

const client = require('twilio')(accountSid, authToken);

const sendMessage = (clientPhoneNumber, secretCode) => {
    return client.messages.create({
        body: "This is your code: " + secretCode,
        from: twilioPhoneNumber,
        to: "+" + clientPhoneNumber
    });
}

module.exports = sendMessage;