$(document).ready(function () {

    var config = {
        authDomain: "medsearch-7d20f.firebaseapp.com",
        databaseURL: "https://medsearch-7d20f.firebaseio.com/",
        projectId: "medsearch-7d20f",
    };

    firebase.initializeApp(config);

    var dataRef = firebase.database().ref();

   dataRef.on("value", function(snapshot) {
       console.log(snapshot.val());
       console.log(snapshot.val().text);
       $("#dispComments").text(snapshot.val().text);
    }, function (error) {
       console.log("Error: " + error.code);
    });


});

