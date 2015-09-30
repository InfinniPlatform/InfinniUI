/**
 * @constructor
 * @augments ContainerView
 */
var ToolBarView = ContainerView.extend({

    className: 'pl-tool-bar',

    template: InfinniUI.Template["new/controls/toolBar/template/toolBar.tpl.html"],

    itemTemplate: InfinniUI.Template["new/controls/toolBar/template/toolBarItem.tpl.html"],

    UI: {
        container: '.pl-tool-bar__container'
    },

    render: function () {
        this.prerenderingActions();
        this.renderTemplate(this.template);
        this.ui.container.append(this.renderItems());
        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    renderItems: function () {
        var model = this.model;
        var items = model.get('items');
        var itemTemplate = model.get('itemTemplate');

        this.removeChildElements();

        var $elements = [];

        items.forEach(function (item, index) {
            var template = this.itemTemplate();
            var $template = $(template);

            var element = itemTemplate(null, {
                index: index,
                item: item
            });
            this.addChildElement(element);
            $template.append(element.render());
            $elements.push($template);
        }, this);

        return $elements;
    }
});
