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
        return this.getDateProperty( this.control.get('minDate') );
    },

    setMinDate: function(minDate){
        this.setDateProperty('minDate', minDate, this.control.controlModel.defaults.minDate);
    },

    getMaxDate: function(){
        return this.getDateProperty( this.control.get('maxDate') );
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
        //return this.getDateProperty( this.control.get('value') );
        return this.control.get('value');
    },

    setValue: function(value){
        this.setDateProperty('value', value, this.control.controlModel.defaults.value);
    },

    onValueChanged: function (handler) {
        this.control.onValueChanged(handler);
    },

    getDateProperty: function(value){
        if(this.isValidDate(value)){
            //ToDo: учитывать формат
            return moment(value).format('MM/DD/YYYY');
        }
        return null;
    },

    setDateProperty: function(property, value, defaultValue){


        if (_.isObject(value) && !(value instanceof Date)) {
            value = null;
        }

        var date = this.parseToDate(value);

        if(this.isValidDate(date)){
            this.control.set(property, date);
        }
        else{
            this.control.set(property, defaultValue);
        }
    },

    parseToDate: function(value) {
        //ToDo: учитывать формат
        if (value) {
            return new Date(moment(value).format());
        }
        return null;
    },

    isValidDate: function(value){
        return (value instanceof Date) && (!isNaN(value.getTime()));
    }
},
    editMaskPropertyMixin
);
