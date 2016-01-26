var ajaxRequestMixin = (function (bus) {

    function invokeCallback(cb, args) {
        var result;
        if (typeof cb === 'function') {
            result = cb.apply(null, Array.prototype.slice.call(args));
        }
        return result;
    }

    return {

        onBeforeRequest: function (callback) {
            return function () {
                bus.send(messageTypes.onDataLoading, {});
                return invokeCallback(callback, arguments);
            }
        },

        onSuccessRequest: function (callback) {
            return function () {
                bus.send(messageTypes.onDataLoaded, {success: true});
                return invokeCallback(callback, arguments);
            }
        },

        onErrorRequest: function (callback) {
            return function () {
                bus.send(messageTypes.onDataLoaded, {success: false});
                return invokeCallback(callback, arguments);
            }
        }
    }

})(window.InfinniUI.global.messageBus);