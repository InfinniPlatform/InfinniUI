function ExtensionPanel(parentView) {
    _.superClass(ExtensionPanel, this, parentView);
}

_.inherit(ExtensionPanel, Element);

_.extend(ExtensionPanel.prototype, {
    createControl: function () {
        var control = new ExtensionPanelControl();

        control.controlModel.getContext = function () {
            return this.getContext();
        }.bind(this);

        return control;
    },

    setExtensionName: function (extensionName) {
        return this.control.set('extensionName', extensionName);
    },

    setParameters: function (value) {
        return this.control.set('parameters', value);
    }//,

    //setContext: function (value) {
    //    return this.control.set('context', value);
    //}
});