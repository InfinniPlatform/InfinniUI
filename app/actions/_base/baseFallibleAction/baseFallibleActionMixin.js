var BaseFallibleActionMixin = {
    onSuccessHandler: function(args) {
        var onSuccessHandler = this.getProperty('onSuccessHandler');

        if(_.isFunction(onSuccessHandler)) {
            onSuccessHandler(args);
        }
    },
    onErrorHandler: function(args) {
        var onErrorHandler = this.getProperty('onErrorHandler');

        if(_.isFunction(onErrorHandler)) {
            onErrorHandler(args);
        }
    }
};