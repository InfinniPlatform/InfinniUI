/**
 * @param parent
 * @constructor
 * @augments Container
 */
function TabPage(parent) {
    _.superClass(TabPage, this, parent);
    this.events = new EventsManager();
    var element = this;

    this.control.on('close', function () {
        element.close();
    });
}

_.inherit(TabPage, Container);

/**
 * @description Возвращает изображение заголовка страницы
 * @returns {string}
 */
TabPage.prototype.getIcon = function () {
    return this.control.get('icon');
};

/**
 * @description Устанавливает изображение заголовка страницы
 * @param {string} value
 */
TabPage.prototype.setIcon = function (value) {
    this.control.set('icon', value);
};

/**
 * @description Возвращает значение, определяющее, разрешено ли закрытие страницы
 * @returns {boolean}
 */
TabPage.prototype.getCanClose = function () {
    return this.control.get('canClose');
};

/**
 * @description Устанавливает значение, определяющее, разрешено ли закрытие страницы
 * @param {boolean} value
 */
TabPage.prototype.setCanClose = function (value) {
    this.control.set('canClose', value);
};

/**
 * @description Закрывает страницу
 * @param {Function} [success] Необязательный. Обработчик события о том, что страница была закрыта
 * @param {Function} [error] Необязательный. Обработчик события о том, что при закрытии произошла ошибка
 */
TabPage.prototype.close = function (success, error) {
    var
        canClose = this.getCanClose(),
        element = this,
        events = this.events;

    if (canClose) {
        this.events.trigger('closing')
            .done(function () {
                //@TODO Закрыть представление
                if (element.parent) {
                    element.parent.closeTab(element);
                }
                typeof success === 'function' && success();
                events.trigger('closed');
            })
            .fail(function () {
                typeof error === 'function' && error();
            });
    }
};

/**
 * @description Устанавливает обработчик события о том, что страница закрывается
 * @param handler
 */
TabPage.prototype.onClosing = function (handler) {
    this.events.on('closing', handler)
};

/**
 * @description Устанавливает обработчик события о том, что страница была закрыта
 * @param handler
 */
TabPage.prototype.onClosed = function (handler) {
    this.events.on('closed', handler)
};

/**
 * @description Возвращает значение, определябщее что данная вкладка выбрана
 * @returns {boolean}
 */
TabPage.prototype.getSelected = function () {
    return this.control.get('selected');
};

TabPage.prototype.setSelected = function (value) {
    this.control.set('selected', value);
};

/**
 * @protected
 * @returns {PanelControl}
 */
TabPage.prototype.createControl = function () {
    return new TabPageControl();
};

