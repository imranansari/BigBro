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
    },

    loadActivitiesFromServer: function() {
        $.get('/activities', {dataType : 'json'}, function(data) {
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

    addNewEvent: function () {
        console.log('add new event');

        $.get('/activities', {dataType : 'json'}, function(data) {
            var newActivities = data;
            jQuery.each(newActivities, function() {
                if (!exists(this.activity.id)) {
                    console.log('new id :' + this.activity.id);
                    mapController.addActivity(this.activity, google.maps.Animation.DROP)
                }
            });
            activities = newActivities;
        });
    }
});

var activityListController = new ActivityListController();