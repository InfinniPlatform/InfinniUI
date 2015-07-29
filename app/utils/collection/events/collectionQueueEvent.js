var CollectionQueueEvent = function () {
    this.events = {
        onAdd: CollectionOnAddEvent,
        onReplace: CollectionOnReplaceEvent,
        onRemove: CollectionOnRemoveEvent,
        onMove: CollectionOnMoveEvent,
        onReset: CollectionOnResetEvent,
        onChange: CollectionOnChangeEvent
    };

    this.reset();
};

CollectionQueueEvent.prototype.reset = function () {
    this.queue = Object.create(null);
};

CollectionQueueEvent.prototype.buildEvent = function (name) {
    var
        event,
        Event = this.events[name];

    if (typeof Event === 'function') {
        event = new Event();
    } else {
        console.error('Unknown event:', name);
    }
    return event;
};

CollectionQueueEvent.prototype.addEvent = function (name, event) {
    this.queue[name] = event;
};

CollectionQueueEvent.prototype.on = function (name) {
    var
        event = this.buildEvent(name);

    if (typeof event !== 'undefined') {
        event.init.apply(event, Array.prototype.slice.call(arguments, 1));
        this.addEvent(name, event);
    }
    return this;
};

CollectionQueueEvent.prototype.extract = function () {
    var
        params = Object.create(null),
        events = Object.create(null),
        event,
        argument;

    for (var i in this.queue) {
        event = this.queue[i];
        argument = event.getArgument();
        for (var name in argument) {
            params[name] = argument[name];
        }
    }
    event = this.buildEvent('onChange');
    event.init(params);
    this.addEvent('onChange', event);

    for (var name in this.queue) {
        events[name] = this.queue[name];
    }
    this.reset();

    return events;
};
