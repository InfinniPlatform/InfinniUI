var ActionBarView = ControlView.extend({

    className: 'pl-action-bar',

    template: {
        //panel: InfinniUI.Template["controls/filterPanel/template/template.tpl.html"],
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:pages', this.onPagesChange);
    },

    render: function () {
        this.renderButtons();
        return this;
    },

    renderButtons: function () {
        var pages = this.model.get('pages');
        var buttons = _.map(pages, function (pageView) {
            var button = new ActionBarButtonView({
                key: pageView.getGuid(),
                text: pageView.getText()
            });
        }, this);
    },

    onPagesChange: function () {

        var pages = this.model.get('pages');
        console.log(pages);
        for (var i = 0, ln = pages.length; i < ln; i = i + 1) {

        }
    }

});