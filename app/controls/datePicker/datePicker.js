var DatePickerControl = function(){
    _.superClass(DatePickerControl, this);
};

_.inherit(DatePickerControl, Control);

_.extend(DatePickerControl.prototype, {

    createControlModel: function () {
        return new DatePickerModel();
    },

    createControlView: function (model) {
        return new DatePickerView({model: model});
    },

    onValueChanged: function(handler){
        this.controlModel.on('change:value', handler);
    }
    
},
    baseTextControlMixin
);
