var TabPageControl = function(){
    _.superClass(TabPageControl, this);
};

_.inherit(TabPageControl, Control);

_.extend(TabPageControl.prototype, {

    createControlModel: function(){
        return new TabPageModel();
    },

    createControlView: function(model){
        return new TabPageView({
            model: model,
            id: this.getId()
        });
    },

    getId: function () {
        return this.controlModel.getId();
    }

});