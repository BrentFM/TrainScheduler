$( document ).ready(function() {
    // initialize firebase
    var config = {
        apiKey: "AIzaSyA1fUxEzJsQ_9rp_Z4tpIRyLU1RJH2XV6c",
        authDomain: "trainscheduler-bb25a.firebaseapp.com",
        databaseURL: "https://trainscheduler-bb25a.firebaseio.com",
        projectId: "trainscheduler-bb25a",
        storageBucket: "",
        messagingSenderId: "567348007417",
        appId: "1:567348007417:web:2e0ac79eef2b97e5"
      };

      firebase.initializeApp(config);
    
     var database = firebase.database();
    
    $("#addtrainbtn").on("click", function(event) {
        event.preventDefault();
    
        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
    
        var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
    
        var frequency = $("#freq").val().trim();
        
        var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
    


        var newTrain = {
            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyXMin: frequency
        };
    
    
        database.ref().push(newTrain);        
        $("#name").val("");
        $("#dest").val("");
        $("#firstTime").val("");
        $("#freq").val("");
            return false;
    });


    
    database.ref().on("child_added", function(childSnapshot) {
    
            console.log(childSnapshot.val());
            var trainName = childSnapshot.val().train;
            var destination =childSnapshot.val().trainGoing;
            var firstTime = childSnapshot.val().trainComing;
            var frequency = childSnapshot.val().everyXMin;
    
            var firstConverted = moment.unix(firstTime, "HH:mm").subtract(1, "years");
            
            var diffTime =  moment().diff(moment(firstConverted),"minutes");
    
            var trainRemain = diffTime % frequency;
    
            var minUntil = frequency - trainRemain;
    
            var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
    

            
            $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");
    
    });
    });
    
    