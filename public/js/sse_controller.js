/**
 * Created by SSEController.
 * User: imranansari
 * Date: Feb 21, 2011
 * Time: 6:46:40 PM
 * To change this template use File | Settings | File Templates.
 */

SSEController = Backbone.Controller.extend({

    /**
     * initEventSource
     */
    initEventSource: function() {
        var source = new EventSource('pullnewactivity');
        source.addEventListener('message', function(e) {
            console.log(e.data);
            if (e.data.trim() === 'true') {
                activityListController.addNewEvent();
            }
        }, false);

        source.addEventListener('open', function(e) {
            console.log('conn open');
        }, false);

        source.addEventListener('error', function(e) {
            if (e.eventPhase == EventSource.CLOSED) {
                // Connection was closed.
                console.log('error ');
                console.log(e);
            }
        }, false);
    }
});

var sseController = new SSEController();