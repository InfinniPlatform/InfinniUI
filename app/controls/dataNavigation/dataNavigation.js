var DataNavigationControl = function () {
    _.superClass(DataNavigationControl, this);
};

_.inherit(DataNavigationControl, Control);

_.extend(DataNavigationControl.prototype, {
    createControlModel: function () {
        return new DataNavigationModel();
    },

    createControlView: function (model) {
        return new DataNavigationView({model: model});
    },

    onSetPageNumber: function (handler) {
        this.controlModel.on('change:pageNumber', function (model) {
            handler(model.get('pageNumber'));
        });
    },

    onSetPageSize: function (handler) {
        this.controlModel.on('change:pageSize', function (model) {
            handler(model.get('pageSize'));
        });
    },

    onSetElementCount: function(handler){
        this.controlModel.on('change:elementCount', function(model){
            handler(model.get('elementCount'));
        })
    }
});