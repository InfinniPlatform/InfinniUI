function ExtensionPanel(parent) {
    _.superClass(ExtensionPanel, this, parent);
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
    },

    setBuilder: function (builder) {
        this.control.set('builder', builder);
    }
});