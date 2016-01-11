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

    set: function(key, val){
        if(key == 'value' && this.get('mode') == 'Date'){
            if(val instanceof Date){
                val = InfinniUI.DateUtils.toISO8601(val);
            }

            Control.prototype.set.call(this, key, val === null ? undefined : val);
        }else{
            Control.prototype.set.call(this, key, val);
        }
    }
},
    controlValuePropertyMixin,
    baseTextControlMixin
);
