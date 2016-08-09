function UpdateActionBuilder() {}

_.extend(UpdateActionBuilder.prototype,
    BaseActionBuilderMixin,
    BaseFallibleActionBuilderMixin,
    {
        build: function (context, args) {

            var dataSource = args.parentView.getContext().dataSources[args.metadata.DestinationValue.Source];

            var action = new UpdateAction(args.parentView);

            this.applyBaseActionMetadata(action, args);
            this.applyBaseFallibleActionMetadata(action, args);

            action.setProperty('dataSource', dataSource);

            return action;
        }
    }
);