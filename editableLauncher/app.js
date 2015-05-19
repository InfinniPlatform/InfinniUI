moment.lang('ru');

(function ($target) {

    var host = 'http://ic:9900';

    window.providerRegister.register('MetadataDataSource', function (metadataValue) {
        return new MetadataProviderREST(new QueryConstructorMetadata(host, metadataValue));
    });

    window.providerRegister.register('DocumentDataSource', function (metadataValue) {
        return new DataProviderREST(metadataValue, new QueryConstructorStandard(host, metadataValue));
    });

    $('.apply-ds').click(function(){
        var metadata = JSON.parse($('#ds').val());

        var rootView = new RootView();
        var builder = new ApplicationBuilder();
        var view = builder.buildType(rootView, 'View', metadata);


        var linkView = new LinkView(null, function (resultCallback) {
            resultCallback(view);
        });
        linkView.setOpenMode('Application');

        var view = linkView.createView(function(view){
            view.open();
        });

        $('#ds, .apply-ds').remove();

        /*var metadata = $('#ds').val();

        var builder = new ApplicationBuilder(),
            rootView = new ApplicationView();

        rootView.open($target);

        if (typeof metadata === 'string') {
            //Загрузка данных из стаба
            var linkView = new LinkView(rootView, function (resultCallback) {
                resultCallback(builder.buildType(rootView, 'View', loadStub(metadata)));
            });
        } else {
            //Обычная загрузка
            var linkView = new LinkView(rootView, function (resultCallback) {
                window.providerRegister.build('MetadataDataSource', metadata).getViewMetadata(function (data) {
                    resultCallback(builder.buildType(rootView, 'View', data));
                });
            });
        }

        linkView.setOpenMode('Application');
        linkView.createView(function (view) {
            view.open();
        });


        function loadStub(url) {
            metadata = false;

            $.ajax({url: url,async: false})
                .done(function (data) {
                    metadata = data
                })
                .fail(function (err) {
                    alert(err.responseText);
                });
            return metadata;
        }*/
    });

})(
    $('body')
    //'/app/stubs/selectbox.json'
    //{ConfigId: window.location.hash.slice(2), DocumentId: 'Common', ViewType: 'HomePage'}
);

function RootView(){};