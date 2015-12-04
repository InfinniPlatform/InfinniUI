function BaseAction(parentView){
    this.parentView = parentView;
}

_.extend(BaseAction.prototype, {
    setProperty: function(name, value){
        this[name] = value;
    },

    getProperty: function(name){
        return this[name];
    }
});

InfinniUI.global.executeAction = function (context, executeActionMetadata, resultCallback) {
    var builder = new ApplicationBuilder();

    var action = builder.build( executeActionMetadata, {parentView: context.view});

    action.execute(resultCallback);
};