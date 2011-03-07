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

    loadActivities: function() {
        activities = activityListController.getActivitiesFromService();
        activityListController.addActivities(activities);
    },

    getActivitiesFromService: function() {
        var activities;
        $.ajax({
            url: '/activity',
            type: 'GET',
            dataType : 'json',
            async: false,
            success: function(data) {
                activities = data;
            }});
        return activities;
    },

    addActivities: function (activities) {
        jQuery.each(activities, function() {
            mapController.addActivity(this.activity);
        });
    },

    addNewEvent: function () {
        console.log('add new event');

        var updatedActivitiesFromServer = activityListController.getActivitiesFromService();
        var newActivities = activityListController.getNewActivities(updatedActivitiesFromServer);
        jQuery.each(newActivities, function() {
            mapController.addActivity(this.activity, google.maps.Animation.DROP);
        });
        activities = updatedActivitiesFromServer;
    },

    getNewActivities:function (updatedActivitiesFromServer) {
        return _.select(updatedActivitiesFromServer, function(updatedActivitiesFromServer) {
            var activity = updatedActivitiesFromServer.activity;
            return !activityListController.exists(activity.id);
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

        return success;
    }

});

var activityListController = new ActivityListController();