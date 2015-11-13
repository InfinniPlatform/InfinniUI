/**
 * @class
 * @augments ControlView
 */
var TabPanelView = ContainerView.extend(/** @lends TabPanelView.prototype */ {

    className: 'pl-tabpanel',

    template: {
        top: InfinniUI.Template["new/controls/tabPanel/template/tabPanel.top.tpl.html"],
        right: InfinniUI.Template["new/controls/tabPanel/template/tabPanel.right.tpl.html"],
        bottom: InfinniUI.Template["new/controls/tabPanel/template/tabPanel.bottom.tpl.html"],
        left: InfinniUI.Template["new/controls/tabPanel/template/tabPanel.left.tpl.html"],
        none: InfinniUI.Template["new/controls/tabPanel/template/tabPanel.none.tpl.html"]
    },

    UI: {
        header: '.pl-tabpanel-header',
        content: '.pl-tabpanel-content'
    },

    initHandlersForProperties: function () {
        ContainerView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:headerLocation', this.onChangeHeaderLocation);
        this.listenTo(this.model, 'change:headerOrientation', this.updateHeaderOrientation);
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.getTemplate());

        this.renderItemsContents();

        this.postrenderingActions();

        this.trigger('render');
        this.updateProperties();
        return this;
    },

    /**
     * @protected
     */
    renderItemsContents: function () {
        var items = this.model.get('items');

        this.removeChildElements();
        this.ui.content.empty();

        items.forEach(function (item, index) {
            var
                elTab = this.renderTabContent(item, index);

            this.renderTabHeader(elTab, item, index);
        }, this);
    },

    renderTabHeader: function (tabPageElement, item, index) {
        var header = new TabHeaderView({
            text: tabPageElement.getText(),
            canClose: tabPageElement.getCanClose()
        });

        tabPageElement.onPropertyChanged('text', function () {
            header.setText(tabPageElement.getText());
        });

        tabPageElement.onPropertyChanged('canClose', function () {
            header.setCanClose(tabPageElement.getCanClose());
        });

        this.ui.header.append(header.render().$el);
    },

    renderTabContent: function (item, index) {
        var
            itemTemplate = this.model.get('itemTemplate'),
            element = itemTemplate(undefined, {item: item, index: index});

        this.addChildElement(element);
        this.ui.content.append(element.render());
        return element;
    },

    /**
     * @protected
     * @returns {Function}
     */
    getTemplate: function () {
        var
            template,
            headerLocation = this.model.get('headerLocation');

        switch (headerLocation) {
            case TabHeaderLocation.top:
                template = this.template.top;
                break;
            case TabHeaderLocation.right:
                template = this.template.right;
                break;
            case TabHeaderLocation.bottom:
                template = this.template.bottom;
                break;
            case TabHeaderLocation.left:
                template = this.template.left;
                break;
            case TabHeaderLocation.none:
            default:
                template = this.template.none;
                break;
        }

        return template;
    },

    /**
     * @protected
     */
    updateProperties: function () {
        ContainerView.prototype.updateProperties.call(this);
        this.updateHeaderOrientation();
    },

    /**
     * @protected
     */
    onChangeHeaderLocation: function () {
        //При изменении положения вкладок меняется весь шаблон
        this.rerender();
    },

    /**
     * @protected
     */
    updateHeaderOrientation: function () {
        //@TODO Реализовать TabPanel.updateHeaderOrientation()
    },

    /**
     * @protected
     */
    updateGrouping: function () {

    }

});