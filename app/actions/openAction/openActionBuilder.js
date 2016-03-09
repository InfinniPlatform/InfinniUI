function OpenActionBuilder(){

}


_.extend(OpenActionBuilder.prototype, {
    build: function(context, args){
        var action = new OpenAction(args.parentView);

        var linkView = args.builder.build( args.metadata.LinkView,
                                            {
                                                parent: args.parentView,
                                                parentView: args.parentView,
                                                basePathOfProperty: args.basePathOfProperty
                                            });

        action.setProperty('linkView', linkView);

        return action;
    }
});