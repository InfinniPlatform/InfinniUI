function AddActionBuilder() {}

_.extend( AddActionBuilder.prototype,
    BaseActionBuilderMixin,
    BaseEditActionBuilderMixin,
    {
        build: function( context, args ) {
            var action = new AddAction( args.parentView );

            this.applyBaseActionMetadata( action, args );
            this.applyBaseEditActionMetadata( action, args );

            return action;
        }
    }
);

window.InfinniUI.AddActionBuilder = AddActionBuilder;
