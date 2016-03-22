var OpenMode = function () {

    var applications = [];
    var pages = [];

    this.getStrategy = function (linkView) {
        var openMode = linkView.openMode;

        var openModeStrategy = {
            Application: OpenModeApplicationStrategy,
            Container: OpenModeContainerStrategy,
            Page: OpenModePageStrategy,
            Dialog: OpenModeDialogStrategy
        };

        if (typeof openModeStrategy[openMode] === 'undefined') {
            throw new Error("Несуществующий OpenMode: " + openMode);
        }

        return new openModeStrategy[openMode](linkView);
    };

    this.getRootContainer = function () {
        return InfinniUI.config.$rootContainer || $('body');
    };

    this.resolveContainer = function (list, callback) {
        var name, layout;
        _.find(list, function (i) {
            if (_.isEmpty(i)) return false;
            name = i;
            layout = layoutPanelRegistry.getLayoutPanel(name);
            return !_.isEmpty(layout);
        });

        callback(name, layout);
    };

    this.registerPage = function (applicationView, view, openMethod) {
        pages.push({
            applicationView: applicationView,
            view: view,
            openMethod: openMethod
        });
    };

    this.registerApplication = function (applicationView, openMethod) {
        applications.push({
            applicationView: applicationView,
            openMethod: openMethod
        });
    };

    this.getApplicationViews = function () {
        return _.pluck(applications, 'view');
    };

    this.closeApplicationView = function (applicationView) {
        var i = _.findIndex(applications, function (app) {
            return app.applicationView === applicationView;
        });

        if (i !== -1) {
            applications.splice(i, 1);
        }

        //Получаем следущее доступное приложение
        var ln = applications.length;
        if (ln > 0) {
            var next = (i < ln) ? applications[i] : applications[ln - 1];
            return next.applicationView;
        }
    };

    this.closePageView = function (view) {
        var applicationView;
        var next;
        var i, ln;

        for (i = 0, ln = pages.length; i < ln; i = i + 1) {
            if (pages[i].view === view) {
                var data = pages.splice(i,1).pop();
                applicationView = data.applicationView;
                break;
            }
        }

        if (applicationView) {
            for (i = 0, ln = pages.length; i < ln; i = i + 1) {
                if (pages[i].applicationView === applicationView) {
                    next = pages[i].view;
                    break;
                }
            }
        }
        return next;
    };

    this.getApplication = function (applicationView) {
        return _.findWhere(applications, {applicationView: applicationView});
    };

    this.getPageViews = function (applicationView) {
        return _.chain(pages)
            .filter(function (data) {
                return data.applicationView === applicationView;
            })
            .pluck('view')
            .value();
    };

};

InfinniUI.global.openMode = new OpenMode();
