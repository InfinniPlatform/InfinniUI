/**
 * @param parent
 * @constructor
 * @augments Container
 */
function Panel(parent) {
    _.superClass(Panel, this, parent);
}

_.inherit(Panel, Container);

/**
 * @description Возвращает значение, определяющее, свернута ли панель
 * @returns {boolean}
 */
Panel.prototype.getCollapsible = function () {
    return this.control.get('collapsible');
};

/**
 * @description Устанавливает значение, определяющее, разрешено ли сворачивание панели
 * @param {boolean} value
 */
Panel.prototype.setCollapsible = function (value) {
    if (typeof value !== 'undefined') {
        this.control.set('collapsible', !!value);
    }
};

/**
 * @description Возвращает значение, определяющее, свернута ли панель
 * @returns {boolean}
 */
Panel.prototype.getCollapsed = function () {
    return this.control.get('collapsed');
};

/**
 * @description Устанавливает значение, определяющее, свернута ли панель
 * @param {boolean} value
 */
Panel.prototype.setCollapsed = function (value) {
    if (typeof value !== 'undefined') {
        this.control.set('collapsed', !!value);
    }
};

/**
 * @description Возвращает функцию шаблонизации заголовка панели
 * @returns {Function}
 */
Panel.prototype.getHeaderTemplate = function () {
    return this.control.get('headerTemplate');
};

/**
 * @description Устанавливает функцию шаблонизации заголовка панели
 * @param {Function} value
 */
Panel.prototype.setHeaderTemplate = function (value) {
    this.control.set('headerTemplate', value);
};

/**
 * @description Возвращает заголовок панели
 * @returns {*}
 */
Panel.prototype.getHeader = function () {
    return this.control.get('header');
};

/**
 * @description Устанавливает заголовок панели
 * @param {*} value
 */
Panel.prototype.setHeader = function (value) {
    this.control.set('header', value);
};

/**
 * @description Устанавливает обработчик события о том, что панель разворачивается
 * @param {Function} handler
 */
Panel.prototype.onExpanding = function (handler) {
    this.control.on('expanding', handler);
};

/**
 * @description Устанавливает обработчик события о том, что панель была развернута
 * @param {Function} handler
 */
Panel.prototype.onExpanded = function (handler) {
    this.control.on('expanded', handler);
};

/**
 * @description Устанавливает обработчик события о том, что панель сворачивается
 * @param {Function} handler
 */
Panel.prototype.onCollapsing = function (handler) {
    this.control.on('collapsing', handler);
};

/**
 * @description Устанавливает обработчик события о том, что панель была свернута
 * @param {Function} handler
 */
Panel.prototype.onCollapsed = function (handler) {
    this.control.on('collapsed', handler);
};

/**
 *
 * @returns {PanelControl}
 */
Panel.prototype.createControl = function () {
    return new PanelControl();
};