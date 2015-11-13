/**
 * @class
 * @augments ControlView
 */
var TabPageView = ContainerView.extend(/** @lends TabPageView.prototype */ {

    className: 'pl-tabpage',

    template: InfinniUI.Template["new/controls/tabPanel/tabPage/template/tabPage.tpl.html"],

    UI: {

    },

    initHandlersForProperties: function () {
        ContainerView.prototype.initHandlersForProperties.call(this);
        //this.listenTo(this.model, 'change:tabPageProperty', this.updateTabPageProperty);
    },

    updateProperties: function () {
        ContainerView.prototype.updateProperties.call(this);
        //this.updateTabPageProperty();
    },

    render: function () {
        this.prerenderingActions();

        this.removeChildElements();
        console.log(this.model.get('items'));
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

    renderItemsContents: function () {
        var $items = this.$el.find('.pl-tabpage-i'),
            items = this.model.get('items'),
            itemTemplate = this.model.get('itemTemplate'),
            that = this,
            element, item;

        $items.each(function (i, el) {
            item = items.getByIndex(i);
            element = itemTemplate(undefined, {item: item, index: i});
            that.addChildElement(element);
            $(el)
                .append(element.render());
        });
    },

    /**
     * @protected
     */
    updateGrouping: function () {

    }

});