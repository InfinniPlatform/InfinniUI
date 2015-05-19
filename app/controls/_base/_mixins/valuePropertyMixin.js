var controlValuePropertyMixin = {

    onValueChanged: function(handler){
        this.controlModel.on('change:value', handler);
    }

};