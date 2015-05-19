var UploadFileBoxControl = function(){
    _.superClass(UploadFileBoxControl, this);
};

_.inherit(UploadFileBoxControl, Control);

_.extend(UploadFileBoxControl.prototype, {
    createControlModel: function(){
        return new UploadFileBoxModel();
    },

    createControlView: function(model){
        return new UploadFileBoxView({model: model});
    },

    onValueChanged: function(handler){
        this.controlModel.on('change:value', handler);
    }
});