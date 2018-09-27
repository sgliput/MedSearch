$(document).ready(function () {

    $("#notsignedin").hide();

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

    var user = firebase.auth().currentUser;

    console.log(user);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $("#notsignedin").hide();
            $("#displayData").show();
            $("#signout").show();

            dataRef.on("child_added", function (snapshot) {
                // console.log(snapshot.val());

                child = snapshot.val();
                var id = snapshot.key;
                // console.log(id);

                // console.log(child.name);

                var nametd = $("<td id='nametd'>" + child.name + "</td>");
                var emailtd = $("<td id='emailtd'>" + "<a href='mailto:" + child.email + "'>" + child.email + "</a>" + "</td>");
                var commenttd = $("<td id='commenttd'>" + child.comment + "</td>");

                var dataRowDisp = $("<tr>");
                dataRowDisp.append(nametd);
                dataRowDisp.append(emailtd);
                dataRowDisp.append(commenttd);

                $("#dataDisp").append(dataRowDisp);


            }, function (error) {
                console.log("Error: " + error.code);
            });
        } else {
            console.log("user is not signed in");
            $("#displayData").hide();
            $("#notsignedin").show();
            $("#signout").hide();
        }


        // dataRef.on("child_added", function (snapshot) {
        //     // console.log(snapshot.val());

        //     child = snapshot.val();
        //     var id = snapshot.key;
        //     // console.log(id);

        //     // console.log(child.name);

        //     var nametd = $("<td id='nametd'>" + child.name + "</td>");
        //     var emailtd = $("<td id='emailtd'>" + child.email + "</td>");
        //     var commenttd = $("<td id='commenttd'>" + child.comment + "</td>");

        //     var dataRowDisp = $("<tr>");
        //     dataRowDisp.append(nametd);
        //     dataRowDisp.append(emailtd);
        //     dataRowDisp.append(commenttd);

        //     $("#dataDisp").append(dataRowDisp);


        // }, function (error) {
        //     console.log("Error: " + error.code);
        // });

        $("#signout").on("click", function (event) {
            firebase.auth().signOut();
            console.log("signout");
            window.location.href = "contact.html";
        });

    });
});
