moment.lang('ru');

(function ($target, metadata, homePageMetadata) {

    var host = InfinniUI.config.serverUrl;

    window.providerRegister.register('UploadDocumentDataSource', function (metadataValue) {
        return new DataProviderUpload(new QueryConstructorUpload(host, metadataValue));
    });
    
    setTimeout(layoutManager.init.bind(layoutManager), 1000);
    window.providerRegister.register('MetadataDataSource', function (metadataValue) {
        var $pageContent = $('body');
        for(var i = 3; i >=0; i--){
            setTimeout( function(){
                //adaptHeightInsideElement($('body'));
                layoutManager.init();
            }, 500 + i*300);
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

    if (true) {
        //Загрузка данных из стаба
        var linkView = new LinkView(rootView, function (resultCallback) {
            mainView = builder.buildType(rootView, 'View', metadata);
            resultCallback(mainView);
            rootView.menuIsInitialized();

            openHomePage();
        });
    } else {
        //Обычная загрузка
        var linkView = new LinkView(rootView, function (resultCallback) {
            window.providerRegister.build('MetadataDataSource', metadata).getViewMetadata(function (data) {
                if(data.LayoutPanel){
                    resultCallback(builder.buildType(rootView, 'View', data));
                    rootView.menuIsInitialized();


                }else{
                    alert('Нет home page для этой конфигурации.');
                }

            });
        });
    }

    linkView.setOpenMode('Application');
    linkView.createView(function (view) {
        /** @TODO Переделать на обработку только нового диалога. @see {@link layoutManager.resizeDialog} **/
        var exchange = messageBus.getExchange('modal-dialog');
        exchange.subscribe(messageTypes.onLoaded, function (/*messageBody*/) {
            (function updateDialogLayout(intervals) {
                var timeout = intervals.splice(0, 1).pop();
                if (typeof timeout === 'undefined') return;
                setTimeout(function () {
                    layoutManager.init();
                    updateDialogLayout(intervals);
                }, timeout);
            })([500]);
        });


        messageBus.getExchange('global').subscribe(messageTypes.onViewClosed, function(){
            var $pageContent = $('body');
            setTimeout( function(){
                //adaptHeightInsideElement($('body'));
                layoutManager.init();
            }, 100);
        });
        view.open();
    });



    /**
     * Загрузка стаба
     * @param url напр. '/app/stubs/combobox.json'
     * @returns {boolean|Object}
     */
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
    }

    function openHomePage(){
        var action = (new OpenViewActionBuilder()).build(builder, mainView, {
            View: {
                AutoView: homePageMetadata
            }
        });

        action.execute();
    }
})(
    $('body'),
    //'/app/stubs/selectbox.json'

    {// menu
        "LayoutPanel":{
            "MenuBar":{
                "ConfigId":"PatientEhr"
            }
        }
    },
    {ConfigId: window.location.hash.slice(2), DocumentId: 'Common', ViewType: 'HomePage', OpenMode: "Application"} // homepage
);


function SpecialApplicationView() {

    var $menuContainer;
    var $container;
    this.isMenuInitialized = false;

    var template = _.template(
        '<div style="display: none; position: absolute; top:0px; left:0px;"><div id="page-bottom"></div></div>' +
        '<div id="menu-area"></div>' +
        '<div id="page-content" class="special-page-content"></div>'
    );

    this.getContainer = function () {
        if (this.isMenuInitialized){
            return $container;
        }else{
            return $menuContainer;
        }
    };

    this.open = function ($el) {
        $el.prepend(template({}));

        $container = $('#page-content', $el);
        $menuContainer = $('#menu-area', $el);

        $('#page-bottom').html(new GlobalNavigationBarControl().render());
    };

    this.getApplicationView = function () {
        return this;
    };

    this.menuIsInitialized = function () {
        this.isMenuInitialized = true;

        this.initViewHandlers();
    };

    this.initViewHandlers = function(){
        var exchange = messageBus.getExchange('global');

        exchange.subscribe(messageTypes.onViewOpened, function(params){
            if(params.openMode == "Application"){
                $('#page-bottom .pl-gn-button:not(.pl-active) .pl-gn-button-close:gt(0)').click();
                $('.pl-active-bar').hide();
            }
        });
    };

}