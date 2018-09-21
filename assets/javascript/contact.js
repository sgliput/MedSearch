
// ========================================== START CODING BELOW!!

// Initialize Firebase
var config = {
    authDomain: "medsearch-7d20f.firebaseapp.com",
    databaseURL: "https://medsearch-7d20f.firebaseio.com/",
    projectId: "medsearch-7d20f",
};

firebase.initializeApp(config);

var dataRef = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();


    var contactName = $("#contact-name").val().trim();
    var contactEmail = $("#contact-email").val().trim();
    var contactComment = $("#contact-comment").val().trim();

    console.log(contactName);
    console.log(contactEmail);
    console.log(contactComment);


    dataRef.ref().push({
        name: contactName,
        email: contactEmail,
        comment: contactComment
    });



});