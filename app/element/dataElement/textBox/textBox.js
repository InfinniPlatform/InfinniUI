function TextBox(parentView) {
    _.superClass(TextBox, this, parentView);
}

_.inherit(TextBox, Element);

_.extend(TextBox.prototype, {

    createControl: function(){
        return new TextBoxControl();
    },

    setMultiline:function(multiline){
        this.control.set('multiline', multiline);
    },

    setLineCount: function(lineCount){
        this.control.set('lineCount', lineCount);
    },

    setInputType: function(inputType){
        this.control.set('inputType', inputType);
    }


},
    valuePropertyMixin,
    formatPropertyMixin,
    editMaskPropertyMixin,
    {
        setValue: function(value){
            if((typeof value != 'object' && value) || typeof value == 'string' || value === null)
                return this.control.set('value', value);

        }
    }
);