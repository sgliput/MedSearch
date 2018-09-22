
// ========================================== START CODING BELOW!!

// Initialize Firebase
var config = {
    authDomain: "medsearch-7d20f.firebaseapp.com",
    databaseURL: "https://medsearch-7d20f.firebaseio.com/",
    projectId: "medsearch-7d20f",
};

firebase.initializeApp(config);

var dataRef = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();

    var contactName = $("#contact-name").val().trim();
    var contactEmail = $("#contact-email").val().trim();
    var contactComment = $("#contact-comment").val().trim();
    var validEmail = false;
    var validComment = false;
    var validName = false;

    if (contactName.length == 0) {
        console.log("name empty");
        $("#name-label").css("color", "#FF0000");
        $("#name-label").html("Your Name (*field required)");
    } else {
        validName = true;
    }

    if (contactComment == 0) {
        console.log("comment empty")
        $("#comment-label").css("color", "#FF0000");
        $("#comment-label").html("Question / Comment (*field required)");
    } else {
        validComment = true;
    }

    if (!checkEmail(contactEmail)) {
        console.log("not an email");
        $("#email-label").css("color", "#FF0000");
        $("#email-label").html("Your E-mail Address (*invalid e-mail)");
    } else {
        validEmail = true;
    }


    if(validName && validEmail && validComment){
    console.log(contactName);
    console.log(contactEmail);
    console.log(contactComment);


    dataRef.ref().push({
        name: contactName,
        email: contactEmail,
        comment: contactComment
    });
}





});

function checkEmail(email) {
    var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
}