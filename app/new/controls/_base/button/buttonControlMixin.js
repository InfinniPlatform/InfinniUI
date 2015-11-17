var buttonControlMixin = {

    onClick: function (handler) {
        this.controlView.on('onClick', handler);
    },

    click: function () {
        this.controlView.trigger('onClick');
    }

};