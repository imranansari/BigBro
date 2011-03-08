/**
 * Created by MapController.
 * User: imranansari
 * Date: Feb 21, 2011
 * Time: 5:46:52 PM
 * To change this template use File | Settings | File Templates.
 */

var MapController = Backbone.Controller.extend({

    /**
     * Add Activity
     * @param activity
     * @param animationType
     */
    addActivity: function (activity, animationType) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(activity.lat, activity.lng),
            map: map,
            title: activity.user,
            animation: animationType
        });
        markerArray['i_'+activity.id] = marker;
        mapController.addMapMarker(activity, marker);
        mapController.addActivityToList(activity, marker);
    },

    /**
     * addActivityToList
     * @param activity
     * @param marker
     */
    addActivityToList : function(activity, marker) {

        var source = $("script[name=activityListItem_tpl]").html();
        var template = Handlebars.compile(source);
        var activityHtml = template(activity);
        //console.log(activityHtml);

        $("<li/>", {
            html: activityHtml,
            click: function() {
                google.maps.event.trigger(marker, 'click')
            }
        }).prependTo("#activityList");
    },

    /**
     * AddMapMarker
     * @param activity
     * @param marker
     */
    addMapMarker: function (activity, marker) {
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.content = mapController.getMapPopupContent(activity);
            infowindow.open(map, marker);
        });
    },

    /**
     *Get MapPopUp Content
     * @param activity
     */
    getMapPopupContent: function (activity) {
        var source = $("script[name=mapPopup_tpl]").html();
        var template = Handlebars.compile(source);
        var mapPopupHtml = template(activity);
        return mapPopupHtml;
    },

    /**
     * Register Handlebar Template Partials
     */
    registerTemplatePartials : function() {
        Handlebars.registerPartial('deviceIcon', function(activity) {
            var icon;
            switch (activity.deviceType) {
                case 'android':
                    icon = 'android.png';
                    break;
                case 'iphone':
                    icon = 'iphone.png';
                    break;
                default:
                    icon = 'other_mobile.png';
                    break;
            }
            return "<img class='icon' src='/images/" + icon + "'/>";
        });
    }

});


var mapController = new MapController();