var PopupButtonDropdown = Backbone.View.extend({

    className: "pl-popup-button-dropdown",

    template: InfinniUI.Template["new/controls/popupButton/template/popupButton.dropdown.tpl.html"],

    UI: {
        container: '.pl-popup-button__items'
    },

    events: {
        click: 'onClickHandler'
    },

    /**
     *
     * @param {Object} options
     * @param {JQuery} options.content
     */
    initialize: function (options) {
        this.options = options || {};
    },

    render: function () {
        var options = this.options;

        this.$el.css({
            top: options.y,
            left: options.x
        });

        this.$el.html(this.template());
        this.bindUIElements();
        this.ui.container.append(options.content);

        return this;
    },

    onClickHandler: function () {
        this.trigger('close');
    }
});

_.extend(PopupButtonDropdown.prototype, bindUIElementsMixin);