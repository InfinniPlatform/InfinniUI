function ExtensionPanel(parentView) {
    _.superClass(ExtensionPanel, this, parentView);
}

_.inherit(ExtensionPanel, Container);

_.extend(ExtensionPanel.prototype, {
    createControl: function () {
        var control = new ExtensionPanelControl();
        return control;
    },

    setExtensionName: function (extensionName) {
        return this.control.set('extensionName', extensionName);
    },

    setParameters: function (parameters) {
        return this.control.set('parameters', parameters);
    },

    getParameters: function () {
        return this.control.get('parameters');
    },

    setContext: function (context) {
        this.control.set('context', context);
    }
});