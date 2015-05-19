var DataGridColumnResize = function (view) {
    this.view = view;
    this.events = {};

    this._drag = this.drag.bind(this);
    this._drop = this.drop.bind(this);
};

DataGridColumnResize.prototype.start = function (event) {
    $(document).on('mousemove', this._drag);
    $(document).on('mouseup', this._drop);
    this.invokeEvent('onStart', event.pageX, event.pageY);
};

DataGridColumnResize.prototype.drag = function (event) {
    event.preventDefault();

    this.invokeEvent('onDrag', event.pageX, event.pageY);
};

DataGridColumnResize.prototype.drop = function (event) {
    $(document).off('mouseup', this._drop);
    $(document).off('mousemove', this._drag);
    this.invokeEvent('onStop', event.pageX, event.pageY);
};

DataGridColumnResize.prototype.bindEvent = function (name, handler) {
    if (typeof handler !== 'function' || handler === null) {
        return;
    }

    if (typeof this.events[name] === 'undefined') {
        this.events[name] = [];
    }

    var handlers = this.events[name];

    if (handlers.indexOf(handler) !== -1) {
        return;
    }

    handlers.push(handler);
};

DataGridColumnResize.prototype.invokeEvent = function (name) {
    var args = Array.prototype.slice.call(arguments, 1);

    if (!this.events[name]) {
        return;
    }

    _.forEach(this.events[name], function (handler) {
        handler.apply(undefined, args);
    }, this);

};

DataGridColumnResize.prototype.onStart = function (handler) {
    this.bindEvent('onStart', handler)
};

DataGridColumnResize.prototype.onDrag = function (handler) {
    this.bindEvent('onDrag', handler)
};

DataGridColumnResize.prototype.onStop = function (handler) {
    this.bindEvent('onStop', handler)
};