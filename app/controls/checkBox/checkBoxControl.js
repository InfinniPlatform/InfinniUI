var CheckBoxControl = function(){
    _.superClass(CheckBoxControl, this);
};

_.inherit(CheckBoxControl, Control);

_.extend(CheckBoxControl.prototype, {
    createControlModel: function(){
        return new CheckBoxModel();
    },

    createControlView: function(model){
        return new CheckBoxView({model: model});
    }
}, controlValuePropertyMixin);