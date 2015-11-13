var TabHeaderModel = Backbone.Model.extend({

    defaults: {
        text: '',
        canClose: false
    }
});

var TabHeaderView = Backbone.View.extend({

    className: "pl-tabheader",

    tagName: "li",

    template: InfinniUI.Template["new/controls/tabPanel/tabHeader/template/tabHeader.tpl.html"],

    UI: {
        label: '.pl-tabheader-text'
    },

    initialize: function (options) {
        this.model = new TabHeaderModel(options);

        this.on('rendered', this.onRenderedHandler);
    },

    render: function () {
        this.$el.html(this.template);
        this.bindUIElements();
        this.trigger('rendered');
        return this;
    },

    /**
     *
     * @param {string} value
     */
    setText: function (value) {
        this.model.set('text', value);
    },

    /**
     *
     * @param {boolean} value
     */
    setCanClose: function (value) {
        this.model.set('canClose', value);
    },

    /**
     * @protected
     */
    updateProperties: function () {
        this.updateTextHandler();
    },

    /**
     * @protected
     */
    onRenderedHandler: function () {
        this.updateProperties();
        this.listenTo(this.model, 'change:text', this.updateTextHandler);
    },

    /**
     * @protected
     */
    updateTextHandler: function () {
        var text = this.model.get('text');
        this.ui.label.text(text);
    }

});

_.extend(TabHeaderView.prototype, bindUIElementsMixin);