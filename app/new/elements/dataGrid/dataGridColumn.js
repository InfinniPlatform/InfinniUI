function DataGridColumn() {
    this._values = Object.create(null);
}

DataGridColumn.prototype.setHeader = function (value) {
    this.setProperty('header', value);
};

DataGridColumn.prototype.getHeader = function (value) {
    return this.getProperty('header');
};

DataGridColumn.prototype.setCellTemplate = function (value) {
    this.setProperty('cellTemplate', value);
};

DataGridColumn.prototype.getCellTemplate = function (value) {
    return this.getProperty('cellTemplate');
};

DataGridColumn.prototype.setCellSelector = function () {
    this.setProperty('cellSelector', value);
};

DataGridColumn.prototype.getCellSelector = function () {
    return this.getProperty('cellSelector');
};

DataGridColumn.prototype.setHeaderTemplate = function () {
    this.setProperty('cellHeaderTemplate', value);
};

DataGridColumn.prototype.getHeaderTemplate = function () {
    return this.getProperty('cellHeaderTemplate');
};


/**
 * @description Для взаимодействие с DataBinding
 * @param propertyName
 * @param callback
 */
DataGridColumn.prototype.onPropertyChanged = function (propertyName, callback) {
    this.on('change:' + propertyName, callback);
};

/**
 * @description Для взаимодействие с DataBinding
 * @param propertyName
 * @param propertyValue
 */
DataGridColumn.prototype.setProperty = function (propertyName, propertyValue) {
    var oldValue = this._values[propertyName];

    this._values[propertyName] = propertyValue;
    if (oldValue !== propertyValue) {
        this.trigger('change:' + propertyName, null, {
            property: propertyName,
            oldValue: oldValue,
            newValue: propertyValue
        });
    }
};

DataGridColumn.prototype.getProperty = function (propertyName) {
    return this._values[propertyName];
};

_.extend(DataGridColumn.prototype, Backbone.Events);