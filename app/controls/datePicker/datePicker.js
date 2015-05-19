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
    },

    set: function(key, val){
        var args = _.toArray(arguments);

        if(key == 'value' && val instanceof Date){
            if(this.controlModel.get('mode') == 'Date') {
                args[1] = this.controlView.dateToString(val);
            }else if(this.controlModel.get('mode') == 'DateTime'){
                args[1] = this.controlView.dateTimeToString(val);
            }else if(this.controlModel.get('mode') == 'Time'){
                args[1] = this.controlView.dateTimeToString(val);
            }
        }

        Control.prototype.set.apply(this, args);
    }
});
