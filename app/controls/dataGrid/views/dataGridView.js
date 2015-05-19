/**
 * @description Представление контрола DataGrid
 * @class DataGridView
 * @extends ControlView
 * @property {DataGridModel} model
 */
var DataGridView = ControlView.extend({

    className: 'pl-data-grid',

    template: InfinniUI.Template['controls/dataGrid/template/datagrid.tpl.html'],

    templateFakeCell: InfinniUI.Template['controls/dataGrid/template/cells/fakeCell.tpl.html'],

    events: {
        'click .group-title': 'onClickOnGroup',
        mousedown: 'onMouseDownHandler',
        contextmenu: 'onContextMenuHandler'
    },

    UI: {
        thead: 'thead tr',
        header: 'thead',
        tbody: 'tbody',
        head: '.pl-datagrid-head',
        body: '.pl-datagrid-body',
        bodyContainer: '.pl-datagrid-body > div',
        firstRow: '.pl-dataGrid-first-row',
        headTable: '.pl-datagrid-head-table',
        bodyTable: '.pl-datagrid-body-table',
        mark: '.pl-datagrid-mark'
    },

    /**
     *
     * @param {Object} options
     */
    initialize: function (options) {
        ControlView.prototype.initialize.apply(this);

        this.options = options;
        this.listenTo(this.model, 'change:items', this.onChangeItemsHandler);
        this.listenTo(this.model, 'change:value', this.onChangeValueHandler);
        this.listenTo(this.model, 'change:selectedItem', this.onChangeSelectedItemHandler);
        this.listenTo(this.model, 'change:groups', this.onChangeGroupsHandler);
        this.on('toggle', this.onToggleHandler);
        this.on('select', this.onSelectHandler);
        this.on('popupmenu:show', this.onShowPopupMenuHandler);
        //this.listenTo('dblclick');

        this.initGroups(this.model.get('groups'));

        this.rows = [];
        this.colspan = null; // будет известно при установке первых данных

        this.initVerticalResize();
    },

    /**
     * @description При изменении высоты контейнера - изменить высоту контейнера для прокрутки таблицы
     */
    initVerticalResize: function () {
        var handler = _.throttle(
            function () {
                var hh = this.ui.head.height();
                this.ui.body.height(this.$el.height() - hh);
            }.bind(this), 400, {leading: false});
        var observer = new MutationObserver(handler);
        observer.observe(this.el, {attributes: true, characterData:true});
    },

    onShowPopupMenuHandler: function (data) {
        var popupMenu = this.model.get('popupMenu');
        if (popupMenu) {
            popupMenu.show(data.pageX, data.pageY);
        }
    },

    render: function () {
        this.prerenderingActions();

        this.$el.html(this.template());
        this.bindUIElements();
        this.syncHorizontalScroll();
        this.renderHeader();

        this.renderBody();


        this.postrenderingActions();
        return this;
    },

    postrenderingActions: function(){
        ControlView.prototype.postrenderingActions.call(this);

        var that = this;
        this.$el.find('.pl-datagrid-body')
            .scroll(function(){
                that.onScroll();
            });
    },

    /**
     * @description Синхронизирует горизонтальный скролл заголовка таблицы с его содержимым
     */
    syncHorizontalScroll: function () {
        var body = this.ui.body;
        var head = this.ui.head;

        body.on('scroll', function () {
            head.scrollLeft(body.scrollLeft());
        });
    },

    /**
     * @private
     * @description Рендеринг заголовка таблицы
     * @memberOf DataGridView.prototype
     */
    renderHeader: function () {
        var fragment = document.createDocumentFragment();
        var cell;
        var model;
        var itemTemplate = this.model.get('itemTemplate');
        var itemFormat = this.model.get('itemFormat');

        var useDetail = typeof itemTemplate === 'function' || typeof itemFormat !== 'undefined' && itemFormat !== null;

        this.ui.thead.empty();


        if (this.model.get('multiSelect')) {
            var cb = new DataGridHeaderCheckBoxCell();
            this.ui.thead.append(cb.render().el);
            this.listenTo(cb, 'check', this.onCheckAll);
        }

        this.ui.firstRow.empty();
        if (this.model.get('multiSelect')) {
            var html = this.templateFakeCell({text: '', colspan: 1});
            $(html).addClass('pl-datagrid-checkbox').appendTo(this.ui.firstRow);
        }

        _.each(this.model.get('columns'), function (column, index) {
            var colspan;
            model = column.control.controlModel;
            this.listenTo(model, 'change:sorting', this.onChangeSortingHandler);

            cell = new DataGridHeaderCell({model: model, columnIndex: index});

            this.listenTo(cell, 'resize', this.onResizeColumn);
            this.listenTo(cell, 'resize:start', this.onStartResizeColumn);
            this.listenTo(cell, 'resize:stop', this.onStopResizeColumn);

            colspan = (useDetail && index === 0) ? 2 : 1;
            cell.$el.attr('colspan', colspan);

            fragment.appendChild(cell.render().el);
            this.ui.firstRow.append(this.templateFakeCell({text: model.get('text'), colspan: colspan}));
        }, this);

        this.ui.thead.append(fragment);

        //this.renderTableHeader();
    },

    onCheckAll: function (value) {
        if (value) { //Выделить все элементы
            var values = this.rows.map(function (row) {
                return row.getValue();
            });
            this.model.set('value', values);
        } else { //Снять выделение со всех элементов
            this.model.set('value', []);
        }
    },

    onStartResizeColumn: function (pageX, pageY, columnIndex) {
        this.ui.mark.removeClass('hidden');
        this.updateMarkPosition(pageX, pageY);
    },

    onResizeColumn: function (pageX, pageY, columnIndex) {
        this.updateMarkPosition(pageX, pageY);
    },

    onStopResizeColumn: function (pageX, pageY, width, columnIndex) {
        this.updateMarkPosition(pageX, pageY, columnIndex);

        var index = this.model.get('multiSelect') ? columnIndex + 2 : columnIndex + 1;
        var $el = this.ui.firstRow.find('th:nth-child(' + index+ ')');
        $el.width(width);

        this.ui.mark.addClass('hidden');
    },

    updateMarkPosition: function (pageX, pageY) {
        var position = this.ui.mark.position();
        var offset = this.ui.mark.offset();
        this.ui.mark.css('left', pageX - (offset.left - position.left));
    },

    renderTableHeader: function () {
        var $headers = _.map(this.ui.thead.children(), function (el) {return $(el);});
        var $firstRow = _.map(this.ui.firstRow.children(), function (el) {return $(el);});

        //Копирование стилей из заголовка таблицы в фейковый
        // @TODO Разобраться. Тпймаут добавлен т.к. при отображении в диалоге, стилей у элемента th почему то еще нет
        setTimeout(function () {
            _.each($firstRow, function ($el, i) {
                'font,padding-left,padding-right'.split(',')
                    .forEach(function (name) {
                        var $div = $el.find('div');
                        if ($div.length) {
                            $div.css(name, $headers[i].css(name));
                        }
                    });
            });

            this.syncColumnWidth($headers, $firstRow);
        }.bind(this), 42);

    },

    /**
     *
     * @param {String|Array}attributes
     * @param $el
     * @returns {Number}
     */
    getSumCssProperties: function (attributes, $el) {
        if (_.isString(attributes)) {
            attributes = attributes.split(',');
        }
        var result = _.reduce(attributes, function (result, name) {
            return result + parseInt($el.css(name));
        }, 0);

        return result;
    },

    /**
     * @private
     * @description Синхронизация ширины колонок заголовка и содержимого
     */
    syncColumnWidth: function ($headers, $firstRow) {
        //Создать обсеревер для отслеживания изменений ширины firstRow и изменять соотв. заголовки колонок
        var syncColumnWidth = _.throttle(function () {

            var headers = this.ui.thead.children();
            _.each($firstRow, function ($el, i) {
                var $th = $headers[i];
                var delta = this.getSumCssProperties('padding-left,padding-right', $th);
                var width = $el.width();
                if (parseInt(width, 10) < 0) {
                    //Некорректная ширина, пересчитываем
                    syncColumnWidth();
                }
                $th.width(Math.max($el.width() - delta, 0));
            }, this);

            var headTable = this.ui.headTable;
            var delta = this.getSumCssProperties('padding-left,padding-right', headTable);
            headTable.width(Math.max(this.ui.bodyTable.width() - delta, 0));
            headTable.css('margin-right', this.ui.body.width() - this.ui.bodyContainer.width());

        }.bind(this), 100);

        if (typeof this.syncColumnWidthObserver !== 'undefined') {
            this.syncColumnWidthObserver.disconnect();
        }
        var observer = new MutationObserver(syncColumnWidth);
        this.syncColumnWidthObserver = observer;
        var target = this.ui.body.get(0);
        observer.observe(target, {attributes: true, childList: true, characterData: true, subtree: true});
    },

    /**
     * @private
     * @description Рендеринг содержимого таблицы
     * @memberOf DataGridView.prototype
     */
    renderBody: function () {
        _.each(this.rows, function (row) {
            row.remove();
        });
        this.rows.length = 0;

        // test
        //if( this.model.get('items').length && this.model.get('items')[0].Name ){
            //this.model.set('groups', new DataGridGroup({groupBy: ['Name']}));
        //}
        // end of test

        var fragment = document.createDocumentFragment(),
            items = this.model.get('items'),
            groupedItems = this.groups.group(items),
            that = this;

        if(this.model.get('items').length){
            this.colspan = _.size(this.model.get('items')[0]);
            if (typeof itemTemplate === 'function' || typeof itemFormat !== 'undefined'){
                this.colspan++;
            }
        }

        //_.each(this.model.get('items'), this.renderBodyRow.bind(this, fragment));
        this.renderGroup(groupedItems, fragment);
        this.ui.tbody.append(fragment);

        this.closeAllGroup();



        this.renderTableHeader();
        var that = this;

        that.$el.find('.pl-datagrid-body').css('height', 'auto');
        layoutManager.init();

        //this.adaptHeaders();
        //setTimeout(function(){
        //    that.adaptHeaders();
        //}, 200);
    },

    renderGroup: function(group, fragment){
        this.renderSubgroup(group, 0, fragment);
    },

    renderSubgroup: function(subgroup, deep, fragment){
        if(subgroup.groups){
            for(var k in subgroup.groups){
                this.renderGroupTitle(k, deep, fragment);
                this.renderSubgroup(subgroup.groups[k], deep + 1, fragment); //InfinniUI.ObjectUtils.getPropertyValue(fullValue, displayProperty);
            }
        }else{
            _.each(subgroup.items, this.renderBodyRow.bind(this, fragment));
        }
    },

    /**
     * @private
     * @description Рендеринг строк данных таблицы
     * @param fragment
     * @param {*} row Данные
     * @param {Number} index Номер строки п/п
     */
    renderBodyRow: function (fragment, row, index) {
        var model = this.model;
        var itemTemplate = model.get('itemTemplate');
        var itemFormat = model.get('itemFormat');
        var constructors;
        var rowView;
        var params = {
            row: row,
            index: index,
            columns: model.get('columns'),
            valueProperty: model.get('valueProperty'),
            grid: this,
            itemTemplate: itemTemplate,
            itemFormat: itemFormat
        };

        if (typeof itemTemplate === 'function' || typeof itemFormat !== 'undefined') {
            constructors = [DataGridMasterRow, DataGridDetailRow];
        } else {
            constructors = [DataGridBaseRow];
        }

        _.each(constructors, function (fn) {
            rowView = new fn(params);

            /**
             * Подписываемся на событие dblclick из DataGridBaseRow
             */
            this.listenTo(rowView, 'dblclick', this.onDoubleClick);

            this.rows.push(rowView);
            fragment.appendChild(rowView.render().el);
        }, this);
    },

    /**
     * Прокидываем событие dblclick в Control
     * @param args
     */
    onDoubleClick: function(args) {
        this.trigger('dblclick', args);
    },


    renderGroupTitle: function(title, deep, fragment){
        var el = $(_.template('<tr class="group-title"><td colspan="' + this.colspan + '"><span class="fa fa-caret-right"></span>'+title+'</td></tr>')()).get(0);
        fragment.appendChild(el);
    },

    /**
     * @private
     * @description Обработчик изменения списка значений
     * @memberOf DataGridView.prototype
     */
    onChangeItemsHandler: function (model, items) {
        if (this.wasRendered) {
            this.renderBody();
        }
    },

    /**
     * @private
     * @description Обработчик изменения значения
     * @memberOf DataGridView.prototype
     */
    onChangeValueHandler: function (model, value) {
        // Публикуем событие об изменении значения для строчек таблицы
        this.trigger('change:value', value);
    },

    onChangeSelectedItemHandler: function (model, value) {
        // Публикуем событие об изменении значения для строчек таблицы
        this.trigger('change:selectedItem', value);
    },

    onChangeGroupsHandler: function(model, value){
        this.initGroups(value);
//new DataGridGroup()
        if (this.wasRendered) {
            this.render();
        }
    },

    /**
     * @private
     * @description Обработчик переключения значения
     * @memberOf DataGridView.prototype
     * @param {*} value Переключаемое значение
     * @param {undefined|boolean} toggle
     */
    onToggleHandler: function (value, toggle) {
        var model = this.model;
        var current = model.get('value');
        var comparator = model.get('comparator');
        if (model.get('readOnly') || !model.get('enabled')) {
            return;
        }

        var multiSelect = model.get('multiSelect');

        if (multiSelect === true) {
            var newValue = [];
            var matched = false;
            if (typeof toggle === 'undefined' || toggle=== true) { //Установить значения
                if (_.isArray(current) === false) {
                    newValue.push(value);
                    model.set('value', newValue);
                } else {
                    current.forEach(function (v) {
                        if (comparator.isEqual(v, value)) {
                            matched = true;
                        }
                    });
                    if (!matched) {
                        newValue = current.slice();
                        newValue.push(value);
                        model.set('value', newValue);
                    }
                }
            } else { //Исключить значение
                if (_.isArray(current)) {
                    _.each(current, function (val) {
                        if (!comparator.isEqual(val, value)) {
                            newValue.push(val);
                        } else {
                            matched = true;
                        }
                    });
                    if (matched) {
                        model.set('value', newValue);
                    }
                }
            }
        } else {
            model.set('value', value);
        }

    },

    /**
     * @description Обработчик установки выделенного элемента (SelectedItem)
     * @param value
     */
    onSelectHandler: function (value) {
        var model = this.model;
        if (model.get('readOnly') || !model.get('enabled')) {
            return;
        }

        model.set('selectedItem', value);
    },

    /**
     * @description Обработчик изменения режима сортировки колонки
     * @memberOf DataGridView.prototype
     * @param {DataGridColumnModel} model
     * @param {*} sorting
     */
    onChangeSortingHandler: function (model, sorting) {
        if (sorting === DataGridColumnModel.SORTING_NONE) {
            return;
        }

        // Сброс состояния сортировки по другим колонкам
        var columns = this.model.get('columns');
        _.each(columns, function (column) {
            if (column.control.controlModel === model) {
                return;
            }
            if (column.control.controlModel.get('sortable')) {
                column.control.controlModel.set('sorting', DataGridColumnModel.SORTING_NONE);
            }
        });

        this.sortRowByColumn(model, sorting);
    },

    /**
     * @private
     * @description Переупорядочивает данные по заданной колонке
     * @memberOf DataGridView.prototype
     * @param {DataGridColumnModel} model
     * @param {*} sorting
     */
    sortRowByColumn: function (model, sorting) {
        var items = this.model.get('items');
        if (typeof items === 'undefined' || items === null || items.length === 0) {
            return;
        }

        var value1;
        var value2;
        var name = model.get('displayProperty');

        var data;
        var result;

        items.sort(function (a, b) {
            value1 = InfinniUI.ObjectUtils.getPropertyValue(a, name);
            value2 = InfinniUI.ObjectUtils.getPropertyValue(b, name);

            if (value1 === value2) {
                return 0;
            }
            data = [value1, value2];

            result = (data.sort().indexOf(value1) === 0) ? -1 : 1;
            return (sorting === DataGridColumnModel.SORTING_ASC) ? result : -result;
        });

        if (this.wasRendered) {
            this.renderBody();
        }
    },

    onClickOnGroup: function(e){
        var $el = $(e.currentTarget);

        this.toggleGroup($el);
    },

    onScroll: function(){
        this.checkEndOfScroll();
    },

    checkEndOfScroll: function(){
        if(this.model.get('autoLoad')){
            var $current = this.$el.find('.pl-datagrid-body'),
                scrollBottom = $current[0].scrollHeight - $current.height() - $current.scrollTop();
            if(scrollBottom < 10){
                this.trigger('scrollToTheEnd', this.model.get('items').length);
            }
        }
    },

    toggleGroup: function($el, visibleStatus){
        var $current = $el.next(),
            isVisible = $current.is(':visible');

        if(visibleStatus == 'hide'){
            isVisible = true;
        }
        if(visibleStatus == 'show'){
            isVisible = false;
        }
        while($current.length && !$current.hasClass('group-title')){
            if(isVisible){
                $current.hide();
            }else{
                $current.show();
            }

            $current = $current.next();
        }

        $el.toggleClass('expanded', !isVisible );
    },

    closeAllGroup: function(){
        var that = this;
        this.$el.find('.group-title').each(function(i, el){
            that.toggleGroup($(el), 'hide');
        });
    },


    initGroups: function(groups){
        if(!groups){
            this.groups = new DataGridGroup();
        }else{
            this.groups = new DataGridGroup({groupBy: this.adaptGroups(groups)});
        }
    },

    adaptGroups: function(groups){
        var result = [];

        if(!groups){
            return result;
        }

        for(var i= 0, ii = groups.length; i < ii; i++){
            result.push(groups[i].ValueProperty);
        }
        return result;
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
     * @description Отслеживание нажатия на правую кнопку. Обрабатывает нажатие правой кнопки, если данное событие не
     * было перехвачено обработчиком строки таблицы (щелчок по пустой части таблицы)
     * @param e
     */
    onMouseDownHandler: function (e) {
        if( e.button == 2 ) {
            e.preventDefault();
            this.trigger('popupmenu:show', {pageX: e.pageX, pageY: e.pageY});
        }
    },

    /**
     * @private
     * @description Адаптация фиксированных заголовков
     */
    adaptHeaders: function(){
        var $th = this.ui.thead.find('th'),
            $thIn = $th.find('.pl-data-grid-th-in'),
            w;

        for(var i = 0, ii = $th.length; i < ii; i++){
            w = $th.eq(i).innerWidth() - parseInt($thIn.eq(i).css('padding-right')) - parseInt($thIn.eq(i).css('padding-left')) + 1;
            $thIn.eq(i).width(w);
        }
    }

});
