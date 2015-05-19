function TabPage(parentView) {
    _.superClass(TabPage, this, parentView);
}

_.inherit(TabPage, Element);

_.extend(TabPage.prototype, {

    createControl: function(){
        return new TabPageControl();
    },

    getId: function () {
        return this.control.getId();
    },

    //TabPage API:

    /**
     * Возвращает изображение заголовка страницы.
     * @returns {String}
     */
    getImage: function () {

    },

    /**
     * Устанавливает изображение заголовка страницы.
     * @param {String} value
     */
    setImage: function (value) {

    },

    /**
     * Возвращает значение, определяющее, разрешено ли закрытие страницы.
     * @returns {Boolean}
     */
    getCanClose: function () {
        return this.control.get('canClose');
    },

    /**
     * Устанавливает значение, определяющее, разрешено ли закрытие страницы.
     * @param {Boolean} value
     */
    setCanClose: function (value) {
        this.control.set('canClose', value);
    },

    /**
     * Возвращает контейнер элементов страницы.
     * @return {Object}
     */
    getLayoutPanel: function () {
        return this.control.get('layoutPanel');
    },

    /**
     * Устанавливает контейнер элементов страницы.
     * @param {Object} layoutPanel
     */
    setLayoutPanel: function (layoutPanel) {
        this.control.set('layoutPanel', layoutPanel);
    },

    /**
     * Закрывает страницу
     * @return {Boolean}
     */
    close: function () {
        var response = this.eventStore.executeEvent('onClosing');

        var canClose = _.isEmpty(response) || response.indexOf(false) === -1;

        if (canClose) {
            this.control.close();
            this.eventStore.executeEvent('onClosed', this);
        }
    },

    /**
     * @description Обработчик события о том, что страница закрывается
     * @param handler
     */
    onClosing: function (handler) {
        this.eventStore.addEvent('onClosing', handler);
    },

    /**
     * @description Обработчик события о том, что страница закрыта
     * @param handler
     */
    onClosed: function (handler) {
        this.eventStore.addEvent('onClosed', handler);
    },

    getChildElements: function () {
        return [this.control.get('layoutPanel')];
    }

});