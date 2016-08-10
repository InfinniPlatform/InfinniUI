function EditActionBuilder(){}

_.extend(EditActionBuilder.prototype,
    BaseActionBuilderMixin,
    BaseEditActionBuilderMixin,
    {
        build: function(context, args){
            var action = new EditAction(args.parentView);

            this.applyBaseActionMetadata(action, args);
            this.applyBaseEditActionMetadata(action, args);

            return action;
        }
    }
);