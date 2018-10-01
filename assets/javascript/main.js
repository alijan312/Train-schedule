 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyBKIttZer23xpWRrTVCkXiEzBlK47tGcIo",
   authDomain: "train-schedule-a077c.firebaseapp.com",
   databaseURL: "https://train-schedule-a077c.firebaseio.com",
   projectId: "train-schedule-a077c",
   storageBucket: "",
   messagingSenderId: "74325657545"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

 var trainName = '';
 var destination = '';
 var firstTrainTime = '';
 var frequency = '';


 $('#button').on('click', function (event) {
   event.preventDefault();
   trainName = $("#train-input").val().trim();
   destination = $("#destination-input").val().trim();
   firstTrainTime = $("#firstTrain-input").val().trim();
   frequency = $("#frequency-input").val().trim();
   console.log(trainName);
   console.log(destination);
   console.log(firstTrainTime);
   console.log(frequency);

   database.ref().push({
     trainName: trainName,
     destination: destination,
     firstTrainTime: firstTrainTime,
     frequency: frequency,

   });

   $('#train-input').val('');
   $('#destination-input').val('');
   $('#firstTrain-input').val('');
   $('#frequency-input').val('');
 });

 database.ref().on('child_added', function (childSnapshot) {

   var firstTimeConverted = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
   console.log(firstTimeConverted);

  //  var currentTime = moment();
  //  console.log('current time: ' + moment(currentTime).format('hh:mm'));

   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log('difference in time: ' + diffTime);

   var tRemainder = diffTime % childSnapshot.val().frequency;
   console.log(tRemainder);

   var minutesAway = childSnapshot.val().frequency - tRemainder;
   console.log("MINUTES TILL TRAIN: " + minutesAway);

   var nextArrival = moment().add(minutesAway, "minutes");
   nextArrival = moment(nextArrival).format("hh:mm");
 

   var row = $('<tr>');
   row.append(`<td>${childSnapshot.val().trainName}</td>`);
   row.append(`<td>${childSnapshot.val().destination}</td>`);
   row.append(`<td>${childSnapshot.val().frequency}</td>`);
   row.append(`<td>${nextArrival}</td>`);
   row.append(`<td>${minutesAway}</td>`);
   $('#tBody').append(row);





 });