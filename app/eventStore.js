function EventStore() {
    var handlers = {};

    this.addEvent = function (name, action) {
        var event = handlers[name];
        if (event === undefined) {
            event = { actions: [] };
            handlers[name] = event;
        }

        event.actions.push(action);
    };

    this.executeEvent = function (name) {
        var event = handlers[name],
            response = [],
            args = _.toArray(arguments).slice(1);

        if (event !== undefined) {
            response = _.map(event.actions, function (action) {
                return action.apply(null, args);
            });
        }
        return response;
    };
}