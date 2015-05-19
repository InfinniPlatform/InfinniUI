var GlobalNavigationBarControl = function () {
    _.superClass(GlobalNavigationBarControl, this);
};

_.inherit(GlobalNavigationBarControl, Control);

_.extend(GlobalNavigationBarControl.prototype, {
    createControlModel: function () {
        return new GlobalNavigationBarModel();
    },

    createControlView: function (model) {
        return new GlobalNavigationBarView({model: model});
    },

    addApplicationView: function (view) {
        var model = this.controlModel;
        var applications = model.get('applications').slice();
        if (applications.indexOf(view) === -1) {
            applications.push(view);
            model.set('applications', applications);
        }
        model.set('active', view.getGuid());
    },

    removeApplicationView: function (view) {
        var model = this.controlModel;
        var applications = model.get('applications').slice();
        var i = applications.indexOf(view);
        if (i === -1) {
            return;
        }
        var active = model.get('active');
        if (active === view.getGuid()) {
            model.set('active', null);
        }
        applications.splice(i, 1);
        model.set('applications', applications);
    },

    onActivateApplication: function (handler) {
        this.controlView.on('application:activate', handler);
    },

    onClosingApplication: function (handler) {
        this.controlView.on('application:closing', handler)
    },

    onCloseApplication: function (handler) {
        this.controlView.on('application:close', handler);
    },

    setApplications: function (applications) {
        this.set('applications', applications.slice());
    },

    setApplicationText: function (view) {
        var applications = this.controlModel.get('applications');

        if (applications.indexOf(view) === -1) {
            return;
        }

        this.controlModel.trigger('application:text', {
            key: view.getGuid(),
            text: view.getText()
        });


    }

});