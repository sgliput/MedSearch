// init config variables for firebase
var config = {
    authDomain: "medsearch-7d20f.firebaseapp.com",
    databaseURL: "https://medsearch-7d20f.firebaseio.com/",
    projectId: "medsearch-7d20f",
};

//init firebase, get dataRef var for contact database
firebase.initializeApp(config);

var dataRef = firebase.database();

// When 'submit' is clicked...
$("#submit").on("click", function (event) {
    event.preventDefault();

    // init variables for functionality
    var contactName = $("#contact-name").val().trim();
    var contactEmail = $("#contact-email").val().trim();
    var contactComment = $("#contact-comment").val().trim();
    var validEmail = false;
    var validComment = false;
    var validName = false;

    // check if whether Name & Comment fields are empty
    if (contactName.length == 0) {
        console.log("name empty");
        $("#name-label").css("color", "#FF0000");
        $("#name-label").html("Your Name (*field required)");
    } else {
        validName = true;
        $("#name-label").css("color", "#000000");
        $("#name-label").html("Your Name");
    }

    if (contactComment == 0) {
        console.log("comment empty")
        $("#comment-label").css("color", "#FF0000");
        $("#comment-label").html("Question / Comment (*field required)");
    } else {
        validComment = true;
        $("#comment-label").css("color", "#000000");
        $("#comment-label").html("Question / Comment");
    }

    // check if valid email input
    if (!checkEmail(contactEmail)) {
        console.log("not an email");
        $("#email-label").css("color", "#FF0000");
        $("#email-label").html("Your E-mail Address (*invalid e-mail)");
    } else {
        validEmail = true;
        $("#email-label").css("color", "#000000");
        $("#email-label").html("Your E-mail Address");
    }


    // If all form input fields valid, then push to firebase
    if (validName && validEmail && validComment) {
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

// validate if proper Email input format
function checkEmail(email) {
    var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
}