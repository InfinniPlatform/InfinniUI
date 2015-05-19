var baseTextControlMixin = {

    onKeyDown: function (handler) {
        this.controlView.on('onKeyDown', handler);
    }
};

