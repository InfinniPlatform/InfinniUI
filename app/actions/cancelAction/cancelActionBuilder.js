function CancelActionBuilder() {}

_.extend(CancelActionBuilder.prototype,
    BaseActionBuilderMixin,
    {
        build: function (context, args) {
            var action = new CancelAction(args.parentView);

            this.applyBaseActionMetadata(action, args);

            return action;
        }
    }
);