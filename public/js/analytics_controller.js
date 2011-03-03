/**
 *
 */
AnalyticsController = Backbone.Controller.extend({

    displayVisualization: function(){
        $("#analyticsDisplay").lightbox_me({
            closeClick: false,
            overlaySpeed:50,
            closeSelector:".closeNote",
            appearEffect:'slideDown',
            overlayDisappearSpeed: 0,
            overlayCSS : {background: 'black', opacity: .6},
            onLoad: function() {
                analyticsController.drawVisualization();
            }
        });
    },

    drawVisualization: function() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Activity');
        data.addColumn('number', 'Devices');
        data.addRows(5);
        data.setValue(0, 0, 'iPhone');
        data.setValue(0, 1, 10);
        data.setValue(1, 0, 'Android');
        data.setValue(1, 1, 30);
          data.setValue(2, 0, 'Other');
        data.setValue(2, 1, 60);

        var options = {title:"Devices Using Mobile Apps",
                       is3D: 'true',
                       backgroundColor : 'black',
                       legendTextStyle : {color: 'white'},
                       titleTextStyle: {color: 'white'},
                       chartArea: {left:"5%",top:"5%",width:"100%",height:"80%"}}

        // Create and draw the visualization.
        new google.visualization.PieChart(document.getElementById('visualization')).draw(data, options);
    }


});

var analyticsController = new AnalyticsController();