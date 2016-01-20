var AjaxLoaderIndicatorView = Backbone.View.extend({

    className: 'pl-ajaxloader',

    template: InfinniUI.Template["services/ajaxLoaderIndicator/template/template.tpl.html"],

    hiddenClassName: 'hidden',

    initialize: function () {
        var exchange = window.InfinniUI.global.messageBus;
        this.listenTo(this.model, 'change:progress', this.updateProgress);
    },

    render: function () {
        this.$el.html(this.template());
        this.updateProgress();
        return this;
    },

    updateProgress: function () {
        var progress = this.model.get('progress');
        this.$el.toggleClass(this.hiddenClassName, !progress);
    }

});