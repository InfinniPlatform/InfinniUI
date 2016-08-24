var ActionOnLoseFocus = function ($el, action) {
    var that = this;
    this.$el = $el;
    this.action = action;
    this.checkNeedToAction_binded = _.bind(this.checkNeedToAction, this);

    $(document).on('mousedown', that.checkNeedToAction_binded);
};

ActionOnLoseFocus.prototype.checkNeedToAction = function (e) {
    if ($(e.target).closest(this.$el).length == 0) {
        this.action();
        $(document).off('mousedown', this.checkNeedToAction_binded)
    }
};

window.InfinniUI.ActionOnLoseFocus = ActionOnLoseFocus;
