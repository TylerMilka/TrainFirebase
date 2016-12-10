  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBeAG4anjql7qVrH9RIyk2olaGLMNc6unE",
    authDomain: "fir-trainproject.firebaseapp.com",
    databaseURL: "https://fir-trainproject.firebaseio.com",
    storageBucket: "fir-trainproject.appspot.com",
    messagingSenderId: "999700127736"
  };
  firebase.initializeApp(config);

 var database = firebase.database();
$(document).ready(function(){
  // on click for form submission
  	$("#submit").click(function(){
  		var name = $("#nameinput").val().trim();
  		var destination = $("#destinput").val().trim();
  		var time = $("#timeinput").val().trim();
  		var frequency = $("#freqinput").val().trim();

  		console.log(name);
  		console.log(destination);
  		console.log(time);
  		console.log(frequency);

  		//pushing input into firebase
  		database.ref().push({
  			name: name,
  			destination: destination,
  			time: time,
  			frequency: frequency
  		})
	  		//clear input fields after submission
	  		$("input").val('');
	  		return false;
}); // onclick

  //  on click child added function
  database.ref().on("child_added", function(childSnapshot){
  		// pull the data
  		var name = childSnapshot.val().name;
  		var destination = childSnapshot.val().destination;
  		var time = childSnapshot.val().time;
  		var frequency = childSnapshot.val().frequency;
	
			console.log("Name: " + name);
			console.log("Destination: " + destination);
			console.log("Time: " + time);
			console.log("Frequency: " + frequency);
			console.log(moment().format("hh:mm"));

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(time,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);
		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);
		// Time apart (remainder)
		var tRemainder = diffTime % frequency;
		console.log(tRemainder);
		// Minute Until Train
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));	

	//display in the top table by appending 
	var newElement = $("<tr/>").attr("data-name", name);
	  newElement.append($("<td/> ").text(name));
	  newElement.append($("<td/> ").text(destination));
	  newElement.append($("<td/> ").text(frequency));
	  newElement.append($("<td/> ").text(nextTrain)); 
	  newElement.append($("<td/> ").text(tMinutesTillTrain));
	  $(".table").append(newElement);

});	// child added
})