/**
 * @class
 * @augments ControlView
 */
var PanelView = ContainerView.extend(/** @lends PanelView.prototype */ {

    className: 'pl-panel panel panel-default',

    template: InfinniUI.Template["controls/panel/template/panel.tpl.html"],

    UI: {
        header: '.pl-panel-header',
        items: '.panel-items'
    },

    events: {
        'click >.pl-panel-header': 'onClickHeaderHandler'
    },

    initialize: function (options) {
        ContainerView.prototype.initialize.call(this, options);
    },

    render: function () {
        this.prerenderingActions();

        this.removeChildElements();

        this.$el.html(this.template({
            items: this.model.get('items')
        }));

        this.bindUIElements();

        this.renderItemsContents();

        this.trigger('render');
        this.updateProperties();

        this.postrenderingActions();
        //devblockstart
        window.InfinniUI.global.messageBus.send('render', {element: this});
        //devblockstop
        return this;
    },

    initHandlersForProperties: function () {
        ContainerView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:collapsed', this.updateCollapsed);
        this.listenTo(this.model, 'change:collapsible', this.updateCollapsible);
        this.listenTo(this.model, 'change:header', this.updateHeader);
    },

    updateProperties: function () {
        ContainerView.prototype.updateProperties.call(this);
        this.updateCollapsed();
        this.updateCollapsible();
        this.updateHeader();
    },

    updateCollapsed: function () {
        this.ui.header.toggleClass('pl-collapsed', this.model.get('collapsed'));
    },

    updateCollapsible: function (model, value) {
        this.ui.header.toggleClass('pl-collapsible', this.model.get('collapsible'));
    },

    updateHeader: function () {
        var model = this.model;

        this.ui.header.empty();
        var headerTemplate = model.get('headerTemplate');
        if (typeof headerTemplate === 'function') {
            var header = model.get('header'),
                $header = headerTemplate(null, {value: header}).render();

            if( this.isDefaultHeader($header) ) {
                this.ui.header.hide();
            } else {
                this.ui.header.show();
                this.ui.header.append($header);
            }

        }
    },

    isDefaultHeader: function(headerTemplate) {
        var defaultTemplate = InfinniUI.PanelBuilder.prototype.buildDefaultHeaderTemplate()(null, {value: null}),
            defaultHeader = defaultTemplate.render();
        return defaultHeader[0].isEqualNode(headerTemplate[0]);
    },

    renderItemsContents: function () {
        var $items = this.$el.find('.pl-panel-i'),
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
    //
    //initOrientation: function () {
    //    this.listenTo(this.model, 'change:orientation', this.updateOrientation);
    //    this.updateOrientation();
    //},

    //updateOrientation: function () {
    //    var orientation = this.model.get('orientation');
    //    this.$el.toggleClass('horizontal-orientation', orientation == 'Horizontal');
    //},

    updateGrouping: function () {

    },

    onEventCallback: function () {
        var collapsible = this.model.get('collapsible');
        if (collapsible) {
            var collapsed = this.model.get('collapsed');
            this.model.set('collapsed', !collapsed);
            this.updateLayout();
        }
    },

    onClickHeaderHandler: function (event) {
        var collapsibleArea = this.model.get('collapsibleArea');
        if( collapsibleArea !== '' ) {
            if( $(event.target).closest('[data-pl-name=' + collapsibleArea + ']').length ) {
                this.onEventCallback();
            }
        } else {
            this.onEventCallback();
        }
    }

});
