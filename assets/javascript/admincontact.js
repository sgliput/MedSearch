$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDn44NsY3peqVxfFN2JuO1lKRiWxMzbA9w",
        authDomain: "medsearch-7d20f.firebaseapp.com",
        databaseURL: "https://medsearch-7d20f.firebaseio.com",
        projectId: "medsearch-7d20f",
        storageBucket: "medsearch-7d20f.appspot.com",
        messagingSenderId: "839977621447"
    };

    firebase.initializeApp(config);

    var dataRef = firebase.database().ref();

    dataRef.on("child_added", function (snapshot) {
        console.log(snapshot.val());

        child = snapshot.val();
        var id = snapshot.key;
        console.log(id);

        console.log(child.name);

        var nametd = $("<td id='nametd'>" + child.name + "</td>");
        var emailtd = $("<td id='emailtd'>" + child.email + "</td>");
        var commenttd = $("<td id='commenttd'>" + child.comment + "</td>");

        var dataRowDisp = $("<tr>");
        dataRowDisp.append(nametd);
        dataRowDisp.append(emailtd);
        dataRowDisp.append(commenttd);

        $("#dataDisp").append(dataRowDisp);


        // snapshot.forEach(function(childSnapshot) {
        //     var key = childSnapshot.key;
        //     var childData = childSnapshot.val();

        //     console.log(key);
        //     console.log(childData);

        //     $("#nameVal").append(childData);

        // });

    }, function (error) {
        console.log("Error: " + error.code);
    });


});

