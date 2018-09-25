var queryURLSpecialties = "https://api.betterdoctor.com/2016-03-01/specialties?user_key=6894a66bcefd4390f03f3273fe0ba2e3";
var specialtiesArray = [];

$.ajax({
    url: queryURLSpecialties,
    method: "GET"
}).then(function (response) {
    var specialties = response.data;

    var nameArray = [];
    for (var i in specialties) {
        specialtiesArray.push({
            uid: specialties[i].uid,
            name: specialties[i].name
        });


    };

    specialtiesArray.sort(function (a, b) {
        var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
    })

    console.log(specialtiesArray);
    var specialtiesUID = [];
    for (var i in specialtiesArray) {
        specialtiesUID.push(specialtiesArray[i].uid);
    }

    var specialtiesName = [];
    for (var i in specialtiesArray) {
        specialtiesName.push(specialtiesArray[i].name);
    }
    console.log(specialtiesName);

    $(function () {
        $("#specialty").autocomplete({
            source: specialtiesName,
            minLength: 3,

        });
    });
});


$("#submit").on("click", function (event) {
    event.preventDefault();
    $(".hideTillSearch").show();
    $("#doctorInfo").empty();
    var name = $("#doctor").val().trim();
    var specialty = $("#specialty").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var gender = $("#gender").val().trim().toLowerCase();
    var number = $("#numberofRecords").val().trim();

    for (var i in specialtiesArray) {
        if (specialty !== specialtiesArray[i].name) {
            $("#doctorInfo").html("<h4 class='sorry'>Choose a proper specialty.</h4>");
        }
        if (specialty === specialtiesArray[i].name) {
            specialty = specialtiesArray[i].uid;
        }
    }

    if (name == "") {
        $("#doctorInfo").html("<h4 class='sorry'>Don't forget to add a doctor's name.</h4>");
    }

    if (gender == "") {
        if (number == "") {
            var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&specialty_uid=" + specialty + "&limit=10&user_key=6894a66bcefd4390f03f3273fe0ba2e3";
        } else {
            var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&specialty_uid=" + specialty + "&limit=" + number + "&user_key=6894a66bcefd4390f03f3273fe0ba2e3";
        }
    } else {
        if (number == "") {
            var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&specialty_uid=" + specialty + "&gender=" + gender + "&limit=10&user_key=6894a66bcefd4390f03f3273fe0ba2e3";
        } else {
            var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&specialty_uid=" + specialty + "&gender=" + gender + "&limit=" + number + "&user_key=6894a66bcefd4390f03f3273fe0ba2e3";
        }
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var doctors = response.data;
        console.log(doctors);
        //displays in console only doctors with "internal medicine" mentioned in their bio and displays related image

        var foundDoctor = false;
        for (var i in doctors) {
            for (var h in doctors[i].licenses) {



                if (doctors[i].licenses[h].state == state) {
                    foundDoctor = true;
                    if ($(".sorry")) {
                        $(".sorry").remove();
                    }

                    console.log(doctors[i]);

                    var newRow = $("<div class='row listing'></div><br>");

                    if (doctors[i].profile.middle_name === name) {
                        var doctorName = $("<p class='docName'>" + doctors[i].profile.first_name + " " + doctors[i].profile.middle_name + " " + doctors[i].profile.last_name + "</p>");
                    } else {
                        var doctorName = $("<p class='docName'>" + doctors[i].profile.first_name + " " + doctors[i].profile.last_name + "</p>");
                    }
                    var doctorSpecialties = $("<p>Specialties: </p>");
                    for (var j = 0; j < doctors[i].specialties.length; j++) {
                        if (j === doctors[i].specialties.length - 1) {
                            doctorSpecialties.append(doctors[i].specialties[j].name);
                        } else {
                            doctorSpecialties.append(doctors[i].specialties[j].name + ", ");
                        }
                    }
                    if (doctors[i].practices.length !== 0) {
                        if (doctors[i].practices[0].phones[0].type == "fax") {
                            var possPhone = doctors[i].practices[0].phones[1].number;
                            possPhone = possPhone.replace(/(\w{3})(\w{3})(\w{4})/, '($1) $2-$3');
                            var phone = $("<span class='phoneNumber'>Phone #: " + possPhone + "</span>");

                        } else {
                            var possPhone = doctors[i].practices[0].phones[0].number;
                            possPhone = possPhone.replace(/(\w{3})(\w{3})(\w{4})/, '($1) $2-$3');
                            var phone = $("<span class='phoneNumber'>Phone #: " + possPhone + "</span>");
                        }

                        var practices = doctors[i].practices;
                        var latitude = practices[practices.length - 1].lat;
                        var longitude = practices[practices.length - 1].lon;
                        var locationName = practices[practices.length - 1].name;

                        // create map link
                        console.log("location: " + locationName + " is at latitude: " + latitude + ", longitude: " + longitude);
                        var mapLink = $("<a class='mapLink' data-latitude='" + latitude + "' data-longitude='" + longitude + "'data-name='" + doctors[i].profile.first_name + " " + doctors[i].profile.last_name + "' > Click here for map</a > <br>");

                        newRow.append(mapLink);
                    };

                    doctorName.append(phone);
                    doctorName.append(doctorSpecialties);


                    newRow.prepend(doctorName);



                    $("#doctorInfo").append(newRow);
                } else if (!foundDoctor) {
                    $("#doctorInfo").html("<h4 class='sorry'>Sorry, there are no doctors in that state that fit your criteria.</h4>");

                }
                //if(response.data[i].profile.bio.search("internal medicine") !== -1){
                //console.log(response.data[i]);
                //var source = response.data[i].profile.image_url;
                //$("img").attr("src", source);
            }
        }
        if ($('#doctorInfo').is(':empty')) {
            $("#doctorInfo").html("<h4 class='sorry'>Sorry, there are no doctors in that state that fit your criteria.</h4>");
        }
    });
});

$(document.body).on("click", ".mapLink", function () {
    $("#doctorHalf").hide();
    $("#map").show();
    var doctorName = $(this).attr("data-name");
    var latitude = $(this).attr("data-latitude");
    var longitude = $(this).attr("data-longitude");
    console.log(doctorName);
    $("#chosenDoctor").text(doctorName);
    console.log("latitude: " + latitude + "longitude: " + longitude);
    renderMap(latitude, longitude);
});

$(document.body).on("click", ".fa-times", function () {
    $("#map").hide();
    $("#doctorHalf").show();
})