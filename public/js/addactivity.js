$(document).ready(function() {
    $('#submitActivity').click(function() {
        var data = $.toJSON($('#eventForm').serializeObject());
        $.post("/addactivity", data);
        console.log(data);
        //alert('Activity Posted');
    });


    navigator.geolocation.getCurrentPosition(handle_geolocation_query);


    function handle_geolocation_query(position) {
        console.log('Lat: ' + position.coords.latitude + ' ' +
                'Lon: ' + position.coords.latitude);
    }
});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};