
var config = {
apiKey: "AIzaSyCGdJVRtGhR4YAmBMtoWp55VtESFYPJ-84",
authDomain: "reservation-site.firebaseapp.com",
databaseURL: "https://reservation-site-c2977.firebaseio.com/",
storageBucket: "reservation-site.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

var reservationData = {}

$('.reservation-day li').on('click', function() {
	reservationData.day = $(this).text();
});

$('.reservation-form').on('submit', function(e) {
	e.preventDefault();

	reservationData.name = $('.reservation-name').val();

	database.ref('reservation-form').push(reservationData);
});
function getReservations() { 
database.ref('reservation-form').on('child_added', function(snapshot) {

	var bookedReservations = $('.booked-reservations');
	var reservations = snapshot.val();
	var source = $('#reservation-template').html();
	var template = Handlebars.compile(source);
	var reservationTemplate = template(reservations);
	bookedReservations.append(reservationTemplate);
});
};
getReservations();

function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false
  });

	var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
  });
}