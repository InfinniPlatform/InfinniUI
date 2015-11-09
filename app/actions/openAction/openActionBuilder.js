function OpenActionBuilder(){

}


_.extend(OpenActionBuilder.prototype, {
    build: function(context, args){
        var action = new OpenAction(args.parentView);

        var linkView = args.builder.build(args.metadata.LinkView, {parentView: args.parentView});
        action.setProperty('linkView', linkView);

        return action;
    }
});