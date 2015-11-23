var layoutPanelViewMixin = {
    initLayoutPanelViewMixin: function () {
        this._updateViewName();
        this.listenTo(this.model, 'change:viewName', this._updateViewName);
    },

    _updateViewName: function () {
        this.$el.attr('data-pl-name-view', this.model.get('viewName'));
    }

};