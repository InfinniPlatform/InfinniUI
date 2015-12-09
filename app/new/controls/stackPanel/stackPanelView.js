/**
 * @class
 * @augments ControlView
 */
var StackPanelView = ContainerView.extend(
    /** @lends StackPanelView.prototype */
    {
        tagName: 'ul',
        className: 'pl-stack-panel',

        template: InfinniUI.Template["new/controls/stackPanel/template/stackPanel.tpl.html"],

        UI: {
            items: '.stackpanel-items'
        },

        initialize: function (options) {
            ContainerView.prototype.initialize.call(this, options);

            this.initOrientation();
        },

        render: function () {
            this.prerenderingActions();

            this.removeChildElements();

            this.$el.html(this.template({
                items: this.model.get('items')
            }));
            this.renderItemsContents();

            this.bindUIElements();

            this.postrenderingActions();
            this.trigger('render');
            this.updateProperties();
            return this;
        },

        renderItemsContents: function(){
            var $items = this.$el.find('.pl-stack-panel-i'),
                items = this.model.get('items'),
                itemTemplate = this.model.get('itemTemplate'),
                that = this,
                element, item;

            $items.each(function(i, el){
                item = items.getByIndex(i);
                element = itemTemplate(undefined, {item: item, index: i});
                that.addChildElement(element);
                $(el)
                    .append(element.render());
            });
        },

        initOrientation: function () {
            this.listenTo(this.model, 'change:orientation', this.updateOrientation);
            this.updateOrientation();
        },

        updateOrientation: function () {
            var orientation = this.model.get('orientation');
            this.$el.toggleClass('horizontal-orientation', orientation == 'Horizontal');
        },

        updateGrouping: function(){}
    }
);
