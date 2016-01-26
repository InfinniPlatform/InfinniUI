var LabelControl = function (viewMode) {
    _.superClass(LabelControl, this, viewMode);
    this.initialize_editorBaseControl();
};

_.inherit(LabelControl, Control);

_.extend(LabelControl.prototype, {

    createControlModel: function () {
        return new LabelModel();
    },

    createControlView: function (model, viewMode) {
        if(!viewMode || ! (viewMode in window.InfinniUI.Label)){
            viewMode = 'simple';
        }

        var ViewClass = window.InfinniUI.Label.viewModes[viewMode];

        return new ViewClass({model: model});
    },
    
    getDisplayValue: function () {
        return this.controlView.getLabelText();
    }

}, editorBaseControlMixin);