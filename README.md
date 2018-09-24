# MedSearch

## Home (Index) Page

The home page features an introduction to the MedSearch website and its purpose of connecting users with doctors. The navigation list and the Bootstrap carousel both contain links to the three main pages (index, search, and contact.html). A map image in the bottom right links to a map screen.

## Search Page

The most dynamic page of the website, the search page is divided in two. The left half contains several search field for doctor name, specialty, gender, city, state, and number of records to search. The name is the only field that is required, though a state must be chosen from the dropdown by default.

When the submit button is pressed, the right side of the page is populated with the doctors that fit the specified criteria. Each doctor row includes their name and specialty, and, if provided by the retrieved API record, their phone number, their city, the insurance they accept, and a link to plug their practice's coordinates into a map. When that map link is pressed, the right side of the screen toggles to the map showing where the medical practice is located. Clicking an X in the upper right toggles back to the list of doctors.

The specialty, gender, and city fields are optional, as is the number of records field, which inputs a limit of 10 records into the API URL by default if left empty. The specialty field is a dropdown that opens when three letters have been entered and provides an accepted list of specialty values. If none of those values are chosen and the typed value does not match the accepted specialties, an alert will insist on choosing an acceptable value.

An alert will also trigger if no name value is given for the search. If no records are returned for the search criteria, text in the right half of the screen will inform the user of that.

## Contact Page

