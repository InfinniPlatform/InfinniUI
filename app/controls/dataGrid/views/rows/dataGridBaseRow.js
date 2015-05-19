/**
 * @description Представление строки DataGrid
 * @class DataGridBaseRow
 * @extends Backbone.View
 */
var DataGridBaseRow = Backbone.View.extend({

    tagName: 'tr',

    attributes: {
        tabindex: 1
    },

    template: InfinniUI.Template['controls/dataGrid/template/rows/base.tpl.html'],

    UI: {
        checkbox: 'input',
        checkboxCell: '.cell-checkbox'
    },

    events: {
        click: 'onClickHandler',
        dblclick:'onDoubleClickHandler',
        mousedown: 'onMouseDownHandler',
        mouseover: 'onMouseOverHandler',
        mouseleave: 'onMouseLeaveHandler',
        hover: 'onHoverHandler',
        contextmenu: 'onContextMenuHandler'
    },

    initialize: function (options) {
        this.options = options;
        this.listenTo(options.grid, 'change:value', this.OnChangeValueHandler);
        this.listenTo(options.grid, 'change:selectedItem', this.OnChangeSelectedItemHandler);

    },

    render: function () {
        this.bindUIElements();
        this.bindUIEvents();
        this.renderCells();

        this.applyActiveRow();
        this.applySelectedRow();

        return this;
    },

    bindUIEvents: function () {

    },

    renderCells: function () {
        var
            options = this.options,
            row = options.row,
            grid = options.grid,
            columns = options.columns,
            fragment = document.createDocumentFragment(),
            cell;

        if(this.options.grid.model.get('multiSelect') === true) {
            cell = new DataGridBodyCheckBoxCell();
            this.checkbox = cell;

            this.listenTo(cell, 'check', function (value) {
                grid.trigger('toggle', this.getValue(), value);
            });

            fragment.appendChild(cell.render().el);
        }

        _.each(columns, function (column, columnIndex) {
            cell = new DataGridBodyCell({
                model: column.control.controlModel,
                row: row,
                index: options.index,
                click: this.selectRow.bind(this)
            });
            fragment.appendChild(cell.render().el);
        }, this);
        this.$el.append(fragment);
    },

    selectRow: function () {
        var options = this.options;
        var grid = options.grid;
        var multiSelect = grid.model.get('multiSelect');

        grid.trigger('select', this.options.row);
        if (multiSelect !== true) {
            grid.trigger('toggle', this.getValue());
        }
    },

    /**
     * @private
     * @description Обрабочик щелчка по строке таблицы
     * @memberOf DataGridBodyRow.prototype
     */
    onClickHandler: _.debounce(function (event) {
        var grid = this.options.grid;
        var multiSelect = this.options.grid.model.get('multiSelect');

        grid.trigger('select', this.options.row);

        /**
         * Если не множественный выбор - значения выбираются щелчком по строке.
         * Иначе для выбора надо щелкать по checkbox
         */

        if (multiSelect !== true) {
            grid.trigger('toggle', this.getValue());
        }
    }),

    onDoubleClickHandler: function(event){
        this.doubleclicked = true;
        this.trigger('dblclick', this.getValue());
        this.trigger('select', this.options.row);
    },

    /**
     * @private
     * @description Отслеживание нажатия на правую кнопку
     * @param e
     */
    onMouseDownHandler: function (e) {
        if( e.button == 2 ) {
            e.preventDefault();
            e.stopPropagation();
            var grid = this.options.grid;
            this.selectRow();
            //@TODO Возможны гонки?
            grid.trigger('popupmenu:show', {pageX: e.pageX, pageY: e.pageY});
        }
    },

    /**
     * @description Обработчик стандартного события контекстного меню.
     * @param e
     */
    onContextMenuHandler: function (e) {
        e.preventDefault();//Запрещаем стандартное контекстное меню браузера
    },

    /**
     * @private
     * @description Обработчик изменения значения
     * @memberOf DataGridBodyRow.prototype
     * @param {*} value
     */
    OnChangeValueHandler: function () {
        this.applyActiveRow();
    },

    OnChangeSelectedItemHandler: function () {
        this.applySelectedRow();
    },

    /**
     * @protected
     * @description Стилизация строки текущего значения
     * @memberOf DataGridBodyRow.prototype
     */
    applyActiveRow: function () {
        var grid = this.options.grid;
        var value = grid.model.get('value');
        var comparator = grid.model.get('comparator');
        var currentColor = this.$el.css('background-color');

        if (_.isArray(value)) {
            var found = false;
            for (var i = 0, ln = value.length; i < ln; i = i + 1) {
                if (comparator.isEqual(this.getValue(), value[i])) {
                    found = true;
                    break;
                }
            }
            this.$el.toggleClass('select', found);
            this.checkbox.check(found);
        } else {
            this.$el.toggleClass('select', comparator.isEqual(this.getValue(), value));
        }

        var customColors  = grid.model.get('customColors');
        var color;
        if (typeof customColors !== 'undefined' && customColors !== null) {
            color = customColors.getColor(this.getValue());
            if (color !== false) {
                this.$el.css('background-color', color);
            }else{
                this.$el.css('background-color', '#fff');
            }
        }
        if(this.$el.hasClass('select')){
            this.$el.css('background-color', this.ColorLuminance(this.$el.css('background-color'), -0.2));
        }
        this.onHoverHandler();
    },

    applySelectedRow: function () {
        var options = this.options;
        var grid = options.grid;
        var selectedItem = grid.model.get('selectedItem');
        var comparator = grid.model.get('comparator');

        var isSelected = comparator.isEqual(options.row, selectedItem);

        this.$el.toggleClass('selected', isSelected);
    },

    /**
     * @private
     * @description Возвращает значение, которое соответсвует текущему набору данных
     * @memberOf DataGridBodyRow.prototype
     */
    getValue: function () {
        return InfinniUI.ObjectUtils.getPropertyValue(this.options.row, this.options.valueProperty);
    },

    onMouseOverHandler: function () {
        //this.$el.addClass('hover');
    },

    onMouseLeaveHandler: function () {
        //this.$el.removeClass('hover');
    },

    onHoverHandler:function(){
        var color = this.$el.css('background-color');

        var self = this;
        this.$el.hover(
            function(){
                self.$el.css('background-color', self.ColorLuminance(color, -0.05))
            },function(){
                self.$el.css('background-color', color);
            }
        )
    },

    ColorLuminance: function(rgb, lum) {
        var hex = rgb2hex(rgb);

        function rgb2hex(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }

            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        var returnRgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            returnRgb += ("00"+c).substr(c.length);
        }
        return returnRgb;
    }
});

_.extend(DataGridBaseRow.prototype, bindUIElementsMixin);