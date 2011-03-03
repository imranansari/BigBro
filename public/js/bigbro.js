/**
 * Created by BigBro.
 * User: imranansari
 * Date: Jan 11, 2011
 * Time: 10:22:41 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function () {
    options = {
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
    map = new google.maps.Map(document.getElementById('map'), options);

    infowindow = new google.maps.InfoWindow();

    sseController.initEventSource();
    activityListController.initViews();
    activityListController.loadActivitiesFromServer();

    var activities;

    $('input[name="apps"]').change(function() {
        searchFilterController.filterByApp();
    });

    $('input[name="devices"]').change(function() {
        searchFilterController.filterByDevice();
    });

    $('#analytics').click(function() {
        analyticsController.displayVisualization();
    });

});



