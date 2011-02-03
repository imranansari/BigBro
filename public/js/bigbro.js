/**
 * Created by BigBro.
 * User: imranansari
 * Date: Jan 11, 2011
 * Time: 10:22:41 AM
 * To change this template use File | Settings | File Templates.
 */

(function() {
    window.onload = function() {

        var source = new EventSource('/pullNewActivity');
        source.addEventListener('message', function(e) {
            console.log(e.data);
            if (e.data.trim() === 'true') {
                addNewEvent();
            }
        }, false);

        source.addEventListener('open', function(e) {
            // Connection was opened.
        }, false);

        source.addEventListener('error', function(e) {
            if (e.eventPhase == EventSource.CLOSED) {
                // Connection was closed.
            }
        }, false);

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

            addActivities(activities);

        });

        function addActivities(activities) {
            jQuery.each(activities, function() {
                addActivity(this.activity);
            });
        }

        function addActivity(activity, animationType) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(activity.lat, activity.lng),
                map: map,
                title: activity.user,
                animation: animationType
            });

            $("<li/>", {
                text: activity.application + ' (' + activity.event + ')',
                click: function() {
                    google.maps.event.trigger(marker, 'click')
                }
            }).prependTo("#activityList");


            (function(acti, marker) {
                google.maps.event.addListener(marker, 'click', function() {

                    function getContent(activity) {
                        var content = 'User : ' + acti.user +
                                '</br> Application : ' + acti.application +
                                '</br> Event : ' + acti.event +
                                '</br> Location : ' + acti.location;
                        return content;
                    }

                    var infowindow = new google.maps.InfoWindow({
                        content: getContent(acti)
                    });

                    infowindow.open(map, marker);

                });
            })(activity, marker);

        }

        function addNewEvent() {
            console.log('add new event');

            $.get('/activities', {dataType : 'json'}, function(data) {
                var newActivities = data;
                jQuery.each(newActivities, function() {
                    if (!exists(this.activity.id)) {
                        console.log('new id :' + this.activity.id);
                        addActivity(this.activity, google.maps.Animation.DROP)
                    }
                });

            });
        }

        function exists(id) {
            var success = false;
            jQuery.each(activities, function() {
                if (this.activity.id === id) {
                    success = true;
                    return success;
                }
            });

            if (!success) {
                return false;
            } else {
                return true;
            }
        }
    };
})();
