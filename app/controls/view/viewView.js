/**
 * @class
 * @augments ContainerView
 */
var ViewView = ContainerView.extend(
    /** @lends ViewView.prototype */
    {
        className: 'pl-view',

        initialize: function (options) {
            ContainerView.prototype.initialize.call(this, options);
        },

        render: function () {
            this.prerenderingActions();

            this.$el.empty();

            this.renderItemsContents();

            this.updateProperties();
            this.trigger('render');

            this.postrenderingActions();
            //devblockstart
            window.InfinniUI.global.messageBus.send('render', {element: this});
            //devblockstop
            return this;
        },

        renderItemsContents: function(){
            var that = this,
                items = this.model.get('items'),
                itemTemplate = this.model.get('itemTemplate'),
                element;

            items.forEach(function(item, i){
                element = itemTemplate(undefined, {item: item, index: i});
                if (element) {
                    that.$el
                        .append(element.render());
                }
            });
        },

        updateGrouping: function(){}
    }
);
