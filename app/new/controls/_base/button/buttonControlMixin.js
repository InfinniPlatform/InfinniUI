var buttonControlMixin = {

    click: function () {
        this.controlView.trigger('onClick');
    }

};