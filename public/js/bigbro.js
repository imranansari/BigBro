/**
 * Created by BigBro.
 * User: imranansari
 * Date: Jan 11, 2011
 * Time: 10:22:41 AM
 * To change this template use File | Settings | File Templates.
 */

(function() {
    window.onload = function() {

        var options = {
            zoom: 12,
            center: new google.maps.LatLng(36.072435, -79.791353),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // Creating the map
        var map = new google.maps.Map(document.getElementById('map'), options);

        var activity = [
            {
                id: '1',
                user: 'Homer Simpson',
                application: 'LincPad',
                event: 'Contract Search',
                location: 'Springfield, Unknown',
                lat: '36.072435',
                lng: '-79.791353'
            },
            {
                id: '2',
                user: 'Marge Simpson',
                application: 'LincPad',
                event: 'Event Search',
                location: 'Springfield, Unknown',
                lat: '36.042709',
                lng:'-79.929537'
            }

        ];


        jQuery.each(activity, function() {

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.lat, this.lng),
                map: map,
                title: this.user
            });


            (function(activity, marker) {
                google.maps.event.addListener(marker, 'click', function() {

                    function getContent(activity) {
                        var content = 'User : ' + activity.user +
                                '</br> Application : ' + activity.application +
                                '</br> Event : ' + activity.event +
                                '</br> Location : ' + activity.location;
                        return content;
                    }

                    var infowindow = new google.maps.InfoWindow({
                        content: getContent(activity)
                    });

                    infowindow.open(map, marker);

                });

            })(this, marker);

        });

    };
})();
