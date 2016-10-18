window.InfinniUI.openHomePage = function($target) {
    var builder = new ApplicationBuilder(),
        rootView = new SpecialApplicationView();

    rootView.open($target);

    InfinniUI.LayoutManager.slidingRecalculation();
    subscribeRecalculationOnWindowResize();

    getHomePageLinkViewPromise()
        .done(function (viewMetadata) {
            var action = builder.buildType('OpenAction', viewMetadata, {parentView: rootView});
            action.execute(function() {
                if( window.InfinniUI.RouterService ) {
                    window.InfinniUI.RouterService.startRouter();
                }
            });
        });
};

function subscribeRecalculationOnWindowResize() {
    var TIMEOUT = 40;
    var WAIT = 50;
    var resizeTimeout;

    $(window).resize(function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(_.debounce(onWindowResize, WAIT), TIMEOUT);
    });

    function onWindowResize() {
        window.InfinniUI.LayoutManager.recalculation();
    }

};

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
};