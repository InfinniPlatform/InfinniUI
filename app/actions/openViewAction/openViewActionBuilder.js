function OpenViewActionBuilder(){

}


_.extend(OpenViewActionBuilder.prototype, {
    build: function(context, args){
        var action = new OpenViewAction();

        var linkView = args.builder.build(args.metadata.View, {parentView: args.parentView});
        action.setProperty('linkView', linkView);

        return action;
    }
});