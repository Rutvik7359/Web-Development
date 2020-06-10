let dotenv = require("dotenv");

dotenv.config();

let twilioSID = process.env.TWILIO_SID;
let twilioToken = process.env.TWILIO_TOKEN;

let twilio = require("twilio")(twilioSID, twilioToken);
let hostNum = '+16474964230'

exports.sendReminder = function(phone, time) {
	let text = "Reminder: Your reservation is in " + time + ".";
	twilio.messages.create({
		body: text,
		from: hostNum,
		to: phone
	});
}