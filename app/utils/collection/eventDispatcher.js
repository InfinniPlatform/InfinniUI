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

EventDispatcher.prototype.emit = function (eventName) {
    var listeners = this._listeners[eventName];

    if (typeof listeners === 'undefined') {
        return;
    }

    var args = Array.prototype.slice.call(arguments, 1);

    listeners.forEach(function (callback) {
        callback.apply(undefined, args);
    });
};

EventDispatcher.prototype.applyTo = function (object) {
    object.emit = this.emit.bind(this);
};
