/*var StackPanelView = ControlView.extend({
    tagName: 'ul',
    className: 'pl-stack-panel',

    template: _.template(
        '<li class="pl-stack-panel-i"><div class="clearfix"></div></li>'
    ),

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'itemsIsChange', this.rerender);

        this.initOrientation();
    },

    initOrientation: function () {
        this.listenTo(this.model, 'change:orientation', this.updateOrientation);
        this.updateOrientation();
    },

    updateOrientation: function () {
        var orientation = this.model.get('orientation');
        this.$el.toggleClass('horizontal-orientation', orientation == 'Horizontal');
    },

    render: function () {
        this.prerenderingActions();

        this.$el.empty();

        var magicConstant = 75;
        var magicConstant2 = 40;
        var orientation = this.model.get('orientation'),
            elementMeasures = [],
            items = this.model.getItems(),
            window = $('#page-content').height() - magicConstant - magicConstant2, //magic!!!
            fluid = 0;

        //_.each(items, function (item) {
        //    var measure = item.getHeight ? item.getHeight() : 0 ;//orientation == 'Vertical' ? item.getHeight() : item.getWidth();
        //
        //    if (measure === undefined) {
        //        fluid++;
        //    } else {
        //        window -= measure;
        //    }
        //
        //    elementMeasures.push(measure);
        //});

        var fluidHeight = window / fluid;

        for (var i = 0; i < items.length; i++) {
            var $item = this.renderItem(items[i]);

            //$item.height(elementMeasures[i] || fluidHeight);

            if(items[i].getWidth) {
                $item.width(items[i].getWidth());
            }

            this.$el.append($item);
        }

        this.postrenderingActions();

        return this;
    },

    renderItem: function (item) {
        var $wrap = $(this.template({})),
            $item = item.render();

        return $wrap.prepend($item);
    }
});*/