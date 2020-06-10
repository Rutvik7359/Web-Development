let mongoose = require("mongoose");
let mongo = require("./mongo")
let url = "mongodb://localhost:27017/reservations"

// Reservation datatype model / Schema creation for use in database
let reservationSchema = new mongoose.Schema(
		{
			firstName: String,
			lastName: String,
			phone: String,
			people: Number,
			table: Number,
			time: Date,
			timeAdded: Date,
		}
	);

let Reservation = mongoose.model("reservation", reservationSchema);

// Establishes a connection to the MongoDB server. Reports status via console.
exports.init = function() {
	mongoose.connect(url, 
		{
			// Uses new features instead of older, deprecated versions
			"useNewUrlParser": true,
			"useFindAndModify": false,
			"useUnifiedTopology": true
		}
	);

	let db = mongoose.connection;
	db.on('open', () => console.log("Database connection established."))
	db.on('error', () => console.log(`Error: Could not connect to database at ${url}.`))
}

exports.addReservation = async function(firstName, lastName, phone, people, table, time, timeAdded) {
	let reservation = new Reservation({
		firstName: firstName,
		lastName: lastName,
		phone: phone,
		people: people,
		table: table,
		time: time,
		timeAdded: timeAdded
	});

	if(reservation !== await reservation.save()) {
		console.log(`Error saving reservation with id ${id}.`);
		return -1;
	}
	else {
		console.log(`Saved reservation for ${reservation.firstName} ${reservation.lastName}.`);
		return reservation._id;
	}
}

exports.setReservationTable = async function(id, table) {
	let result = await Reservation.findById(id);
	result.table = table;
	await result.save();
}

exports.getReservationById = async function(id) {
	result = await Reservation.findById(id);
	return result;
}

exports.getAllReservations = async function() {
	result = await Reservation.find();
	return result;
}

exports.getSecureReservations = async function() {
	result = await Reservation.find({}, 'phone table time');
	return result;
}

exports.getSortedReservations = async function() {
	result = await Reservation.find({}, null, { sort:  { time: 1 } } );
	return result;
}
exports.deleteReservationById = async function(id) {
	result = await Reservation.deleteOne({ _id: id });
	return result;
}

exports.deleteAllReservations = async function() {
	await Reservation.deleteMany();
}

mongo.init();