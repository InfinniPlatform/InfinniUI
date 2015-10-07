document.title = InfinniUI.config.configName;

moment.locale('ru');

(function ($target/*, metadata*/, homePageMetadata) {

    var host = InfinniUI.config.serverUrl;

    //Регистрация провайдера для работы с прикрепленными к документам файлами
    window.providerRegister.register('DocumentFileProvider', function (metadata) {
        var params = {
            documentId: metadata.documentId,
            configId: metadata.configId
        };
        var urlConstructor = new DocumentUploadQueryConstructor(host, params);
        return new DocumentFileProvider(urlConstructor);
    });

    window.providerRegister.register('UploadDocumentDataSource', function (metadataValue) {
        return new DataProviderUpload(new QueryConstructorUpload(host, metadataValue));
    });

    setTimeout(layoutManager.init.bind(layoutManager), 1000);
    window.providerRegister.register('MetadataDataSource', function (metadataValue) {
        var $pageContent = $('body');
        for (var i = 3; i >= 0; i--) {
            setTimeout(function () {
                layoutManager.init();
            }, 500 + i * 300);
        }

        return new MetadataProviderREST(new QueryConstructorMetadata(host, metadataValue));
    });

    window.providerRegister.register('DocumentDataSource', function (metadataValue) {
        return new DataProviderREST(metadataValue, new QueryConstructorStandard(host, metadataValue));
    });

    window.providerRegister.register('MetadataInfoDataSource', function (metadataValue) {
        return new MetadataDataSourceProvider(new QueryConstructorMetadataDataSource(host, metadataValue));
    });

    var builder = new ApplicationBuilder(),
        rootView = new SpecialApplicationView(),
        mainView;

    rootView.open($target);
    openHomePage()
        .done(function (viewMetadata) {
            var action = builder.buildType(rootView, 'OpenViewAction', viewMetadata);
            action.execute(function(){window.contextApp = arguments[0];});
        });

    function openHomePage() {
        var defer = $.Deferred();

        if (typeof homePageMetadata === 'string') {
            $.ajax({
                url: homePageMetadata,
                dataType: "json"
            })
                .then(function (data) {
                    defer.resolve({
                        View: {
                            InlineView: {
                                View: data,
                                OpenMode: "Container"
                            }
                        }
                    })
                }, function (jqXHR, textStatus, errorThrown) {
                    console.error(textStatus);
                });
        } else {
            defer.resolve({
                View: {
                    AutoView: homePageMetadata
                }
            });
        }
        return defer.promise();
    }

})(
    $('body'),
    '/app/stubs/checkbox.json'
    //{ConfigId: InfinniUI.config.configId, DocumentId: 'Common', MetadataName: 'HomePage', OpenMode: 'Container'}
);


function SpecialApplicationView() {
    var $container;

    this.getContainer = function () {
        return this.$container;
    };

    this.open = function ($el) {
        this.$container = $el;
    };

    this.getApplicationView = function () {
        return this;
    };

    this.menuIsInitialized = function () {
        this.isMenuInitialized = true;

        //this.initViewHandlers();
    };

    this.getContext = function(){
        return null;
    }
}