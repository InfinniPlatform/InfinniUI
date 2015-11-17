/**
 * @param parent
 * @constructor
 * @augments Container
 */
function TabPanel(parent) {
    _.superClass(TabPanel, this, parent);
}

_.inherit(TabPanel, Container);


/**
 * @description Возвращает расположение закладок
 * @returns {*}
 */
TabPanel.prototype.getHeaderLocation = function () {
    return this.control.get('headerLocation');
};

/**
 * @description Устанавливает расположение закладок
 * @param value
 */
TabPanel.prototype.setHeaderLocation = function (value) {
    if (InfinniUI.Metadata.isValidValue(value, TabHeaderLocation)) {
        this.control.set('headerLocation', value);
    }
};

/**
 * @description Возвращает ориентацию закладок.
 * @returns {*}
 */
TabPanel.prototype.getHeaderOrientation = function () {
    return this.control.get('headerLocation');
};

/**
 * @description Устанавливает ориентацию закладок
 * @param value
 */
TabPanel.prototype.setHeaderOrientation = function (value) {
    if (InfinniUI.Metadata.isValidValue(value, TabHeaderOrientation)) {
        this.control.set('headerOrientation', value);
    }
};

/**
 * @description Устанавливает функцию шаблонизации закладок дочерних элементов панели
 * @param {Function} value
 */
TabPanel.prototype.setHeaderTemplate = function (value) {
    this.control.set('headerTemplate', value);
};

/**
 * @description Возвращает функцию шаблонизации закладок дочерних элементов панели
 * @returns {Function}
 */
TabPanel.prototype.getHeaderTemplate = function () {
    return this.control.get('headerTemplate');
};

/**
 * @description Устанавливает выделенный дочерний элемент панели
 * @param {TabPage} value
 * @returns {boolean} успешность выделения дочернего элемента панели. false - элемент не был выделен, true - элемент успешно выделен
 */
TabPanel.prototype.setSelectedItem = function (value) {
    return this.control.set('selectedItem', value);
};

/**
 * @description Возвращает выделенный дочерний элемент панели
 * @returns {TabPage}
 */
TabPanel.prototype.getSelectedItem = function () {
    return this.control.get('selectedItem');
};

/**
 * @description Устанавливает обработчик события о том, что выделенный элемент изменился
 * @param {Function} handler
 */
TabPanel.prototype.onSelectedItemChanged = function (handler) {
    this.control.on('change:selectedItem', handler);
};

/**
 * @description Недокументированный метод. Закрывает заданную вкладку
 * @param {TabPage} element
 */
TabPanel.prototype.closeTab = function (element) {
    var
        index = this.childElements.indexOf(element);

    if (index === -1 ) {
        throw new Error('TabPage not found in TabPanel.childElements');
    } else {
        this.getItems().removeAt(index);
    }
};

/**
 * @protected
 * @returns {PanelControl}
 */
TabPanel.prototype.createControl = function () {
    return new TabPanelControl();
};