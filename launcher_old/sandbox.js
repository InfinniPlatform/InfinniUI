moment.lang('ru');

function run($target) {
    var host = 'http://ic:9900';

    window.providerRegister.register('MetadataDataSource', function (metadataValue) {
        return new MetadataProviderREST(new QueryConstructorMetadata(host, metadataValue));
    });

    var metadata = {
        ConfigId: 'Structure',
        DocumentId: 'Common',
        ViewType: 'HomePage'
    };

    var builder = new ApplicationBuilder(),
        rootView = new ApplicationView();

    rootView.open($target);

    var linkView = new LinkView(rootView, function () {
        var defer = $.Deferred();

        window.providerRegister.build('MetadataDataSource', metadata).getViewMetadata().done(function (data) {
            defer.resolve(builder.buildType(rootView, 'View', getMetaData()));
        });

        return defer.promise();
    });

    linkView.setOpenMode('Application');

    linkView.createView().done(function (view) {
        view.open();
    });
}

run($('body'));

