function EventDispatcher() {
    this._listeners = {};
}

EventDispatcher.prototype.register = function (eventName, callback) {
    this._listeners[eventName] = this._listeners[eventName] || [];

    var listeners = this._listeners[eventName];
    if (listeners.indexOf(callback) === -1) {
        listeners.push(callback);
    }
};

EventDispatcher.prototype.emit = function (eventName, params) {
    var listeners = this._listeners[eventName];

    if (typeof listeners === 'undefined') {
        return;
    }

    listeners.forEach(function (callback) {
        callback.apply(undefined, params);
    });
};

EventDispatcher.prototype.applyTo = function (object) {
    var eventDispatcher = this;
    object.emit = function (eventName, params) {
        eventDispatcher.emit(eventName, params)
    };
};
