var ToolBarView = ControlView.extend({
    className: 'pl-tool-bar',

    template: _.template('<ul class="page-breadcrumb breadcrumb"></ul>'),
    templateItem: _.template('<li class="btn-group"></li>'),

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.listenTo(this.model, 'change:enabled', this.updateEnabled);
    },

    render: function () {
        this.prerenderingActions();

        this.$el.empty();

        var $toolbar = $(this.template({}));

        _.each(this.model.getItems(), function (item) {
            var $item = $(this.templateItem({}));
            $item.append($(item.render()));
//            this.$el.append(item.render());
            $toolbar.append($item);
        }, this);
        this.$el.append($toolbar);

        this.updateEnabled();

        this.postrenderingActions();

        return this;
    },

    updateEnabled: function(){
        this.$el.find('button').prop('disabled', !this.model.get('enabled'));
    }
});