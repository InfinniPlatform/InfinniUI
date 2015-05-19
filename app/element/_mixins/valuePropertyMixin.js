var valuePropertyMixin = {

    getValue: function(){
        return this.control.get('value');
    },

    setValue: function(value){
        return this.control.set('value', value);
    },

    onValueChanged: function(handler){
        this.control.onValueChanged(handler);
    }

};