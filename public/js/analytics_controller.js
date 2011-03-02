/**
 *
 */
AnalyticsController = Backbone.Controller.extend({
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

        // Create and draw the visualization.
        new google.visualization.PieChart(document.getElementById('visualization')).draw(data, {title:"Devices Using Mobile Apps"});
    }


});

var analyticsController = new AnalyticsController();