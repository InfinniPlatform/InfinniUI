var baseTextElementMixin = {

    onKeyDown: function (handler) {
        var element = this;
        var callback = function (data) {
            data.source = element;
            handler(data);
        };
        return this.control.onKeyDown(callback);
    }

};