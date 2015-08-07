function EventManager() {
    this.handlers = {};
}

EventManager.prototype.on = function (name, handler) {
    if (typeof this.handlers[name] === 'undefined') {
        this.handlers[name] = [];
    }
    this.handlers[name].push(handler);
    return this;
};

EventManager.prototype.trigger = function (name, message) {
    var eventHandlers = this.handlers[name];
    var response;
    if (Array.isArray(eventHandlers)) {
        response = eventHandlers.map(function (handler) {
            return handler.call(undefined, message);
        });
    }
    return this.isSuccess(response);
};

EventManager.prototype.isSuccess = function (response) {
    var success = true;
    if (Array.isArray(response)) {
        for (var i = 0; i < response.length; i = i + 1) {
            if (response[i] === false) {
                success = false;
                break;
            }
        }
    }
    return success;
};