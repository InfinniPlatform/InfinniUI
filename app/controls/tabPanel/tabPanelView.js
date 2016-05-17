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
        this.listenTo(this.model, 'change:selectedItem', this.updateSelectedItem);
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.getTemplate());

        this.renderItemsContents();
        this.checkSelectedItem();

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
        this.model.set('selectedItemIndex', -1);

        var data = [];
        items.forEach(function (item, index) {
            data.push({
                tabElement: this.renderTabContent(item, index),
                item: item,
                index: index
            });
        }, this);

        this.renderTabHeaders(data);
    },

    /**
     * @protected
     * @param {Array.<Object>} data
     */
    renderTabHeaders: function (data) {
        var header,
            model = this.model,
            items = model.get('items'),
            selectedItem = model.get('selectedItem');

        if (Array.isArray(this.tabHeaders)) {
            while (header = this.tabHeaders.pop()) {
                this.stopListening(header);
                header.remove();
            }
        }

        this.tabHeaders = data.map(function (data) {
            var selected = items.indexOf(data.item) !== -1;
            var header = this.renderTabHeader(data.tabElement, selected);

            this.listenTo(header, 'selected', function () {
                model.set('selectedItem', data.tabElement);
            });

            this.listenTo(header, 'close', function () {
                data.tabElement.close();
            });

            return header;
        }, this);

    },

    /**
     *
     * @param {TabPage} tabPageElement
     * @param {boolean} selected
     * @returns {TabHeaderView}
     */
    renderTabHeader: function (tabPageElement, selected) {
        var header = new TabHeaderView({
            text: tabPageElement.getText(),
            canClose: tabPageElement.getCanClose(),
            selected: selected
        });

        tabPageElement.onPropertyChanged('text', function () {
            header.setText(tabPageElement.getText());
        });

        tabPageElement.onPropertyChanged('canClose', function () {
            header.setCanClose(tabPageElement.getCanClose());
        });

        this.ui.header.append(header.render().$el);
        return header;
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
            case InfinniUI.TabHeaderLocation.top:
                template = this.template.top;
                break;
            case InfinniUI.TabHeaderLocation.right:
                template = this.template.right;
                break;
            case InfinniUI.TabHeaderLocation.bottom:
                template = this.template.bottom;
                break;
            case InfinniUI.TabHeaderLocation.left:
                template = this.template.left;
                break;
            case InfinniUI.TabHeaderLocation.none:
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
        this.updateSelectedItem();
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
     * @description Проверяет чтобы одна из вкладок была активна
     */
    checkSelectedItem: function () {
        var
            model = this.model,
            tabPages = this.childElements,
            selectedItem = model.get('selectedItem');

        if (!Array.isArray(tabPages)) {
            model.set('selectedItem', null);
        } else if (tabPages.length) {
            if (tabPages.indexOf(selectedItem) === -1) {
                model.set('selectedItem', tabPages[0]);
            }
        } else {
            model.set('selectedItem', null);
        }
    },

    /**
     * @protected
     */
    updateSelectedItem: function () {
        if (!this.wasRendered) {
            return;
        }

        var
            tabPages = this.childElements,
            tabHeaders = this.tabHeaders,
            selectedItem = this.model.get('selectedItem'),
            selectedIndex = tabPages.indexOf(selectedItem);

        //TabPage
        if (Array.isArray(tabPages)) {
            tabPages.forEach(function (tabPage) {
                tabPage.setSelected(false);
            });

            if (selectedIndex !== -1) {
                tabPages[selectedIndex].setSelected(true);
            }
        }

        //TabHeader
        if (Array.isArray(tabHeaders)) {
            tabHeaders.forEach(function (tabHeader) {
                tabHeader.setSelected(false);
            });
            if (selectedIndex !== -1) {
                tabHeaders[selectedIndex].setSelected(true);
            }
        }

    },



    /**
     * @protected
     */
    updateGrouping: function () {

    }

});