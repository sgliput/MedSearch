            // THE EVENT LISTENER ASSOCIATED WITH THIS FUNCTION MUST BE DECLARED "PASSIVE" to avoid problems with the scrollbar.

            // Apparently Google's code calls initMap(), but they didn't declared in their code. We need to have it in our code else it fails with an error message, "initMap() is not declared as a function."

            var map;
            var latitude = 37.649054; // FOR TESTING ONLY
            var longitude = -77.615751; // FOR TESTING ONLY

            function initMap(latitude, longitude) {

                var myLatLng = {
                    lat: 37.649054,
                    lng: -77.615751
                };

                var map = new google.maps.Map(document.getElementById('mapDiv'), {
                    zoom: 15,
                    center: myLatLng
                });

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: 'Hello World!'
                });

                marker.setMap(map);
            }

            // THIS CALL IS FOR TESTING ONLY
            initMap(latitude, longitude);