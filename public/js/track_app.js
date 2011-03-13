/**
 * Created by .
 * User: imranansari
 * Date: Mar 9, 2011
 * Time: 7:16:34 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {

    var activityData = {
        event : 'CheckIn',
        application : 'ITForumAgenda',
        osVersion : '3.0'
    };

    document.querySelector('.overlay').addEventListener('click', function(ev) {
        if (/overlay|wrap/.test(ev.target.className)) toggleOverlay();
    });

    checkIn();

    function checkIn() {
        if (!isUserCheckedIn()) {
            toggleOverlay();
        }
        return;
    }

    $('#checkIn').click(function() {
        activityData.user = $('#checkinUser').val();
        if (activityData.user == '') {
            alert('Please enter you email id');
            return;
        }
        toggleOverlay();
        navigator.geolocation.getCurrentPosition(handle_geolocation);
    });

    function handle_geolocation(position) {
        activityData.lat = position.coords.latitude;
        activityData.lng = position.coords.longitude;
        activityData.deviceType = getDevice();

        var data = $.toJSON(activityData);
        console.log(data);
        $.post("http://ec2-67-202-37-158.compute-1.amazonaws.com/activity", data);
        //$.post("/activity", data);
        setUserCheckedIn();
    }

    function isUserCheckedIn() {
        var checkedIn = $.cookie("checkedIn");
        console.log("checkedIn cookie: " + checkedIn);
        if (getURLParameter("checkedin") == 'false') {
            return false;
        } else {
            return checkedIn;
        }
    }

    function setUserCheckedIn() {
        $.cookie("checkedIn", "true", { path: '/' });
    }

    function toggleOverlay() {
        $('.overlay').show();
        document.body.className = document.body.className.indexOf('overlaid') != -1 ? '' : 'overlaid';
    }

    function getDevice() {
        var ua = navigator.userAgent.toLowerCase();
        var device = "Other";

        if (ua.indexOf("chrome") != -1)
            device = "chrome";

        if (ua.indexOf("iphone") != -1)
            device = "iphone";

        if (ua.indexOf("android") != -1)
            device = "android";

        if (ua.indexOf("ipad") != -1)
            device = "ipad";

        return device;
    }

    function getURLParameter(name) {
        return unescape(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [,null])[1]);
    }
});
