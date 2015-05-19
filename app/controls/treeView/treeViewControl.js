var TreeViewControl = function () {
    _.superClass(TreeViewControl, this);
};

_.inherit(TreeViewControl, Control);

_.extend(TreeViewControl.prototype, {

    createControlModel: function () {
        return new TreeViewModel();
    },

    createControlView: function (model) {
        return new TreeViewView({model: model});
    },

    getSelectedItem: function () {
        return this.controlView.getSelectedItem();
    }

    //onChangeTerm: function (handler) {
    //    var fn = function (model, value) {
    //        handler(value);
    //    };
    //    this.controlModel.on('change:term', fn);
    //},
    //
    //setOpenListFunction: function(f){
    //    this.controlView.setOpenListFunction(f);
    //},
    //
    //onFirstOpening: function(handler){
    //    this.controlView.on('firstOpening', handler);
    //}

}, controlValuePropertyMixin);