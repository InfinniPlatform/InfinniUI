function ExtensionPanel(parentView) {
    _.superClass(ExtensionPanel, this, parentView);
}

_.inherit(ExtensionPanel, Element);

_.extend(ExtensionPanel.prototype, {
    createControl: function () {
        return new ExtensionPanelControl();
    },

    setExtensionName: function (extensionName) {
        return this.control.set('extensionName', extensionName);
    },

    setParameters: function (value) {
        return this.control.set('parameters', value);
    },

    setContext: function (value) {
        return this.control.set('context', value);
    }
});