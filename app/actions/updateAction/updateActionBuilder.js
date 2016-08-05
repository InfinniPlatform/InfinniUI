function UpdateActionBuilder() {}

_.extend(UpdateActionBuilder.prototype,
    BaseActionBuilderMixin,
    {
        build: function (context, args) {

            var dataSource = args.parentView.getContext().dataSources[args.metadata.DestinationValue.Source];

            var action = new UpdateAction(args.parentView);

            this.applyBaseActionMetadata(action, args);

            action.setProperty('dataSource', dataSource);

            return action;
        }
    }
);