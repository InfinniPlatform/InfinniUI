var LabelControl = function () {
    _.superClass(LabelControl, this);
    this.initialize_editorBaseControl();
};

_.inherit(LabelControl, Control);

_.extend(LabelControl.prototype, {

    createControlModel: function () {
        return new LabelModel();
    },

    createControlView: function (model, viewMode) {
        if(!viewMode || ! viewMode in window.InfinniUI.Label){
            viewMode = 'common';
        }

        var ViewClass = window.InfinniUI.Label.viewModes[viewMode];

        return new ViewClass({model: model});
    }

}, editorBaseControlMixin);