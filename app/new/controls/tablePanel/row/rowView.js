/**
 * @class
 * @augments ControlView
 */
var RowView = ContainerView.extend(
    /** @lends RowView.prototype */
    {
        className: 'pl-row row',

        initialize: function (options) {
            ContainerView.prototype.initialize.call(this, options);
        },

        render: function () {
            this.prerenderingActions();

            this.removeChildElements();

            this.renderItemsContents();

            this.updateProperties();
            this.trigger('render');

            this.postrenderingActions();
            return this;
        },

        renderItemsContents: function(){
            var items = this.model.get('items'),
                itemTemplate = this.model.get('itemTemplate'),
                that = this,
                element, item;

            items.forEach(function(item, i){
                element = itemTemplate(undefined, {item: item, index: i});
                that.addChildElement(element);
                that.$el
                    .append(element.render());
            });
        },

        updateGrouping: function(){}
    }
);