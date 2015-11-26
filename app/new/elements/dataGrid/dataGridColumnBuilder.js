/**
 *
 * @constructor
 */
function DataGridColumnBuilder () {


}

/**
 *
 * @param {DataGrid} element
 * @param {Object} metadata метаданные колонки грида
 * @param {Object} params
 * @returns {DataGridColumn}
 */
DataGridColumnBuilder.prototype.build = function (element, metadata, params) {
    var column = new DataGridColumn();

    this
        .buildHeader(column, metadata, params)
        .buildHeaderTemplate(column, metadata, params)
        .buildCellTemplate(column, metadata, params)
        .buildCellSelector(column, metadata, params);

    return column;
};

/**
 * @protected
 * @param {DataGridColumn} column
 * @param {Object} metadata
 * @param {Object} params
 * @returns {DataGridColumnBuilder}
 */
DataGridColumnBuilder.prototype.buildHeader = function (column, metadata, params) {

    if (metadata.Header && typeof metadata.Header === 'object') {
        //Header указывает на DataBinding
        var
            builder = params.builder,
            binding = builder.buildType('PropertyBinding', metadata.Header, {
                parent: params.element,
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            });

        binding.bindElement(column, 'header');
    } else {
        //Header содержит значение для шаблона
        column.setHeader(metadata.Header);
    }
    return this;
};

/**
 * @protected
 * @param {DataGridColumn} column
 * @param {Object} metadata
 * @param {Object} params
 * @returns {DataGridColumnBuilder}
 */
DataGridColumnBuilder.prototype.buildCellTemplate = function (column, metadata, params) {
    var cellTemplate;

    if ('CellTemplate' in metadata) {
        cellTemplate = this.buildValueTemplate(metadata.CellTemplate, params);
    } else if ('CellFormat' in metadata) {
        cellTemplate = this.buildValueTemplateByFormat(binding, metadata.CellFormat, params);
    } else {
        cellTemplate = this.buildValueTemplateByDefault(binding, params);
    }
    column.setCellTemplate(cellTemplate);
    return this;
};


/**
 * @protected
 * @param {DataGridColumn} column
 * @param {Object} metadata
 * @param {Object} params
 * @returns {DataGridColumnBuilder}
 */
DataGridColumnBuilder.prototype.buildCellSelector = function (column, metadata, params) {

    var cellSelector;

    if (metadata.CellSelector) {
        cellSelector = function (context, args) {
            var scriptExecutor = new ScriptExecutor(params.parent);
            return scriptExecutor.executeScript(metadata.CellSelector.Name, args)
        };
    } else if (metadata.CellProperty) {
        var propertyName = metadata.CellProperty;
        cellSelector = function (value) {
            return InfinniUI.ObjectUtils.getPropertyValue(value, propertyName);
        }
    } else {
        cellSelector = function (value) {
            return value;
        }
    }

    column.setCellSelector(cellSelector);
    return this;
};

/**
 * @protected
 * @param {DataGridColumn} column
 * @param {Object} metadata
 * @param {Object} params
 * @returns {DataGridColumnBuilder}
 */
DataGridColumnBuilder.prototype.buildHeaderTemplate = function (column, metadata, params) {
    var
        headerTemplate,
        headerTemplateMetadata = metadata.HeaderTemplate;

    if (typeof headerTemplateMetadata === 'undefined' || _.isEmpty(headerTemplateMetadata)) {
        headerTemplate = this.buildHeaderTemplateByDefault(params);
    } else {
        headerTemplate = this.buildHeaderTemplateByMetadata(headerTemplateMetadata, params);
    }

    column.setHeaderTemplate(headerTemplate);

    return this;
};

/**
 * @protected
 * @param {Object} headerTemplateMetadata
 * @param {Object} params
 * @returns {Function}
 */
DataGridColumnBuilder.prototype.buildHeaderTemplateByMetadata = function (headerTemplateMetadata, params) {
    var element = params.element;
    var builder = params.builder;

    return function(context, args) {
        var argumentForBuilder = {
            parent: element,
            parentView: params.parentView
        };

        return builder.build(headerTemplateMetadata, argumentForBuilder);
    };
};

/**
 * @protected
 * @param {Object} params
 * @returns {Function}
 */
DataGridColumnBuilder.prototype.buildHeaderTemplateByDefault = function (params) {

    return function (context, args) {
        var label = new Label(this);
        label.setText(args.value);
        return label;
    };

};
