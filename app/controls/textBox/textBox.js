var TextBoxControl = function(){
    _.superClass(TextBoxControl, this);
};

_.inherit(TextBoxControl, Control);

_.extend(TextBoxControl.prototype, {
    createControlModel: function(){
        return new TextBoxModel();
    },

    createControlView: function(model){
        return new TextBoxView({model: model});
    },

    onValueChanged: function(handler){
        this.controlModel.on('change:value', handler);
    }
});