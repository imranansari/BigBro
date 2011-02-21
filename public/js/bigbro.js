/**
 * Created by BigBro.
 * User: imranansari
 * Date: Jan 11, 2011
 * Time: 10:22:41 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function () {
    $('body').layout({ applyDefaultStyles: true });

    $('#panel2').slidePanel({
        triggerName: '#trigger2',
        triggerTopPos: '36px',
        panelTopPos: '35px',
        panelOpacity: 0.7
    });

    var activities;
    //var selectedApps = new Array('LincPad', 'iEngage');

    $('input[name="apps"]').change(function() {
        var selectedApps = $('input[name="apps"]').serialize();
        if (selectedApps.length > 0) {
            //console.log('in array :' + selectedApps.indexOf(this.value));

            var filteredActivities = _.select(activities, function(activities) {
                var activity = activities.activity;
                //return activity.application == 'LincPad';
                //return selectedApps.indexOf(activity.application) != -1;
                return selectedApps.indexOf(activity.application) != -1;
            });
            //console.log(filteredActivities);
            $("#activityList").html('');
            addActivities(filteredActivities);
        } else {
            $("#activityList").html('');
            addActivities(activities);
        }
    });

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
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.BOTTOM_CENTER
        }
    };

    // Creating the map
    var map = new google.maps.Map(document.getElementById('map'), options);


    $.get('/activities', {dataType : 'json'}, function(data) {
        activities = data;
        //console.log(activities);
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

        addMapMarker(activity, marker);
        
        var source = $("script[name=activityListItem_tpl]").html();
        var template = Handlebars.compile(source);
        //activity.location = getLocation(activity.lat, activity.lng);
        var activityHtml = template(activity);
        //console.log(activityHtml);

        $("<li/>", {
            html: activityHtml,
            click: function() {
                google.maps.event.trigger(marker, 'click')
            }
        }).prependTo("#activityList");

    }

    function addMapMarker(activity, marker) {
        google.maps.event.addListener(marker, 'click', function() {

            var infowindow = new google.maps.InfoWindow({
                content: getMapPopupContent(activity)
            });
            infowindow.open(map, marker);
        });
    };

    function getMapPopupContent(acti) {
        var content = 'User : ' + acti.user +
                '</br> Application : ' + acti.application +
                '</br> Event : ' + acti.event +
                '</br> Location : ' + getLocation(acti.lat, acti.lng);
        return content;
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
            activities = newActivities;
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

    function getLocation(lat, lng) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        var location;
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    location = results[1].formatted_address;
                    console.log('loc 1 :' + location)
                } else {
                    location = "No results found";
                }
            } else {
                location = "Geocoder failed due to: " + status;
            }
        });
        console.log('location :' + location);
        return location;
    }

});