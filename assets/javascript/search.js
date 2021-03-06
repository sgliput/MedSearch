// Get the modal
var modal = $("#searchModal");

// When the user clicks anywhere outside of the modal, it closes
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//When the user clicks on the X in the modal, it closes
$(".close").on("click", function () {
    $("#searchModal").modal("hide");
})


//URL and AJAX call to return a list of specialties from Better Doctor API
var queryURLSpecialties = "https://api.betterdoctor.com/2016-03-01/specialties?user_key=6894a66bcefd4390f03f3273fe0ba2e3";
var specialtiesArray = [];

$.ajax({
    url: queryURLSpecialties,
    method: "GET"
}).then(function (response) {
    var specialties = response.data;

    var nameArray = [];

    //adds UID and name of each specialty in returned data to specialtiesArray
    for (var i in specialties) {
        specialtiesArray.push({
            uid: specialties[i].uid,
            name: specialties[i].name
        });


    };

    //sorts objects in specialtiesArray alphabetically by the name value
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

    //adds the UID values into another array
    var specialtiesUID = [];
    for (var i in specialtiesArray) {
        specialtiesUID.push(specialtiesArray[i].uid);
    }

    //adds the name values into another array
    var specialtiesName = [];
    for (var i in specialtiesArray) {
        specialtiesName.push(specialtiesArray[i].name);
    }
    console.log(specialtiesName);

    //autocomplete function for specialty dropdown list
    $(function () {
        $("#specialty").autocomplete({
            source: specialtiesName,
            minLength: 3,

        });
    });
});

//submit button for doctor search
$("#submit").on("click", function (event) {
    event.preventDefault();

    //empties right side of screen of past results
    $("#doctorInfo").empty();
    $("#doctorHalf").show();
    $("#map").hide();

    //places input values into variables
    var name = $("#doctor").val().trim();
    var specialty = $("#specialty").val().trim();
    var state = $("#state").val().trim();
    var gender = $("#gender").val().trim().toLowerCase();
    var number = $("#numberofRecords").val().trim();
    var collapseNumber = 1;
    var foundSpecialty = false;


    //loops through specialtiesArray
    for (var i in specialtiesArray) {

        //if the value is in the specialtiesArray, the value is switched out for its corresponding uid to insert into the queryURL
        if (specialty === specialtiesArray[i].name) {
            foundSpecialty = true;
            $("#searchModal").modal("hide");
            specialty = specialtiesArray[i].uid;
        }
    }

    //validation message if specialty is not blank and if the value is not in the specialtiesArray
    if (!foundSpecialty && specialty !== "") {
        $('#searchModal').modal('show');
        $("#searchModalP").text("Choose a proper specialty or leave it blank.");
        $(".avatar").attr("src", "assets/images/finger-wagging.jpg");
    }

    //because a name value is required for API call, a validation message appears if the name input is left blank
    if (name == "") {
        $('#searchModal').modal('show');
        $("#searchModalP").text("Don't forget to add a doctor's name.");
        $(".avatar").attr("src", "assets/images/docshrug.jpg");
    }


    //because a blank gender parameter won't return anything, these nested if/else statements allows for whether the gender input is blank or not
    //if the number/limit parameter is blank, it will search 100 by default
    if (gender == "") {
        if (number == "") {
            var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&specialty_uid=" + specialty + "&limit=100&user_key=6894a66bcefd4390f03f3273fe0ba2e3";
        } else {
            var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&specialty_uid=" + specialty + "&limit=" + number + "&user_key=6894a66bcefd4390f03f3273fe0ba2e3";
        }
    } else {
        if (number == "") {
            var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&specialty_uid=" + specialty + "&gender=" + gender + "&limit=100&user_key=6894a66bcefd4390f03f3273fe0ba2e3";
        } else {
            var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&specialty_uid=" + specialty + "&gender=" + gender + "&limit=" + number + "&user_key=6894a66bcefd4390f03f3273fe0ba2e3";
        }
    }

    //AJAX call for main search
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var doctors = response.data;
        console.log(doctors);

        var foundDoctor = false;

        //loops through array of doctor results
        for (var i in doctors) {
            //loops through array of doctor licenses
            for (var h in doctors[i].licenses) {

                //if the doctor has a license that matches the value in the state input field
                if (doctors[i].licenses[h].state == state) {
                    foundDoctor = true;
                    //when a sorry message is returned, this removes it when other records are actually found
                    if ($(".sorry")) {
                        $(".sorry").remove();
                    }

                    console.log(doctors[i]);
                    //creates row for displaying data on found doctor
                    var newRow = $("<div class='row listing'></div><br>");

                    //if the name input value is in the doctor's middle name, that middle name is displayed; otherwise it is not

                    if (doctors[i].profile.middle_name === name) {
                        var doctorName = $("<p class='docName'>" + doctors[i].profile.first_name + " " + doctors[i].profile.middle_name + " " + doctors[i].profile.last_name + "</p>");
                    } else {
                        var doctorName = $("<p class='docName'>" + doctors[i].profile.first_name + " " + doctors[i].profile.last_name + "</p>");
                    }

                    //creates paragraph for displaying the found doctor's specialties, which are separated by a comma, except for the last one listed
                    var doctorSpecialties = $("<p><b>Specialties:</b> </p>");
                    for (var j = 0; j < doctors[i].specialties.length; j++) {
                        if (j === doctors[i].specialties.length - 1) {
                            doctorSpecialties.append(doctors[i].specialties[j].name);
                        } else {
                            doctorSpecialties.append(doctors[i].specialties[j].name + ", ");
                        }
                    }

                    //array for collecting state licenses
                    var licenseArray = [];
                    //creates paragraph for listing the states the doctor is licensed in
                    var licenses = $("<p><b>Licensed in:</b> </p>");

                    //pushes license states into licenseArray and ensures that there are no repeated values
                    for (var m = 0; m < doctors[i].licenses.length; m++) {
                        if (doctors[i].licenses[m].state) {
                            if ($.inArray(doctors[i].licenses[m].state, licenseArray) === -1) {
                                licenseArray.push(doctors[i].licenses[m].state);
                            }
                        }
                    }

                    //loops through licenseArray and adds comma-separated list of licenses to license paragraph
                    for (var n = 0; n < licenseArray.length; n++) {
                        if (n === licenseArray.length - 1) {
                            licenses.append(licenseArray[n]);
                        } else {
                            licenses.append(licenseArray[n] + ", ");
                        }
                    }

                    //array for collecting insurances accepted by doctor
                    var insuranceArray = [];
                    //if there are insurances listed, this creates a collapsible panel for listing them
                    if (doctors[i].insurances.length !== 0) {
                        var insurance = $(`<div class="panel panel-default">
                        <div class="panel-heading">
                          <p class="panel-title">
                            <a data-toggle="collapse" href="#collapse${collapseNumber}"><b>Insurances accepted:</b></a>
                          </p>
                        </div>`);

                        var insuranceDiv = $(`<div id="collapse${collapseNumber}" class="panel-collapse collapse"></div>`);
                        var insuranceList = $("<ul class='list-group'>");
                        insuranceDiv.append(insuranceList);
                        insurance.append(insuranceDiv);

                        //pushes insurance names into insuranceArray and ensures that there are no repeated values
                        for (var k = 0; k < doctors[i].insurances.length; k++) {
                            if ($.inArray(doctors[i].insurances[k].insurance_provider.name, insuranceArray) === -1) {
                                insuranceArray.push(doctors[i].insurances[k].insurance_provider.name);
                            }
                        }

                        //loops through insuranceArray and adds a list item for each insurance to the collapsible panel's ul (insuranceList)
                        for (var l = 0; l < insuranceArray.length; l++) {
                            insuranceList.append(`<li class="list-group-item">${insuranceArray[l]}</li>`);
                        }
                        //the collapseNumber increasing for each collapsible panel ensures that each one opens independently
                        collapseNumber++;
                    }

                    //if the practices array is not empty
                    if (doctors[i].practices.length !== 0) {
                        //if the phones array includes a fax and landline, this ensures that the landline is included in the row and formatted with a regular expression
                        if (doctors[i].practices[0].phones[0].type == "fax") {
                            var possPhone = doctors[i].practices[0].phones[1].number;
                            possPhone = possPhone.replace(/(\w{3})(\w{3})(\w{4})/, '($1) $2-$3');
                            var phone = $("<span class='phoneNumber'><b>Phone #:</b> " + possPhone + "</span>");

                        } else {
                            var possPhone = doctors[i].practices[0].phones[0].number;
                            possPhone = possPhone.replace(/(\w{3})(\w{3})(\w{4})/, '($1) $2-$3');
                            var phone = $("<span class='phoneNumber'><b>Phone #:</b> " + possPhone + "</span>");
                        }

                        //variables for the latitude, longitude, and name of the last practice listed in the practices array
                        var practices = doctors[i].practices;

                        var latitude = practices[practices.length - 1].lat;
                        var longitude = practices[practices.length - 1].lon;
                        var locationName = practices[practices.length - 1].name;

                        if (practices[practices.length - 1].visit_address.street2) {
                            var address = practices[practices.length - 1].visit_address.street + ", " + practices[practices.length - 1].visit_address.street2;
                        } else {
                            var address = practices[practices.length - 1].visit_address.street;
                        }

                        var zip = practices[practices.length - 1].visit_address.zip;
                        console.log(locationName + " is at latitude: " + latitude + ", longitude: " + longitude);

                        //variable and string literal for displaying name, city, and state of doctor's practice
                        var cityAndState = practices[practices.length - 1].visit_address.city + ", " + practices[practices.length - 1].visit_address.state;
                        var practiceAndCity = $(`<p><b>Practice:</b> ${locationName} in ${cityAndState}</p>`);

                        // creates clickable map link for toggling to map
                        console.log("location: " + locationName + " is at latitude: " + latitude + ", longitude: " + longitude);
                        var mapLink = $(`<a class='mapLink' data-latitude="${latitude}" data-longitude="${longitude}" data-name="${doctors[i].profile.first_name + " " + doctors[i].profile.last_name}" data-address="${address}" data-cityState="${cityAndState}" data-zip="${zip}"><p><b>Click here for map</b></p></a> <br>`);


                        newRow.append(mapLink);


                    };



                    //adds phone, specialties, and name to doctor row, and adds row to doctorInfo area
                    doctorName.append(phone);
                    doctorName.append(doctorSpecialties);
                    doctorName.append(practiceAndCity);
                    doctorName.append(licenses);
                    doctorName.append(insurance);

                    //if no map and phone number are returned (identifying information), then a link for a Google search is inserted, which will open in another window
                    if (!mapLink && !phone) {
                        var searchLink = $("<p>Not much info? <a href='https://www.google.com/search?q=dr.+" + doctors[i].profile.first_name + "+" + doctors[i].profile.last_name + "+" + state + "&oq=dr.+" + doctors[i].profile.first_name + "+" + doctors[i].profile.last_name + "+" + state + "' target='blank'>Click here to search Google.</a>");
                        doctorName.append(searchLink);
                    }

                    newRow.prepend(doctorName);

                    $("#doctorInfo").append(newRow);

                } else if (!foundDoctor) {
                    //if no results are found, sorry message appears
                    $("#doctorInfo").html("<h4 class='sorry'>Sorry, there are no doctors in that state that fit your criteria.</h4>");

                }
            }
        }

        //if nothing is returned at all, sorry message appears
        if ($('#doctorInfo').is(':empty')) {
            $("#doctorInfo").html("<h4 class='sorry'>Sorry, there are no doctors in that state that fit your criteria.</h4>");
        }
    });
});

//when mapLink is clicked
$(document.body).on("click", ".mapLink", function () {
    //toggles right half of screen from doctor results to map
    $("#doctorHalf").hide();
    $("#map").show();
    $("#locationMap").empty();
    //stores the doctor's name and displays it above map
    var doctorName = $(this).attr("data-name");
    var latitude = $(this).attr("data-latitude");
    var longitude = $(this).attr("data-longitude");
    var address = $(this).attr("data-address");

    var cityAndState = $(this).attr("data-cityState");
    var zip = $(this).attr("data-zip");
    console.log(doctorName);
    $("#chosenDoctor").text(doctorName);

    $("#doctorHeader").append(`<p class="addressP">${address}<br>${cityAndState} ${zip}`);

    console.log("latitude: " + latitude + ", longitude: " + longitude);
    renderMap(latitude, longitude);
});

//when X is clicked above map, it toggles back to doctor results
$(document.body).on("click", ".fa-times", function () {
    $("#map").hide();
    $(".addressP").remove();
    $("#doctorHalf").show();
})