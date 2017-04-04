window.InfinniUI.openHomePage = function($target) {
    var builder = new ApplicationBuilder(),
        rootView = new SpecialApplicationView();

    window.InfinniUI.localStorageDataSource = new window.InfinniUI.LocalStorageDataSource({
        view: rootView
    });

    rootView.open($target);

    InfinniUI.AutoHeightService.slidingRecalculation($target);
    subscribeRecalculationOnWindowResize($target);

    getHomePageLinkViewPromise()
        .done(function (viewMetadata) {
            var action = builder.buildType('OpenAction', viewMetadata, {parentView: rootView});
            action.execute();
        });

    if( InfinniUI.config.enableGetCurrentUser ) {
        setCurrentUser();
    }
};

function subscribeRecalculationOnWindowResize($container) {
    var TIMEOUT = 40;
    var WAIT = 50;
    var resizeTimeout;

    $(window).resize(function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(_.debounce(onWindowResize, WAIT), TIMEOUT);
    });

    function onWindowResize() {
        window.InfinniUI.AutoHeightService.recalculation($container);
    }

}

function getHomePageLinkViewPromise() {
    var defer = $.Deferred();
    var homePageMetadata = window.InfinniUI.config.homePage;

    if (typeof homePageMetadata === 'string') {
        $.ajax({
                url: homePageMetadata,
                dataType: "json"
            })
            .then(function (data) {
                defer.resolve({
                    LinkView: {
                        InlineView: {
                            View: data
                        }
                    }
                })
            }, function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus);
            });
    } else {
        defer.resolve({
            LinkView: {
                AutoView: homePageMetadata
            }
        });
    }

    return defer.promise();
}

function refreshUserInfo() {
    var authProvider = InfinniUI.global.session;
    authProvider.getCurrentUser(
        function (result) {
            InfinniUI.user.onReadyDeferred.resolve(result);
        },
        function (error) {
            InfinniUI.user.onReadyDeferred.resolve(null);
        }
    );
}

function setCurrentUser() {
    InfinniUI.user = {
        onReadyDeferred: $.Deferred(),
        onReady: function(handler){
            this.onReadyDeferred.done(handler);
        }
    };

    refreshUserInfo();
}