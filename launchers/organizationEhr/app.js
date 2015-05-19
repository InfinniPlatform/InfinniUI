moment.lang('ru');

//  http://ic:8181/launchers/organizationEhr/#/F3917B8C-7212-47A1-B598-60886AC0786A/publish
var host = InfinniUI.config.serverUrl;
var organizationId = location.hash.split('/')[1],
    viewName = location.hash.split('/')[2];

switch (viewName) {
    case 'publish':
        var metadataName = 'FederalEhrListView';
        break;
    case 'ehr':
        var metadataName = 'EhrListView';
        break;
}

window.providerRegister.register('MetadataDataSource', function (metadataValue) {
    return new MetadataProviderREST(new QueryConstructorMetadata(host, metadataValue));
});

window.providerRegister.register('DocumentDataSource', function (metadataValue) {
    for (var i = 3; i >= 0; i--) {
        setTimeout(layoutManager.init.bind(layoutManager), 500 + i * 300);
    }
    return new DataProviderREST(metadataValue, new QueryConstructorStandard(host, metadataValue));
});

var metadata = {
    ConfigId: 'Ehr',
    DocumentId: 'Header',
    MetadataName: metadataName,
    OpenMode: 'Application'
};

var rootView = new RootView();
var builder = new ApplicationBuilder();

var organizationDS = builder.buildType(rootView, 'DocumentDataSource', {
    ConfigId: 'Ehr',
    DocumentId: 'Organization',
    Name: 'OrganizationsDataSource',
    Query: [
        {
            Property: 'Id',
            Value: organizationId,
            CriteriaType: 1
        }
    ]
});

var linkView = builder.buildType(rootView, 'AutoView', metadata);
linkView.setOpenMode('Application');
linkView.createView(function (view) {

    messageBus.getExchange('global').subscribe(messageTypes.onViewClosed, function () {
        setTimeout(layoutManager.init.bind(layoutManager), 100);
    });

    organizationDS.getItems(function(items){
        view.getParameter('Organization').setValue(items[0]);
        view.open();
    });
});

function RootView() {
    this.getExchange = function () {
        return window.messageBus.getExchange('launcher2');
    };

    this.getContext = function () {
        return {};
    };

    this.getApplicationView = function () {
    };

    this.getDataSource = function (name) {
        return {
            addDataBinding: function () {
            }
        };
    };
}