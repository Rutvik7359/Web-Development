let mongo = require('./mongo');
let phone = require('./phone');

const MINUTE = 60000;
const DAY = 86400000;


let pruneDB = async function() {
	let curTime = new Date(Date.now());
	let reservations = await mongo.getAllReservations();
	for(let i in reservations) {
		let resTime = new Date(reservations[i].time);
		let timeAdded = new Date(reservations[i].timeAdded);
		if(curTime - resTime > DAY) {
			console.log("Removing id " + reservations[i]._id + ", expired.");
			mongo.deleteReservationById(reservations[i]._id).then(res => {
				console.log("Response: " + res);
			});
		}
		else if(reservations[i].table == -1 && curTime - timeAdded > MINUTE * 30) {
			console.log("Removing id " + reservations[i]._id + ", no table.");
			mongo.deleteReservationById(reservations[i]._id).then(res => {
				console.log("Response: " + res);
			});
		}
	}
}

let sendSMS = async function() {
	let curTime = new Date(Date.now());
	let reservations = await mongo.getAllReservations();
	for(let i in reservations) {
		let resTime = new Date(reservations[i].time);
		if(resTime - curTime <= 60 * MINUTE && resTime - curTime >= 59 * MINUTE) {
			console.log("Sending reminder to " + reservations[i].phone);
			phone.sendReminder(reservations[i].phone, '1 hour');
		}
	}
}

console.log("Initializing Database Manager");

// Prune DB once a minute
setInterval(pruneDB, MINUTE);

// Check for SMS timing every minute
setInterval(sendSMS, MINUTE);

console.log("Database Manager Initialized");