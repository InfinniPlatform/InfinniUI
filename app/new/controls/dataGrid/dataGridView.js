/**
 * @constructor
 * @augments ListEditorBaseView
 */
var DataGridView = ListEditorBaseView.extend({

    template: {
        "grid": InfinniUI.Template["new/controls/dataGrid/template/dataGrid.tpl.html"],
        "gridStretched": InfinniUI.Template["new/controls/dataGrid/template/dataGridStretched.tpl.html"],
        "headerCell": InfinniUI.Template["new/controls/dataGrid/template/headerCell.tpl.html"],
        "sizeCell": InfinniUI.Template["new/controls/dataGrid/template/sizeCell.tpl.html"]
    },

    className: 'pl-datagrid',

    events: _.extend({},
        ListEditorBaseView.prototype.events,
        {
            "click .pl-datagrid-toggle_all": "onClickCheckAllHandler"
        }
    ),

    UI: _.defaults({
        body: ".pl-datagrid__body",
        head: ".pl-datagrid__head",
        headContainer: ".pl-datagrid-container_head",

        header: '.pl-datagrid-row_header',
        firstRows: '.pl-datagrid-row_first',
        toggleCell: ".pl-toggle-cell",
        checkAll: ".pl-datagrid-toggle__button",
        items: 'tbody'
    }, ListEditorBaseView.prototype.UI),

    initialize: function (options) {
        ListEditorBaseView.prototype.initialize.call(this, options);
        this.rowElements = new HashMap();
    },

    initHandlersForProperties: function(){
        ListEditorBaseView.prototype.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:showSelectors', this.updateShowSelectors);
        this.listenTo(this.model, 'change:checkAllVisible', this.updateCheckAllVisible);
        this.listenTo(this.model, 'change:checkAll', this.updateCheckAll);
    },

    updateProperties: function () {
        ListEditorBaseView.prototype.updateProperties.call(this);
        this.updateShowSelectors();
        this.updateCheckAllVisible();
        this.updateCheckAll();
    },

    updateShowSelectors: function () {
        var showSelectors = this.model.get('showSelectors');
        this.$el.toggleClass('pl-datagrid_selectors_show', showSelectors);
        this.$el.toggleClass('pl-datagrid_selectors_hide', !showSelectors);
    },

    updateGrouping: function () {

    },

    updateVerticalAlignment: function () {
        ListEditorBaseView.prototype.updateVerticalAlignment.call(this);
        this.switchClass('verticalAlignment', this.model.get('verticalAlignment'), this.ui.body, false);
    },

    updateCheckAll: function () {
        var checkAll = this.model.get('checkAll');
        this.ui.checkAll.prop('checked', checkAll);
    },

    getHorizontalScrollBarWidth: function () {

        if (typeof DataGridView.scrollbarWidth === 'undefined') {
            var scrollDiv = document.createElement('div');
            var body = document.body;

            scrollDiv.className = 'modal-scrollbar-measure';
            var style = {
                position: "absolute",
                top: "-9999px",
                width: "50px",
                height: "50px",
                overflow: "scroll"
            };

            for(var name in style) {
                scrollDiv.style[name] = style[name]
            }

            body.appendChild(scrollDiv);
            DataGridView.scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            body.removeChild(scrollDiv);
        }

        return DataGridView.scrollbarWidth;
    },

    updateCheckAllVisible: function () {
        var checkAllVisible = this.model.get('checkAllVisible');
        this.ui.checkAll.toggleClass('hidden', !checkAllVisible);
    },

    updateMultiSelect: function () {
        ListEditorBaseView.prototype.updateMultiSelect.call(this);

        var multiSelect = this.model.get('multiSelect');
        this.$el.toggleClass('pl-datagrid_select_multi', multiSelect === true);
        this.$el.toggleClass('pl-datagrid_select_single', multiSelect !== true);
    },

    updateValue: function () {
        var
            model = this.model,
            value = model.get('value'),
            indices = [],
            items = model.get('items');

        if(!model.get('multiSelect') && value !== undefined && value !== null){
            value = [value];
        }

        if (Array.isArray(value)) {
            indices = value.map(function (val) {
                    return model.itemIndexByValue(val);
                })
                .filter(function (index) {
                    return index !== -1;
                });
        }

        this.rowElements.forEach(function (rowElement, item) {
            var index = items.indexOf(item);
            var toggle = indices.indexOf(index) !== -1;
            rowElement.toggle(toggle);
        });

    },

    updateSelectedItem: function () {
        var
            model = this.model,
            selectedItem = model.get('selectedItem');

        this.rowElements.forEach(function (rowElement, item) {
            rowElement.setSelected(item === selectedItem);
        });
    },

    render: function () {
        this.prerenderingActions();

        var verticalAlignment = this.model.get('verticalAlignment');
        var template = (verticalAlignment === 'Stretch') ? this.template.gridStretched : this.template.grid;
        this.$el.html(template());

        this.bindUIElements();

        this.renderHeaders();
        this.renderItems();
        this.updateProperties();

        this.trigger('render');

        this.applyColumnWidth();
        this.syncBodyAndHead();
        this.postrenderingActions();
        return this;
    },

    applyColumnWidth: function () {
        var columns = this.model.get('columns');
        var fixedTableLayout = false;

        this.ui.firstRows.children().each(function (i, el) {
            var columnIndex = i % (columns.length + 1);

            if (columnIndex === 0) {
                //skip columns with checkbox/radiobutton
                return;
            }

            var column = columns.getByIndex(columnIndex - 1);
            var width = column && column.getWidth();

            if (width) {
                $(el).css('width', width);
                fixedTableLayout = true;
            }
        });

        this.$el.toggleClass('pl-datagrid_layout_fixed', fixedTableLayout);
    },

    syncBodyAndHead: function () {
        //var $body = this.ui.body;
        var $head = this.ui.head;

        $head.css('padding-right', this.getHorizontalScrollBarWidth() + "px");

        this.ui.body
            .off('scroll')
            .on('scroll', this.onScrollBodyHandler.bind(this));

    },

    onScrollBodyHandler: function () {
        this.ui.headContainer.scrollLeft(this.ui.body.scrollLeft());
    },

    renderHeaders: function () {
        var columns = this.model.get('columns');
        var templateHeaderCell = this.template.headerCell;
        var sizeCells = [];
        var templateSizeCells = this.template.sizeCell;

        var $headers = columns.toArray().map(function (column) {

            sizeCells.push(templateSizeCells());
            var $th = $(templateHeaderCell());

            var headerTemplate = column.getHeaderTemplate();
            var header = column.getHeader();

            var headerElement;

            if (headerTemplate) {
                headerElement = headerTemplate(null, {value: header});
                $th.append(headerElement.render());

            } else {
                $th.append(header);
            }
            return $th;
        });

        this.ui.header.append($headers);
        this.ui.firstRows.append(sizeCells);
    },

    renderItems: function () {
        var
            model = this.model,
            valueSelector = model.get('valueSelector'),
            itemTemplate = model.get('itemTemplate'),
            items = model.get('items'),
            $items = this.ui.items;

        this.removeRowElements();
        items.forEach(function (item, index) {
            var element = itemTemplate(undefined, {index: index, item: item});

            element.onBeforeClick(function() {
                model.set('selectedItem', item);
            });
            element.onToggle(function() {
                model.toggleValue(valueSelector(undefined, {value:item}));
            });
            this.addRowElement(item, element);
            $items.append(element.render());
        }, this);

    },

    addRowElement: function(item, element){
        this.addChildElement(element);
        this.rowElements.add(item, element);
    },

    removeRowElements: function () {
        this.removeChildElements();
        this.rowElements.clear();
    },

    onClickCheckAllHandler: function () {
        this.model.toggleCheckAll();
    }


});


