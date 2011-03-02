/**
 * Created by MapActivityController.
 * User: imranansari
 * Date: Feb 21, 2011
 * Time: 3:34:59 PM
 * To change this template use File | Settings | File Templates.
 */

var ActivityListController = Backbone.Controller.extend({
    initViews: function() {
        $('#activityList').css("height", $(window).height() - 55);

        //Configure Filter Panel Position
        $('#panel2').slidePanel({
            triggerName: '#trigger2',
            triggerTopPos: '36px',
            panelTopPos: '35px',
            panelOpacity: 0.7
        });

        mapController.registerTemplatePartials();
    },

    loadActivitiesFromServer: function() {
        $.get('/activity', {dataType : 'json'}, function(data) {
            activities = data;
            //console.log(activities);
            activityListController.addActivities(activities);
        });
    },

    addActivities: function (activities) {
        jQuery.each(activities, function() {
            mapController.addActivity(this.activity);
        });
    },

    getNewActivities:function (updatedActivitiesFromServer) {
        return _.select(updatedActivitiesFromServer, function(updatedActivitiesFromServer) {
            var activity = updatedActivitiesFromServer.activity;
            return !activityListController.exists(activity.id);
        });
    },

    addNewEvent: function () {
        console.log('add new event');

        $.get('/activity', {dataType : 'json'}, function(updatedActivitiesFromServer) {
            var newActivities = activityListController.getNewActivities(updatedActivitiesFromServer);
            jQuery.each(newActivities, function() {
                mapController.addActivity(this.activity, google.maps.Animation.DROP);
            });
            activities = updatedActivitiesFromServer;
        });
    },

    exists : function (id) {
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

});

var activityListController = new ActivityListController();