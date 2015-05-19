function ToolBarSeparator(parentView) {
    _.superClass(ToolBarSeparator, this, parentView);
}

_.inherit(ToolBarSeparator, Element);

_.extend(ToolBarSeparator.prototype, {

    createControl: function () {
        return new ToolBarSeparatorControl();
    }

});
