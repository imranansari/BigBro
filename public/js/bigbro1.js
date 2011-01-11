/**
 * Created by BigBro.
 * User: imranansari
 * Date: Jan 11, 2011
 * Time: 10:22:41 AM
 * To change this template use File | Settings | File Templates.
 */

(function() {
    window.onload = function() {

        // Creating an object literal containing the properties
        // we want to pass to the map
        var options = {
            zoom: 12,
            center: new google.maps.LatLng(36.072435, -79.791353),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // Creating the map
        var map = new google.maps.Map(document.getElementById('map'), options);

        // Adding a marker to the map
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(36.072435, -79.791353),
            map: map,
            title: 'Lincoln Financial Group'
        });

        var marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(36.072519, -79.790133),
            map: map,
            title: 'United Guaranty'
        });

        // Creating an InfoWindow with the content text: "Hello World"
        var infowindow = new google.maps.InfoWindow({
            content: 'United Guaranty'
        });

        // Adding a click event to the marker
        google.maps.event.addListener(marker, 'click', function() {
            // Calling the open method of the infoWindow
            infowindow.open(map, marker);
        });

        google.maps.event.addListener(marker2, 'click', function() {
            // Calling the open method of the infoWindow
            infowindow.open(map, marker2);
        });

    };
})();
