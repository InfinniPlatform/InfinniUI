function GlobalNavigationBar(parent) {
    _.superClass(GlobalNavigationBar, this, parent);
}

_.inherit(GlobalNavigationBar, Element);

_.extend(GlobalNavigationBar.prototype, {

    createControl: function () {
        return new GlobalNavigationBarControl();
    },

    addApplicationView: function (view) {
        this.control.addApplicationView(view);
    },

    removeApplicationView: function (view) {
        this.control.removeApplicationView(view);
    },

    onActivateApplication: function (handler) {
        this.control.onActivateApplication(handler);
    },

    onClosingApplication: function (handler) {
        this.control.onClosingApplication(handler);
    },

    onCloseApplication: function (handler) {
        this.control.onCloseApplication(handler);
    },

    setApplicationText: function (view, text) {
        this.control.setApplicationText(view, text);
    },

    setApplications: function (applications) {
        this.control.setApplications(applications);
    }


});