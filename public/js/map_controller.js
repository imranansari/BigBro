/**
 * Created by MapController.
 * User: imranansari
 * Date: Feb 21, 2011
 * Time: 5:46:52 PM
 * To change this template use File | Settings | File Templates.
 */

var MapController = Backbone.Controller.extend({

    addActivity: function (activity, animationType) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(activity.lat, activity.lng),
            map: map,
            title: activity.user,
            animation: animationType
        });

        mapController.addMapMarker(activity, marker);
        mapController.addActivityToList(activity, marker);

    },

    addActivityToList : function(activity, marker) {
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
    },

    addMapMarker: function (activity, marker) {
        google.maps.event.addListener(marker, 'click', function() {

            infowindow.content = mapController.getMapPopupContent(activity);
            infowindow.open(map, marker);
        });
    },


    getMapPopupContent: function (activity) {
        var source = $("script[name=mapPopup_tpl]").html();
        var template = Handlebars.compile(source);
        var mapPopupHtml = template(activity);
        return mapPopupHtml;
    },

    getLocation : function (lat, lng) {
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


var mapController = new MapController();