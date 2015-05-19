moment.lang('ru');

var host = InfinniUI.config.serverUrl;
var patientId = location.hash.substr(2);

window.providerRegister.register('MetadataDataSource', function (metadataValue) {
    return new MetadataProviderREST(new QueryConstructorMetadata(host, metadataValue));
});

window.providerRegister.register('DocumentDataSource', function (metadataValue) {
    for(var i = 3; i >=0; i--){
        setTimeout(layoutManager.init.bind(layoutManager), 500 + i*300);
    }
    return new DataProviderREST(metadataValue, new QueryConstructorStandard(host, metadataValue));
});

var metadata = {
    ConfigId: 'Ehr',
    DocumentId: 'Patient',
    MetadataName: 'EhrView',
    OpenMode: 'Application',
    Parameters: [
        {
            Name: 'Patient',
            Value: {
                PropertyBinding: {
                    DataSource: 'MainDataSource',
                    Property: '$'
                }
            }
        }
    ]
};

var rootView = new RootView();
var builder = new ApplicationBuilder();

var linkView = builder.buildType(rootView, 'AutoView', metadata);
linkView.setOpenMode('Application');
linkView.createView(function (view) {

    messageBus.getExchange('global').subscribe(messageTypes.onViewClosed, function(){
        setTimeout( layoutManager.init.bind(layoutManager), 100);
    });

    view.getParameter('Patient').setValue({ Id: patientId });
    view.open();
});

function RootView() {
    this.getExchange = function () {
        return window.messageBus.getExchange('launcher2');
    };

    this.getContext = function () {
        return {};
    };

    this.getApplicationView = function () {};

    this.getDataSource = function (name) {
        return {
            addDataBinding: function () {
            }
        };
    };
}