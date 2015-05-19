function DatePicker(parentView) {
    _.superClass(DatePicker, this, parentView);
}

_.inherit(DatePicker, Element);

_.extend(DatePicker.prototype, {
    createControl: function(){
        return new DatePickerControl();
    },

    getMode: function(){
        return this.control.get('mode');
    },

    setMode: function(mode){
        this.control.set('mode', mode);
    },

    getMinDate: function(){
        return this.control.get('minDate');
    },

    setMinDate: function(minDate){
        this.setDateProperty('minDate', minDate, this.control.controlModel.defaults.minDate);
    },

    getMaxDate: function(){
        return this.control.get('maxDate');
    },

    setMaxDate: function(maxDate){
        this.setDateProperty('maxDate', maxDate, this.control.controlModel.defaults.maxDate);
    },

    getFormat: function(){
        return this.control.get('format');
    },

    setFormat: function(format){
        this.control.set('format', format);
    },

    getReadOnly: function(){
        return this.control.get('readonly');
    },

    setReadOnly: function(value){
        if(typeof value == 'boolean'){
            this.control.set('readonly', value);
        }
    },

    getValue: function(){
        return this.control.get('value');
    },

    setValue: function(value){
        this.control.set('value', value/*, this.control.controlModel.defaults.value*/);
    },

    onValueChanged: function (handler) {
        this.control.onValueChanged(handler);
    },

    setDateProperty: function(property, value, defaultValue){
        if (_.isObject(value) && !(value instanceof Date)) {
            value = null;
        }

        var date = this.parseToDate(value);

        if(date !== null){
            this.control.set(property, date);
        }
        else{
            this.control.set(property, this.parseToDate(defaultValue));
        }
    },

    parseToDate: function(value) {
        if (typeof value === 'undefined' || value === null) {
            return null;
        } else {
            return new Date(value);
        }
    },

    isValidDate: function(value){
        return (value instanceof Date) && (!isNaN(value.getTime()));
    }
},
    editMaskPropertyMixin,
    baseTextElementMixin
);
