var ToolBarView = ControlView.extend({
    className: 'pl-tool-bar',

    template: _.template('<ul class="page-breadcrumb breadcrumb"></ul>'),
    templateItem: _.template('<li class="btn-group"></li>'),

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
    },

    render: function () {
        this.prerenderingActions();

        this.$el.empty();

        var $toolbar = $(this.template({}));

        _.each(this.model.getItems(), function (item) {
            var $itemTemplate = $(this.templateItem({}));

            $itemTemplate.append($(item.render()));
            $toolbar.append($itemTemplate);
        }, this);

        this.$el.append($toolbar);

        this.postrenderingActions();

        return this;
    }
});