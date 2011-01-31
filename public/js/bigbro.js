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
            zoom: 5,
            center: new google.maps.LatLng(37.9985779, -98.6134051),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // Creating the map
        var map = new google.maps.Map(document.getElementById('map'), options);
        var activities;

        $.get('/activities', {dataType : 'json'}, function(data) {
            activities = data;
            console.log(activities);

            /*activity = [
             {
             id: '1',
             user: 'Homer Simpson',
             application: 'LincPad',
             event: 'Contract Search',
             location: '36.072435, -79.791353',
             lat: '36.072435',
             lng: '-79.791353'
             },
             {
             id: '2',
             user: 'Marge Simpson',
             application: 'LincPad',
             event: 'Event Search',
             location: '36.042709, -79.929537',
             lat: '36.042709',
             lng:'-79.929537'
             }

             ];*/


            jQuery.each(activities, function() {

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(this.activity.lat, this.activity.lng),
                    map: map,
                    title: this.activity.user
                });

                $("<li/>", {
                    text: this.activity.application + ' (' + this.activity.event + ')',
                    click: function() {
                        google.maps.event.trigger(marker, 'click')
                    }
                }).appendTo("#activityList");


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
                })(this.activity, marker);
            });
        });
    };
})();
