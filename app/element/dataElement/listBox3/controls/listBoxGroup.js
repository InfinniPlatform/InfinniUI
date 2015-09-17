var ListBoxGroupModel = Backbone.Model.extend({});

var ListBoxGroup = Backbone.View.extend({

    className: 'pl-listbox-group',

    UI: {
        header: '.pl-listbox-group__header',
        body: '.pl-listbox-group__body'
    },

    template: InfinniUI.Template['element/dataElement/listBox3/controls/template/listBoxGroup.tpl.html'],

    events: {
        'click .pl-listbox-group__header': 'onGroupHeaderClickHandler'
    },

    initialize: function (options) {
        this.model = new ListBoxGroupModel();
        var options = {
            collapsed: options.collapsed,
            collapsible: options.collapsible,
            header: options.header,
            body: options.body
        };

        this.model.set(options);
    },

    render: function () {
        this.$el.html(this.template());
        this.bindUIElements();

        this.ui.header.append(this.model.get('header'));
        this.ui.body.append(this.model.get('body'));

        this.applyCollapsed();
        this.applyCollapsible();
        this.initOnChangeHandler();

        return this;
    },

    initOnChangeHandler: function () {
        this.listenTo(this.model, 'change:collapsed', this.onCollapsedChanged);
    },

    onGroupHeaderClickHandler: function (event) {
        var collapsed = this.model.get('collapsed'),
            collapsible = this.model.get('collapsible');

        if (collapsible) {
            this.model.set('collapsed', !collapsed);
        }
    },

    onCollapsedChanged: function (model, value) {
        this.applyCollapsed();
        this.trigger('collapsed', value);
    },

    applyCollapsed: function () {
        var collapsed = this.model.get('collapsed');
        this.$el.toggleClass('listbox-group-collapsed', collapsed);
    },

    applyCollapsible: function () {
        var collapsible = this.model.get('collapsible');
        this.$el.toggleClass('listbox-group-collapsible', collapsible);
    }
});

_.extend(ListBoxGroup.prototype, bindUIElementsMixin);