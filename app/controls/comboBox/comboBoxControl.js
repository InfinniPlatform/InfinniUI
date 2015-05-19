var ComboBoxControl = function () {
    _.superClass(ComboBoxControl, this);
};

_.inherit(ComboBoxControl, Control);

_.extend(ComboBoxControl.prototype, {

    createControlModel: function () {
        return new ComboBoxModel();
    },

    createControlView: function (model) {
        return new ComboBoxView({model: model});
    },

    onChangeTerm: function (handler) {
        var fn = function (model, value) {
            handler(value);
        };
        this.controlModel.on('change:term', fn);
    },

    setOpenListFunction: function(f){
        this.controlView.setOpenListFunction(f);
    },

    onFirstOpening: function(handler){
        this.controlView.on('firstOpening', handler);
    },

    getSelectedItems: function () {
        return this.controlView.getSelectedItems();
    },

    getDisplayValue: function (value) {
        return this.controlView.getDisplayValue(value);
    }

}, controlValuePropertyMixin);