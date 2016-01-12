function DataNavigationControl (parent) {
    _.superClass(DataNavigationControl, this, parent);
}

_.inherit(DataNavigationControl, Control);

_.extend(DataNavigationControl.prototype, {

    createControlModel: function () {
        return new DataNavigationModel();
    },

    createControlView: function (model) {
        return new DataNavigationView({model: model});
    }

});