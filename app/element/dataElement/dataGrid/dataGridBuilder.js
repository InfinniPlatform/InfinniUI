var metaCustomColors = [
    {
        Rule: "",
        PropertyName: "",
        Color: ""
    }
];

var CustomColors = function () {
    this.items = [];
};

CustomColors.prototype.setItems = function (items) {

    if (_.isArray(items) === false || _.isEqual(this.items, items)) {
        return;
    }

    this.items = items;
};

CustomColors.prototype.getColor = function (data) {
    var item;
    var color = false;

    for (var i = 0, ln = this.items.length; i < ln; i = i + 1) {
        item = this.items[i];
        if (item.check(data)) {
            color = item.getColor();
            break;
        }
    }
    return color;
};

var CustomColorsItem = function (propertyName, color, rule) {
    this.propertyName = propertyName;
    this.color = color;
    this.rule = rule;
};

CustomColorsItem.prototype.check = function (data) {
    var value;
    if (typeof this.propertyName !== 'undefined' && this.propertyName !== null && this.propertyName !== '') {
        value = InfinniUI.ObjectUtils.getPropertyValue(data, this.propertyName);
    } else {
        value = data;
    }

    return this.rule(value);
};

CustomColorsItem.prototype.getColor = function () {
    return this.color;
};


var CustomColorsBuilder = function () {

    this.build = function (metadata) {
        var customColors = new CustomColors();
        var items = [];
        var item;
        if (_.isArray(metadata)) {
            for (var i = 0, ln = metadata.length; i < ln; i = i + 1) {
                item = new CustomColorsItem(metadata[i].PropertyName, metadata[i].Color, this.buildRule(metadata[i].Rule));
                items.push(item);
            }
            customColors.setItems(items);
        }

        return customColors;
    };

    this.buildRule = function (rule) {
        var text = 'try {' + rule + '} catch (e) {return false;}';
        return new Function('data', text);
    }
};

/**
 * @description Построитель DataGrid
 * @class DataGridBuilder
 */
var DataGridBuilder = function () {

    /**
     * @description Создание и инициализация экземпляра DataGrid
     * @memberOf DataGridBuilder
     * @param {ApplicationBuilder} builder
     * @param {View} parent
     * @param {Object} metadata
     * @returns {DataGrid}
     */
    this.build = function (builder, parent, metadata, collectionProperty) {

        //var itemTemplateConstructor = this.getItemTemplateConstructor(builder, parent, metadata, collectionProperty);
        this.builder = builder;
        this.parent = parent;
        var dataGrid = new DataGrid(parent);

        this.initScriptsHandlers(parent, metadata, dataGrid, builder);

        /** Begin CustomColors Init **/
        /** @TODO Отрефакторить после описания метаданных */
//        metadata.CustomColors = [
//            {Rule: 'return _.isNull(data);', PropertyName: '', Color: '#ee6e73'},
//            {Rule: 'return data == "89999";', PropertyName: 'CardNumber', Color: '#56c9fd'},
//            {Rule: 'return data === "Баранович";', PropertyName: 'Personal.MiddleName', Color: '#8acc8d'},
//            {Rule: 'return data < 0;', PropertyName: '', Color: '#fff06b'}
//        ];

        if(metadata.AutoLoad === undefined){
            metadata.AutoLoad = true;
        }

        var customColorsBuilder = new CustomColorsBuilder();
        var customColors = customColorsBuilder.build(metadata.CustomColors);
        dataGrid.setCustomColors(customColors);
        /** End CustomColors Init **/
        dataGrid.setStyle(metadata.Style);
        dataGrid.setName(metadata.Name);
        dataGrid.setText(metadata.Text);
        dataGrid.setEnabled(metadata.Enabled);
        dataGrid.setVisible(metadata.Visible);
        dataGrid.setMultiSelect(metadata.MultiSelect);
        //dataGrid.setReadOnly(metadata.ReadOnly);
        dataGrid.setValueProperty(metadata.ValueProperty);
        dataGrid.setHorizontalAlignment(metadata.HorizontalAlignment);
        dataGrid.setVerticalAlignment(metadata.VerticalAlignment);
        dataGrid.setAutoLoad(metadata.AutoLoad);
        dataGrid.setItemTemplate(this.getItemTemplateConstructor(builder, parent, metadata, collectionProperty, dataGrid));
        this.initGroups(dataGrid, metadata.Groups);
        this.initAutoload(parent, metadata, dataGrid);

        dataGrid.setColumns(this.buildColumns(metadata.Columns, collectionProperty));
        dataGrid.setComparator(this.builder.buildType(this.parent, 'Comparator', {}, collectionProperty));

        if (typeof metadata.Items !== 'undefined') {
            var dataBinding = builder.build(parent, metadata.Items, collectionProperty);
            dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                dataGrid.setItems(value.value);
            });

            if (typeof metadata.Items.PropertyBinding !== 'undefined') {
                var exchange = parent.getExchange();
                exchange.subscribe(messageTypes.onSelectedItemChanged, function (message) {
                    if (message && message.DataSource === metadata.Items.PropertyBinding.DataSource) {
                        dataGrid.setSelectedItem(message.Value);
                    }
                })
            }

            dataGrid.onSelectedItemChanged(function () {
                var propertyName = dataBinding.getProperty();
                if (_.isEmpty(propertyName) !== false) {
                    /** событие только если биндинг указывает на весь источник данных !!! */
                    parent.getExchange().send(messageTypes.onSetSelectedItem, {
                        dataSource: dataBinding.getDataSource(),
                        property: propertyName,
                        value: dataGrid.getSelectedItem()
                    });
                }
            });




        }

        if (metadata.ItemFormat) {
            var format = builder.build(parent, metadata.ItemFormat);
            dataGrid.setFormat(format);
        }

        if (typeof metadata.Value !== 'undefined') {
            var valueBinding = builder.build(parent, metadata.Value, collectionProperty);

            // Привязка элемента к источнику данных
            valueBinding.onPropertyValueChanged(function (context, args) {
                dataGrid.setValue(args.value);
            });

            // Привязка источника данных к элементу
            dataGrid.onValueChanged(function (context, args) {
                valueBinding.setPropertyValue(dataGrid.getValue());
            });

            //@TODO Удалить, после наследования от ElementBuilder
            if (parent && metadata.OnValueChanged) {
                dataGrid.onValueChanged (function () {
                    var message = builder.buildType(parent, 'DataSourceMessage', null, null, {
                        source: dataGrid,
                        value: dataGrid.getValue(),
                        dataSource: valueBinding.getDataSource && valueBinding.getDataSource()
                    });
                    new ScriptExecutor(parent).executeScript(metadata.OnValueChanged.Name, message);
                });
            }
        }

        if (metadata.OnKeyDown) {
            dataGrid.onKeyDown(function (data) {
                //var message = this.getBaseMessage(params);
                var message = builder.buildType(parent, 'BaseMessage', null, null, {
                    source: dataGrid,
                    value: data
                });
                new ScriptExecutor(parent).executeScript(metadata.OnKeyDown.Name, message);
            }.bind(this));
        }

        if (typeof metadata.ToolBar !== 'undefined') {
            var popupMenu = new DataGridPopupMenuView();
            var items = [];
            var actions = [];
            var scripts = [];
            var executeScript = function (name) {
                new ScriptExecutor(parent).executeScript(name);
            };

            _.each(metadata.ToolBar.Items, function (data) {
                var button = builder.build(parent, data, collectionProperty);
                items.push(button);
            });

            popupMenu.setItems(items);
            dataGrid.setPopUpMenu(popupMenu);
        }

        if (parent && parent.registerElement) {
            parent.registerElement(dataGrid);
        }


        return dataGrid;
    };

    this.initAutoload = function(parent, metadata, dataGrid){

        if(metadata.AutoLoad){
            var autoLoadLastPageSize = 30,
                autoLoadPageStep = 30,
                that = this;

            this.setPageSize(parent, metadata, dataGrid, autoLoadPageStep);

            dataGrid.onScrollToTheEnd(function(itemCount){
                if(itemCount == autoLoadLastPageSize){
                    autoLoadLastPageSize += autoLoadPageStep;
                    that.setPageSize(parent, metadata, dataGrid, autoLoadLastPageSize);
                }
            });
        }
    };


    this.setPageSize = function(parent, metadata, dataGrid, size){
        var args = {
            source: dataGrid,
            dataSource: metadata.Items.PropertyBinding.DataSource,
            value: size
        };

        var exchange = parent.getExchange();
        exchange.send(messageTypes.onSetPageSize, args);
    };

    /**
     * @private
     * @description Инициализация обработчиков событий
     * @memberOf DataGridBuilder
     * @param parent
     * @param metadata
     * @param {DataGrid} dataGrid
     */
    this.initScriptsHandlers = function (parent, metadata, dataGrid, builder) {
        // Скриптовые обработчики на события

        //@TODO Удалить, после наследования от ElementBuilder
        if (parent && metadata.OnLoaded){
            dataGrid.onLoaded(function () {
                var message = builder.buildType(parent, 'BaseMessage', null, null, {
                    source: dataGrid
                });
                new ScriptExecutor(parent).executeScript(metadata.OnLoaded.Name, message);
            });
        }

        if(parent && metadata.OnDoubleClick) {
            dataGrid.onDoubleClick(function (args) {
                var message = builder.buildType(parent, 'BaseMessage', null, null, {
                    source: dataGrid
                });
                new ScriptExecutor(parent).executeScript(metadata.OnDoubleClick.Name, message);
            });
        }
    };

    /**
     * @private
     * @description Инициализация списка колонок
     * @memberOf DataGridBuilder.prototype
     * @param metadata
     * @returns {DataGridColumn[]}
     */
    this.buildColumns = function (metadata, collectionProperty) {
        var columns = [], column;

        if (typeof metadata !== 'undefined' && metadata.constructor === Array) {
            for (var i = 0, ln = metadata.length; i < ln; i = i + 1) {
                column = this.builder.buildType(this.parent, 'DataGridColumn', metadata[i], collectionProperty);
                if (typeof column !== 'undefined') {
                    columns.push(column);
                }
            }
        }

        return columns;
    };

    /**
     * @private
     * @param builder
     * @param parent
     * @param metadata
     * @param collectionProperty
     * @memberOf DataGridBuilder
     * @returns {*}
     */
    this.getItemTemplateConstructor = function (builder, parent, metadata, collectionProperty, dataGrid) {

        var itemTemplateConstructor = null;

        if (typeof metadata.ItemTemplate !== 'undefined' && metadata.ItemTemplate !== null && metadata.ItemTemplate !== '') {
            itemTemplateConstructor = function(baseIndex) {
                return builder.build(parent, metadata.ItemTemplate,
                    new ListBoxItemCollectionProperty(metadata.Items.PropertyBinding.Property, baseIndex, collectionProperty),
                    {parentElement: dataGrid}
                );
            };
        }

        return itemTemplateConstructor;
    };

    this.initGroups = function(dataGrid, groups){
        dataGrid.setGroups( groups );
    };

};

