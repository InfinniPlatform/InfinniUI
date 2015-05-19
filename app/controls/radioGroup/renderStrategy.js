/** Используется toString() **/
var DefaultRenderStrategy = function () {

};

DefaultRenderStrategy.prototype.render = function (value) {
    return 'DefaultRenderStrategy' + value;
};


/** используется ItemTemplate **/
var ItemTemplateRenderStrategy = function (itemTemplate) {
    this.itemTemplate = itemTemplate;
};

ItemTemplateRenderStrategy.prototype.render = function (value, index) {
    var itemTemplate = this.itemTemplate(index);
    return itemTemplate.render();

};

/** Используется ItemFormat **/
var ItemFormatRenderStrategy = function (itemFormat) {
    this.itemFormat = itemFormat;
};

ItemFormatRenderStrategy.prototype.render = function (value, index) {
    return this.itemFormat.format(value);
};

/** Используется DisplayProperty **/
var DisplayPropertyRenderStrategy = function (displayProperty) {
    this.displayProperty = displayProperty;
};

DisplayPropertyRenderStrategy.prototype.render = function (value, index) {
    return InfinniUI.ObjectUtils.getPropertyValue(value, this.displayProperty);
};

