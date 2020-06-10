// TODO: call the database and store the object in a variable 
// TODO: call the tableReserved function and put the variable in the function
// TODO: profit
$(document).ready(function() {
	// Grab reservation id from cookies
	let cookies = document.cookie.split(';');
	let id = '';
	let res_time = '';
	for(let i in cookies) {
		let cookie = cookies[i].split('=');
		cookie[0] = cookie[0].trim();
		cookie[1] = cookie[1].trim();

		if(cookie[0] == 'id') {
			id = decodeURIComponent(cookie[1]);
			console.log("ID received: " + id);
		}
		else if(cookie[0] == 'res_time') {
			res_time = new Date(parseInt(decodeURIComponent(cookie[1])));
			console.log("Time received: " + res_time);
		}
	}

	var longTableNumber = 1; // initialize the long talbe number
	var shortTableNumber = 2; // initialise the short table numbers
	// Loop to automatically generate the tables in rows
	for( i = 0 ; i < 5; i++) {
		generateTableRow(longTableNumber, shortTableNumber);
		longTableNumber += 2; // Increment by 2 (long tables are odd)
		shortTableNumber += 2; // Increment by 2 (short tables are even)
	}
	generateBarTable();

	// Generate table submission links
	$("svg").find("a").click(function(){
		let table_id = encodeURIComponent($(this).find("rect").attr("id"));
		$(this).attr("href", "/submitTable?_id=" + id + "&table=" + table_id);
	});
	fetch('reservations').then(data => {
		data.json().then(reservations => {
			tableReserved(reservations, res_time);
		});
	});
});

// Function that generates SVGs of tables
function generateTableRow(longTableNumber, shortTableNumber) {
	var width = 650;
	var height = 270;

	// Create svg element
	var svg = d3.select("body")
							.append("svg")
							.attr("width", width)
							.attr("height", height);

	//Adding chairs for left tables
	svg.append("circle")
					.attr("cx", 55)
					.attr("cy", 20)
					.attr("r", 10)	
	
	svg.append("circle")
					.attr("cx", 115)
					.attr("cy", 20)
					.attr("r", 10)
	svg.append("circle")
					.attr("cx", 175)
					.attr("cy", 20)
					.attr("r", 10)

	svg.append("circle")
					.attr("cx", 55)
					.attr("cy", 175)
					.attr("r", 10)	
	
	svg.append("circle")
					.attr("cx", 115)
					.attr("cy", 175)
					.attr("r", 10)

	svg.append("circle")
					.attr("cx", 175)
					.attr("cy", 175)
					.attr("r", 10)

	svg.append("circle")
					.attr("cx", 220)
					.attr("cy", 95)
					.attr("r", 10)

	svg.append("circle")
					.attr("cx", 10)
					.attr("cy", 95)
					.attr("r", 10)
	

	// Create left table
	svg.append("a")
					.attr("tableID", longTableNumber)
					.append("rect")
					.attr("x", 50)
					.attr("y", 50)
					.attr("width", 130)
					.attr("height", 90)
					.attr("rx", 15)
					.attr("class", "left-side")
					.attr("id", longTableNumber);

	//adding chairs for right tables

	svg.append("circle")
					.attr("cx", 345)
					.attr("cy", 50)
					.attr("r", 10)
	svg.append("circle")
					.attr("cx", 385)
					.attr("cy", 50)
					.attr("r", 10)
	svg.append("circle")
					.attr("cx", 345)
					.attr("cy", 155)
					.attr("r", 10)
	svg.append("circle")
					.attr("cx", 385)
					.attr("cy", 155)
					.attr("r", 10)	

	// Create right table 
	svg.append("a")
					.attr("tableID", shortTableNumber)
					.append("rect")
					.attr("x", 325)
					.attr("y", 75)
					.attr("width", 75)
					.attr("height", 50)
					.attr("rx", 15)
					.attr("class", "right-side")
					.attr("id", shortTableNumber);
}

function generateBarTable(){
	var width = 650;
	var height = 270;

	// Create svg element for bar 
	var svg = d3.select("body")
							.append("svg")
							.attr("width", width)
							.attr("height", height);
	
	//append front bar side counter 						
	svg.append("rect")
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", 500)
					.attr("height", 50)
					.attr("rx", 15)
	//append left bar side counter 
	svg.append("rect")
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", 50)
					.attr("height", 250)
					.attr("rx", 15)
	//append cash counter
	svg.append("rect")
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", 150)
					.attr("height", 150)
					.attr("rx", 15)
	//append counter label
	svg.append("text")
					.attr("x", 35)
					.attr("y", 80)
					.style("fill","red")
					.text("Cash and Bar");
}

// Function to change the colour if the table is reserved 
function tableReserved(databaseData, res_time) {
	for(j = 0; j < databaseData.length; j++) {
		let time = new Date(databaseData[j].time);
		if(time.getHours() == res_time.getHours() && time.getMinutes() == res_time.getMinutes()){
			var tableNumber = databaseData[j].table;
			$("svg").find(`a[tableID=${tableNumber}]`).attr("style", "cursor: default");
			$("svg").find(`a[tableID=${tableNumber}]`).attr("onclick", "return false");
			$("#" + tableNumber).attr("fill", "pink"); // assign pink fill to all the tables in the object
			$("#" + tableNumber).attr("class", ""); // temporary fix to class overriding fill change
		}
	}
}
		
