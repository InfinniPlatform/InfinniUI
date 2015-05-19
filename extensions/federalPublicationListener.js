function FederalPublicationListener() {
    this.render = function (target, parameters, context) {
        var ds = context.DataSources['MainDataSource'];

        var signalR = $.hubConnection(window.host),
            hub = signalR.createHubProxy('WebClientNotificationHub');

        hub.on('FederalStatusChanged', function (id) {
            function predicate(item){
                return item.Id == id;
            }

            if (_.some(ds.getDataItems(), predicate)){
                ds.updateItems();
            }
        });

        signalR.start().done(function () {
            console.log('Now connected, connection ID=' + signalR.id);
        });
    }
}