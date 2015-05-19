var PanelControl = function () {
    _.superClass(PanelControl, this);
};

_.inherit(PanelControl, Control);

_.extend(PanelControl.prototype, {
    createControlModel: function () {
        return new PanelModel();
    },

    createControlView: function (model) {
        return new PanelView({model: model});
    },

    setText: function (value) {
        this.controlModel.set('text', value);
    },

    addItem: function (item) {
        this.controlModel.get('items').push(item);
    },

    onExpanded: function (handler) {
        this.controlModel.on('change:collapsed', function (model) {
            if (model.get('collapsed')) {
                handler();
            }
        });
    },

    onCollapsed: function (handler) {
        this.controlModel.on('change:collapsed', function (model) {
            if (!model.get('collapsed')) {
                handler();
            }
        });
    }
});

//TODO: copy-paste from stackPanel
var PanelModel = Backbone.Model.extend({
    defaults: _.defaults({
        collapsible: false,
        collapsed: true,
        items: null
    }, ControlModel.prototype.defaults),

    initialize: function () {
        this.set('items', [])
    },

    getItems: function () {
        return this.get('items');
    }
});

var PanelView = ControlView.extend({
    className: 'pl-panel',

    events: {
        'click .collapse': 'onButtonCollapseClickHandler',
        'click .expand': 'onButtonExpandClickHandler'
    },

    template: InfinniUI.Template["controls/panel/template/panel.tpl.html"],

    templateCollapse: _.template('<div class="tools"><a href="javascript:;" class="collapse"></a></div>'),

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.isFirstCollapse = true;
    },

    render: function () {
        this.prerenderingActions();

        var $wrap = $(this.template(this.model.toJSON()));

        this.$el.html($wrap);
        var $body = this.$el.find('.portlet-body .items');
        _.each(this.model.getItems(), function (item) {
            $body.append(item.render());
        });

        if (this.model.get('collapsible')) {
            $wrap.children('.portlet-title').append(this.templateCollapse({}));
        }

        this.onCollapsedHandler(this.model.get('collapsed'));

        this.postrenderingActions();
        return this;
    },

    onButtonCollapseClickHandler: function (e) {
        var parentsEl = $(e.target).parentsUntil(this.$el);

        if ($(e.target).hasClass('collapse') && parentsEl.length < 4) {
            this.model.set('collapsed', false);
            this.onCollapsedHandler(this.model.get('collapsed'));
        }
    },

    onButtonExpandClickHandler: function (e) {
        var parentsEl = $(e.target).parentsUntil(this.$el);

        if ($(e.target).hasClass('expand') && parentsEl.length < 4) {
            this.model.set('collapsed', true);
            this.onCollapsedHandler(this.model.get('collapsed'));
        }
    },

    onCollapsedHandler: function (collapsed) {
        if (!collapsed) {
            this.$el.find('.collapse').removeClass('collapse').addClass('expand');
            if (this.isFirstCollapse) {
                this.$el.find('.portlet-body').css('display', 'none');
            } else {
                this.$el.find('.portlet-body').slideUp(200);
            }

            this.trigger('onExpanded', this.model.get('collapsed'));
        } else {
            this.$el.find('.expand').removeClass('expand').addClass('collapse');
            this.$el.find('.portlet-body').slideDown(200);
            this.isFirstCollapse = false;

            this.trigger('onCollapsed', this.model.get('collapsed'));
        }
    }
});