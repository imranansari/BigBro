/**
 * Created by SearchFilterController.
 * User: imranansari
 * Date: Feb 21, 2011
 * Time: 6:58:42 PM
 * To change this template use File | Settings | File Templates.
 */

var markerArray = new Array();
var SearchFilterController = Backbone.Controller.extend({

    /**
     * filterByApp
     */
    filterByApp : function() {
        var selectedApps = $('input[name="apps"]').serialize();
        if (selectedApps.length > 0) {
            //console.log('in array :' + selectedApps.indexOf(this.value));

            var filteredActivities = _.select(activities, function(activities) {
                var activity = activities.activity;
                //return activity.application == 'LincPad';
                //return selectedApps.indexOf(activity.application) != -1;
                return selectedApps.indexOf(activity.application.toLowerCase()) != -1;
            });
            //console.log(filteredActivities);
            $("#activityList").html('');
            searchFilterController.clearAllMarkers();
            activityListController.addActivities(filteredActivities);
        } else {
            $("#activityList").html('');
            activityListController.addActivities(activities);
        }
    },

    /**
     * FilterByDevice
     */
    filterByDevice : function() {
        var selectedDevices = $('input[name="devices"]').serialize();
        if (selectedDevices.length > 0) {

            var filteredActivities = _.select(activities, function(activities) {
                var activity = activities.activity;
                return selectedDevices.indexOf(activity.deviceType.toLowerCase()) != -1;
            });
            $("#activityList").html('');
            searchFilterController.clearAllMarkers();            
            activityListController.addActivities(filteredActivities);
        } else {
            $("#activityList").html('');
            activityListController.addActivities(activities);
        }
    },

    clearAllMarkers : function() {
        /*if (markerArray) {
         $.each(markerArray, function() {

         console.log('val  : ' + this);
         this.marker.setMap(null);
         });
         }*/
        if (markerArray) {
            for (i in markerArray) {
                markerArray[i].setMap(null);
            }
        }
    }
});

var searchFilterController = new SearchFilterController();