/**
 * Created by .
 * User: imranansari
 * Date: Mar 9, 2011
 * Time: 7:16:34 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {

    var activityData = {
        deviceType : 'iphone',
        event : 'Search',
        application : 'LincPad',
        user : 'TestUser6',
        osVersion : '3.0'
    };

    navigator.geolocation.getCurrentPosition(handle_geolocation);

    function handle_geolocation(position) {
        alert(getDevice());
        activityData.lat = position.coords.latitude;
        activityData.lng = position.coords.longitude;
        activityData.deviceType = getDevice();

        var data = $.toJSON(activityData);
        console.log(data);
        //$.post("http://ec2-67-202-37-158.compute-1.amazonaws.com/activity", data);
        $.post("/activity", data);
    }

    function getDevice() {
        var ua = navigator.userAgent.toLowerCase();
        var device = "Other";

        device = (ua.indexOf("iphone") != -1 ? "" : "");
        device = (ua.indexOf("android") != -1 ? "Android" : "");
        device = (ua.indexOf("ipad") != -1 ? "iPad" : "");

        return device;
    }

});
